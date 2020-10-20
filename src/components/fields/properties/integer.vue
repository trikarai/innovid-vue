<template>
  <div>
    <v-card-title>Integer Properties</v-card-title>
    <v-row class="pa-5">
      <v-col md="12">
        <v-text-field label="Label Name" v-model="field.name"></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field
          label="Description"
          v-model="field.description"
        ></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field
          label="Placeholder"
          v-model="field.placeholder"
        ></v-text-field>
      </v-col>
      <v-col md="6" v-if="!canvasMode">
        <v-text-field
          label="Position"
          v-model="field.position"
          disabled
        ></v-text-field>
      </v-col>
      <v-col md="12" v-else>
        <v-text-field
          hint="row-start / column-start / row-end / column-end"
          persistent-hint
          label="Grid Position"
          v-model="field.position"
          v-mask="gridMask"
          :rules="gridRules"
        ></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field
          label="Default Value"
          v-model="field.defaultValue"
        ></v-text-field>
      </v-col>
      <template v-if="field.required">
        <v-col md="6">
          <v-text-field
            label="Min Value"
            v-model="field.minValue"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field
            label="Max Value"
            v-model="field.maxValue"
            type="number"
          ></v-text-field>
        </v-col>
      </template>
      <v-col md="12">
        <v-checkbox
          v-model="field.required"
          :label="`Required : ${field.required.toString()}`"
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from "@rj-pkgs/vue-the-mask";

export default {
  props: ["field", "index", "canvasMode"],
  directives: { mask },
  components: {},
  data: function() {
    return {
      clearable: true,
      value: "",
      gridMask: "# / # / # / #",
      gridRules: [
        (v) =>
          v.length == 13 ||
          "Grid Position must valid : row-start / column-start / row-end / column-end",
      ],
    };
  },
  watch: {
    "field.required": "isRequired",
  },
  methods: {
    isRequired() {
      if (!this.field.required) {
        this.field.minValue = 0;
        this.field.maxValue = 0;
        this.field.defaultValue = "";
      }
    },
  },
};
</script>

<style scoped></style>
