import createRepo from "~/helpers/api";

export default ({ $axios }, inject) => {
  const createApi = createRepo($axios);

  const apiList = {
    products: createApi("products")
  };

  inject("api", apiList);
};
