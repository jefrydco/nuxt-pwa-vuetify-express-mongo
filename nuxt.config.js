import nodeExternals from "webpack-node-externals";
import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
require("dotenv").config();

export default {
  // https://nuxtjs.org/api/configuration-modern
  modern: true,

  // https://nuxtjs.org/api/configuration-head
  head: {
    titleTemplate(title) {
      if (title) {
        return `${title} - Nuxt PWA Vuetify`;
      }
      return "Nuxt PWA Vuetify";
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ]
  },

  // https://nuxtjs.org/api/configuration-modules
  modules: [
    // https://axios.nuxtjs.org/
    "@nuxtjs/axios",

    // https://nuxtjs.org/faq/cached-components/
    "@nuxtjs/component-cache",

    // https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",

    // https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",

    // https://github.com/nuxt-community/sitemap-module
    "@nuxtjs/sitemap",

    // https://github.com/nuxt-community/moment-module
    "@nuxtjs/moment",

    // https://github.com/nuxt-community/sentry-module
    // "@nuxtjs/sentry",

    // https://github.com/Developmint/nuxt-webfontloader
    "nuxt-webfontloader"

    // https://github.com/nuxt-community/analytics-module
    // [
    //   "@nuxtjs/google-analytics",
    //   {
    //     // TODO: Change this id to your Google Analytics ID
    //     id: process.env.GOOGLE_ANALYTICS
    //   }
    // ],
  ],

  axios: {
    baseURL: "http://localhost:3000/api"
  },

  webfontloader: {
    google: {
      families: ["Roboto:100,300,400,500,700,900", "Material+Icons"]
    }
  },

  // https://nuxtjs.org/api/configuration-plugins
  plugins: [
    "~/plugins/api",
    "~/plugins/component",
    "~/plugins/vuetify",
    "~/plugins/vee-validate"
  ],

  // https://nuxtjs.org/api/configuration-css
  css: ["~/assets/styles/vuetify"],

  // https://nuxtjs.org/api/configuration-watch
  watch: ["~/server/**/*.js", "~/mixins/**/*.js"],

  serverMiddleware: ["~/server"],

  // https://nuxtjs.org/api/configuration-build
  build: {
    extractCSS: true,
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            fix: true
          }
        });
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
