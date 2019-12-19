<template>
  <v-col>
    <v-text-field
      :label="field.name"
      :placeholder="field.placeholder"
      :hint="field.description"
      :clearable="clearable"
      outlined
      :autocomplete="false"
    ></v-text-field>
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

