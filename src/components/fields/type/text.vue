<template>
  <v-col>
    <v-textarea
      dense
      :hint="field.description"
      :placeholder="field.placeholder"
      rows="3"
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
    </v-textarea>
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

