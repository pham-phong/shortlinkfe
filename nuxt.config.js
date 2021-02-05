export default {
  ssr: false,
  env: {
    API_URL: process.env.API_URL
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "shortlinks",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],

  router: {
    middleware: ["auth"]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next"
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  auth: {
    redirect: {
      login: "/login",
      logout: false,
      callback: "/login",
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/auth/logout", method: "delete" },
          user: {
            url: "/auth/user",
            method: "get",
            propertyName: "user"
          }
        }
        // tokenRequired: true,
        // tokenType: 'Bearer',
        // globalToken: true,
        // autoFetchUser: true,
      }
    },
    cookie: {
      options: {
        expires: 1
      }
    },
    watchLoggedIn: true
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL || "/api"
  }
};
