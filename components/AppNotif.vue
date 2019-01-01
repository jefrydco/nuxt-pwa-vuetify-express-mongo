<template>
  <v-snackbar
    :value="isNotif"
    :color="notif.color"
    right=""
    @input="onCloseButtonClicked"
  >
    {{ notif.text }}
    <v-btn dark flat @click="onCloseButtonClicked"> Close </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import notif from "~/mixins/notif";

export default {
  mixins: [notif],
  computed: {
    ...mapGetters(["isNotif"])
  },
  methods: {
    onCloseButtonClicked() {
      this.setNotif();
    }
  }
};
</script>
