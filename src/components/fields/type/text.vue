<template>
  <v-col>
    <v-textarea
      :label="field.name"
      :hint="field.description"
      :placeholder="field.placeholder"
      :clearable="clearable"
      rows="3"
      outlined
      :autocomplete="false"
    ></v-textarea>
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

