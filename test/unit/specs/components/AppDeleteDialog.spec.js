import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";

import AppDeleteDialog from "~/components/AppDeleteDialog";

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
localVue.use(Vuetify);
localVue.use(VeeValidate);

describe("AppDeleteDialog component", () => {
  it("renders to match snapshot", () => {
    const wrapper = shallowMount(AppDeleteDialog, {
      localVue,
      propsData: {
        value: true,
        name: "Stub"
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
