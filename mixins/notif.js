import { types } from "~/store";

export default {
  computed: {
    notif: {
      get() {
        return this.$store.state.notif;
      },
      set({ text, color }) {
        this.$store.commit(types.SET_NOTIF, { text, color });
      }
    }
  },
  methods: {
    setNotif(text = null, color = null) {
      this.notif = {
        text,
        color
      };
    }
  }
};
