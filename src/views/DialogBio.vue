<template>
  <v-dialog v-model="dialog" max-width="500" persistent
    ><v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ mentor.name }}
      </v-card-title>

      <v-card-text class="mt-5">
        {{ mentor.bio }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="primary"
          text
          @click="$emit('update:dialog', false)"
        >
          close
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<script>
export default {
  props: {
    mentor: {
      type: Object,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style></style>
