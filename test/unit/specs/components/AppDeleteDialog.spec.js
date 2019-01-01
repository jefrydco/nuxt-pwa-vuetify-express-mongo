import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";

import AppDeleteDialog from "~/components/AppDeleteDialog";

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
