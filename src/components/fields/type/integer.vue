<template>
  <v-col md="6">
    <v-text-field
      :hint="field.description"
      :placeholder="field.placeholder"
      outlined
      type="number"
      :autocomplete="false"
      :min="field.minValue"
      :max="field.maxValue"
      :rules="[rules.minValue, checkRequired]"
      v-model="value"
    >
      <template v-slot:label>
        <div :class="{required : field.required}">{{field.name}}</div>
      </template>
    </v-text-field>
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

