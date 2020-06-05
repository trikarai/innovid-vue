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
      :rules="[rules.minValue, rules.maxValue, checkRequired]"
      v-model="value"
      :error="isError"
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
    <template v-if="field.required">Min Value: {{field.minValue}} - Max Value: {{field.maxValue}}</template>
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
      isError: true,
      value: null
    };
  },
  watch: {
    
  },
  mounted () {
    if (this.field.required) {
      this.isError = true;
    } else {
      this.isError = false;
    }
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

