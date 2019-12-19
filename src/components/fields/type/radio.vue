<template>
  <v-col>
    {{field.name}}
    <v-radio-group>
      <v-radio v-for="(option, index) in field.options" :key="index" :label="option.name"></v-radio>
    </v-radio-group>
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

