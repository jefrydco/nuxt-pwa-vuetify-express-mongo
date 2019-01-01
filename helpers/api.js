import { stringify } from "qs";

export default $axios => resource => ({
  store(payload) {
    return $axios.$post(`/${resource}/`, payload);
  },
  show(id, params = {}) {
    return $axios.$get(`/${resource}/${id}/?${stringify(params)}`);
  },
  index(params = {}) {
    return $axios.$get(`/${resource}/?${stringify(params)}`);
  },
  update(id, payload) {
    return $axios.$put(`/${resource}/${id}/`, payload);
  },
  delete(id) {
    return $axios.$delete(`/${resource}/${id}`);
  }
});
