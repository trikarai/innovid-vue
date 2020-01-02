<template>
  <v-col md="6">
    <v-select
      v-model="optionList"
      :items="field.options"
      item-text="name"
      item-value="id"
      :hint="field.description"
      :clearable="clearable"
      outlined
      multiple
    >
      <template v-slot:label>
        <div :class="{required : field.required}">{{field.name}}</div>
      </template>
    </v-select>
    <!-- {{optionList}} -->
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
      optionList: []
    };
  },
  watch: {
    optionList: function() {
      var params = {
        fieldId: this.field.id,
        selectedOptionIdList: this.optionList,
        type: this.field.type
      };
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

