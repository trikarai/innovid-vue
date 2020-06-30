<template>
  <v-col>
    <!-- <div :class="{required: field.required}">{{field.name}}</div>
    <v-radio-group v-model="option" :error="isError">
      <v-radio
        v-for="(option, index) in field.options"
        :key="index"
        :label="option.name"
        :value="option.id"
      ></v-radio>
    </v-radio-group> -->
    <v-autocomplete
      dense
      v-if="build"
      :label="field.name"
      :items="field.options"
      item-text="name"
      :hint="field.description"
      :clearable="clearable"
      persistent-hint
      outlined
    >
      <template v-slot:label>
        <div :class="{ required: field.required }">{{ field.name }}</div>
      </template>
    </v-autocomplete>

    <v-autocomplete
      v-else
      :label="field.name"
      :items="field.options"
      item-value="id"
      item-text="name"
      v-model="option"
      :hint="field.description"
      persistent-hint
      outlined
      :error-messages="errorMessages"
      counter
      :error="isError"
    >
      <template v-slot:label>
        <div :class="{ required: field.required }">{{ field.name }}</div>
      </template>
    </v-autocomplete>
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
      clearable: false,
      option: "",
      isError: false,
      errorMessages: [],
    };
  },
  created() {
    if (this.modeReload) {
      this.option = this.field.selectedOption.id;
    }
    this.field.options = this.reOrderField(this.field.options);
  },
  mounted() {
    if (this.field.required) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  },
  watch: {
    option: function() {
      this.isError = false;
      var params;
      if (this.modeReload) {
        params = {
          fieldId: this.field.singleSelectField.id,
          selectedOptionId: this.option,
          type: this.field.type,
        };
      } else {
        params = {
          fieldId: this.field.id,
          selectedOptionId: this.option,
          type: this.field.type,
        };
      }
      bus.$emit("getValue", params, this.index);
    },
  },
};
</script>

<style scoped></style>
