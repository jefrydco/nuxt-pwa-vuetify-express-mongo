<template>
  <v-app>
    <v-content>
      <v-container fluid="" grid-list-xl="">
        <v-layout row="" wrap="">
          <v-flex xs12=""> <nuxt /> </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <app-notif />
  </v-app>
</template>

<script>
import AppNotif from "~/components/AppNotif";

export default {
  components: {
    AppNotif
  },
  data() {
    return {};
  }
};
</script>
