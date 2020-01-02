<template>
  <v-col>
    <div :class="{required: field.required}">{{field.name}}</div>
    <v-radio-group v-model="option" :rules="checkRequired">
      <v-radio
        v-for="(option, index) in field.options"
        :key="index"
        :label="option.name"
        :value="option.id"
      ></v-radio>
    </v-radio-group>
    <!-- {{option}} -->
  </v-col>
</template>
<script>
import bus from "@/config/bus";
import { validationMixins } from "@/mixins/validationMixins";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [validationMixins, formDynamicMixins],
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      option: ""
    };
  },
  watch: {
    option: function() {
      var params = {
        fieldId: this.field.id,
        selectedOptionId: this.option,
        type: this.field.type
      };
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

