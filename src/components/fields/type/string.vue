<template>
  <v-col>
    <v-text-field
      dense
      :placeholder="field.placeholder"
      :hint="field.description"
      outlined
      :autocomplete="false"
      :maxLength="field.maxValue"
      :counter="field.maxValue"
      :rules="[rules.min, checkRequired]"
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
  created() {
    if (this.modeReload) {
      this.value = this.field.value;
    }
  }
};
</script>

<style scoped>
</style>

