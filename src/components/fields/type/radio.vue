<template>
  <v-col>
    <div :class="{required: field.required}">{{field.name}}</div>
    <v-radio-group v-model="value" :rules="checkRequired">
      <v-radio v-for="(option, index) in field.options" :key="index" :label="option.name" :value="option.id"></v-radio>
    </v-radio-group>
  </v-col>
</template>
<script>
import { validationMixins } from "@/mixins/validationMixins";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [validationMixins, formDynamicMixins],
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

