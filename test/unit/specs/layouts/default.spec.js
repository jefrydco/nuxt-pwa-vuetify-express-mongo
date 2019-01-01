import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import moment from "moment";
import axios from "axios";

import Default from "~/layouts/default";

import createRepo from "~/helpers/api";
import vuex from "~/vuex";

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
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
