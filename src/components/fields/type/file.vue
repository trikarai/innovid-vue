<template>
  <v-col>
    <v-file-input
      :label="field.name"
      :hint="field.description"
      :clearable="clearable"
      outlined
    ></v-file-input>
  </v-col>
</template>
<script>
export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {}
};
</script>

<style scoped>
</style>

