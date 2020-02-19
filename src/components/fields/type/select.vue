<template>
  <v-col>
    <!-- build mode : {{build}} -->
    <!-- {{modeReload}} -->
    <!-- Min : {{field.minValue}} -
    Max : {{field.maxValue}}-->
    <v-select
      dense
      v-if="build"
      :label="field.name"
      :items="field.options"
      item-text="name"
      :hint="field.description"
      :clearable="clearable"
      multiple
      persistent-hint
      outlined
    >
      <template v-slot:label>
        <div :class="{required : field.required}">{{field.name}}</div>
      </template>
    </v-select>

    <v-select
      v-else
      :label="field.name"
      :items="field.options"
      item-value="id"
      item-text="name"
      v-model="optionList"
      :hint="field.description"
      :clearable="clearable"
      multiple
      persistent-hint
      outlined
      :error-messages="errorMessages"
      counter
      @change="checkMinMax()"
    >
      <template v-slot:label>
        <div :class="{required : field.required}">{{field.name}}</div>
      </template>
    </v-select>
    <template v-if="field.required">Min:{{field.minValue}} Max:{{field.maxValue}}</template>
    <!-- {{optionList.length}} -->
  </v-col>
</template>
<script>
import bus from "@/config/bus";
import { validationMixins } from "@/mixins/validationMixins";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [validationMixins, formDynamicMixins],
  props: ["field", "index", "modeReload", "build"],
  components: {},
  data: function() {
    return {
      clearable: true,
      errorMessages: [],
      optionList: []
    };
  },
  created() {
    if (this.modeReload) {
      this.field.selectedOptions.forEach(element => {
        this.optionList.push(element.option.id);
      });
      // this.optionList = this.field.selectedOption.id;
    }
  },
  watch: {
    optionList: function() {
      var params;
      if (this.modeReload) {
        params = {
          fieldId: this.field.multiSelectField.id,
          selectedOptionIdList: this.optionList,
          type: this.field.type
        };
      } else {
        params = {
          fieldId: this.field.id,
          selectedOptionIdList: this.optionList,
          type: this.field.type
        };
      }
      bus.$emit("getValue", params, this.index);
    }
  },
  methods: {
    checkMinMax() {
      if (this.field.required) {
        if (this.optionList.length < this.field.minValue) {
          this.errorMessages.push(
            "Minimal selected item is " + this.field.minValue
          );
        } else if (this.optionList.length > this.field.maxValue) {
          this.errorMessages.push(
            "Maximum selected item is " + this.field.maxValue
          );
        } else {
          this.errorMessages = [];
        }
      }
    }
  }
};
</script>

<style scoped>
</style>

