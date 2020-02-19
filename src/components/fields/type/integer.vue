<template>
  <v-col>
    <v-text-field
      v-if="field.required"
      dense
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
    <v-text-field
      v-else
      dense
      :hint="field.description"
      :placeholder="field.placeholder"
      outlined
      type="number"
      :autocomplete="false"
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
  props: ["field", "index", "modeReload"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {},
  created() {
    if (this.modeReload) {
      this.value = this.field.value;
    }
  }
};
</script>

<style scoped>
</style>

