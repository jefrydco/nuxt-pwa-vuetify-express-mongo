<template>
  <v-dialog :value="value" width="500" @input="$emit('input', $emit)">
    <slot slot="activator" name="activator" />
    <v-card>
      <v-card-text>
        <v-container fluid="" grid-list-xl="">
          <v-layout row="" wrap="">
            <v-flex xs12="">
              Are you sure you want to permanently delete "<strong>{{
                name
              }}</strong
              >"?
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="v-btn__custom--cancel-dialog"
          outline=""
          color="grey"
          @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
        <v-btn
          class="v-btn__custom--delete-dialog"
          color="error"
          @click="$emit('delete')"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    name: {
      validator: prop => typeof prop === "string" || prop === null,
      required: true
    }
  }
};
</script>
