import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import moment from "moment";
import axios from "axios";

import Default from "~/layouts/default";

import createRepo from "~/helpers/api";
import vuex from "~/store";

// https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-446988490
const logError = console.error;
console.error = (...args) => {
  if (
    args[0].includes("[Vuetify]") &&
    args[0].includes("https://github.com/vuetifyjs/vuetify/issues/4068")
  )
    return;
  logError(...args);
};

const localVue = createLocalVue();
const createApi = createRepo(axios);
const apiList = {
  products: createApi("products")
};

localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(VeeValidate);

describe("Default layout", () => {
  let store;

  beforeAll(() => {
    store = new Vuex.Store({
      ...vuex
    });
  });

  it("renders to match snapshot", () => {
    const wrapper = shallowMount(Default, {
      localVue,
      store,
      mocks: {
        $moment: moment,
        $api: apiList
      },
      stubs: {
        nuxt: "nuxt"
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
