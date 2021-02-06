<template>
  <div>
    <nav
      class="nav flex flex-wrap items-center justify-between bg-green-500 px-4 mb-10"
    >
      <div class="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight">Short Links</span>
      </div>

      <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        for="menu-btn"
      >
        <span class="navicon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul
        class="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto"
      >
        <li class="border-t md:border-none my-auto">
          <div v-if="$auth.$state.loggedIn" class="relative my-auto">
            <button
              class="overflow-hidden border-none flex justify-center items-center font-bold | hover:border-white focus:outline-none focus:border-white"
              @click="isOpen = !isOpen"
            >
              {{ $auth.user.email }}
            </button>

            <div
              v-if="isOpen"
              class="fixed inset-0 w-full h-screen z-20 bg-black opacity-25"
              @click="isOpen = false"
            ></div>
            <div
              v-if="isOpen"
              class="absolute z-30 right-0 mt-2"
              :class="{ hidden: !isOpen }"
            >
              <div class="bg-white rounded-lg shadow-lg py-2 w-48">
                <a
                  href="#"
                  class="block text-purple-600 font-semibold px-4 py-2 | hover:text-white hover:bg-purple-500"
                  >Your profile</a
                >
                <a
                  href="#"
                  class="block text-purple-600 font-semibold px-4 py-2 | hover:text-white hover:bg-purple-500"
                  >Settings</a
                >
                <a
                  @click.prevent="userLogout()"
                  class="block text-purple-600 font-semibold px-4 py-2 | hover:text-white hover:bg-purple-500"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
          <a
            v-else
            href="/login"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-700 hover:bg-white mt-4 lg:mt-0 ml-3"
            >Login/Register</a
          >
        </li>
      </ul>
    </nav>

    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    async userLogout() {
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

@media (max-width: 767px) {
  .navicon {
    width: 1.125em;
    height: 0.125em;
  }

  .navicon::before,
  .navicon::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.2-s ease-out;
    content: "";
    background: #3d4852;
  }

  .navicon::before {
    top: 5px;
  }

  .navicon::after {
    top: -5px;
  }

  .menu-btn:not(:checked) ~ .menu {
    display: none;
  }

  .menu-btn:checked ~ .menu {
    display: block;
    transition: all 0.4s ease-out;
  }

  .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }

  .menu-btn:checked ~ .menu-icon .navicon::before {
    transform: rotate(-45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::after {
    transform: rotate(45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::before,
  .menu-btn:checked ~ .menu-icon .navicon::after {
    top: 0;
  }
}
</style>
