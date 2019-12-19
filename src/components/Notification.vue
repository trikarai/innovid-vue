<template>
  <v-layout align-center justify-center>
    <v-snackbar v-model="stats.success" :multi-line="true" color="green" top class="ma-4">
      {{message}}
      <v-btn color="white" text @click="stats.success = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="stats.info" :multi-line="true" color="blue" top class="ma-4">
      {{message}}
      <v-btn color="white" text @click="stats.info = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="stats.warning" :multi-line="true" color="yellow" top class="ma-4">
      {{message.error_detail}}
      <v-btn color="white" text @click="stats.warning = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="stats.error" :multi-line="true" color="red" top class="ma-4">
      {{message.code}} - {{message.error_detail}}
      <v-btn color="white" text @click="stats.error = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>
<script>
export default {
  props: ["message", "stats"],
  data: function() {
    return {};
  }
};
</script>

