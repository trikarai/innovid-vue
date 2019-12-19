<template>
  <v-col>
    <v-select
      v-model="value"
      :label="field.name"
      :items="field.options"
      item-text="name"
      :hint="field.description"
      :clearable="clearable"
      outlined
      multiple
    ></v-select>
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

