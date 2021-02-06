<template>
  <div class="login-form">
    <article>
      <div class="form-box" :class="{ 'sign-up-active': formSwitch }">
        <div class="overlay-form-box">
          <div class="overlay">
            <div class="overlay-left">
              <h2>Welcome Back!</h2>
              <p>Please login with your personal info</p>
              <button
                class="invert"
                id="signIn"
                @click="formSwitch = !formSwitch"
              >
                Sign In
              </button>
            </div>
            <div class="overlay-right">
              <h2>Wellcome to Website!</h2>
              <p>Please enter your personal details</p>
              <button
                class="invert"
                id="formSwitch"
                @click="formSwitch = !formSwitch"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <form class="sign-up">
          <h2>Create login</h2>
          <div>Use your email for registration</div>
          <input v-model="formSignUp.username" type="text" placeholder="Name" />
          <input v-model="formSignUp.email" type="email" placeholder="Email" />
          <input
            v-model="formSignUp.password"
            type="password"
            autocomplete="on"
            placeholder="Password"
          />
          <button @click.prevent="userSignUp">Sign Up</button>
        </form>
        <form class="sign-in">
          <h2>Sign In</h2>
          <div>Use your account</div>
          <input type="email" v-model="formSignIn.email" placeholder="Email" />
          <input
            type="password"
            autocomplete="on"
            v-model="formSignIn.password"
            placeholder="Password"
          />
          <a href="#">Forgot your password?</a>
          <button @click.prevent="userLogin">Sign In</button>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  auth: "guest",
  layout: "default",
  data() {
    return {
      formSwitch: false,
      user: null,
      result: null,
      formSignIn: {
        email: "",
        password: ""
      },
      formSignUp: {
        username: "",
        email: "",
        password: ""
      },
      error: []
    };
  },
  methods: {
    async userLogin() {
      try {
        const { data } = await this.$auth.loginWith("local", {
          data: this.formSignIn
        });
        Cookie.set("access_token", data.token, { expires: 1 });
        this.$router.push({ path: "/" });
      } catch (err) {
        console.log("error", err);
        this.error = err;
      }
    },
    async userSignUp() {
      try {
        const { data } = await this.$axios.post("/register", this.formSignUp);
        return data;
      } catch (err) {
        console.log("error", err);
        this.error = err;
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  font-size: 1rem;
  color: #222;
  background-color: #092525;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  position: relative;
  width: 768px;
  height: 480px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #efefef, #ccc);
}
.form-box .overlay-form-box {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  z-index: 100;
}
.form-box .overlay {
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  background: linear-gradient(to bottom right, #7fd625, #009345);
  color: #fff;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}
.form-box .overlay-left {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 40px;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(-20%);
  transition: transform 0.5s ease-in-out;
}
.form-box .overlay-right {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 40px;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  right: 0;
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: #222;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid #009345;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;
}
button:active {
  transform: scale(0.9);
}
button:focus {
  outline: none;
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 90px 60px;
  width: 50%;
  height: 100%;
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all 0.5s ease-in-out;
}
form div {
  font-size: 1rem;
}
form input {
  background-color: #eee;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff, 0 1px 0 #fff;
  overflow: hidden;
}
form input:focus {
  outline: none;
  background-color: #fff;
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.sign-up-active .sign-in {
  transform: translateX(100%);
}
.sign-up-active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.5s;
}
.sign-up-active .overlay-form-box {
  transform: translateX(-100%);
}
.sign-up-active .overlay {
  transform: translateX(50%);
}
.sign-up-active .overlay-left {
  transform: translateX(0);
}
.sign-up-active .overlay-right {
  transform: translateX(20%);
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}
</style>
