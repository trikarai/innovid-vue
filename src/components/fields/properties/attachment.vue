<template>
  <div>
    <v-card-title>Attachment Properties</v-card-title>
    <v-row class="pa-5">
      <v-col md="12">
        <v-text-field label="Label Name" v-model="field.name"></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field label="Description" v-model="field.description"></v-text-field>
      </v-col>

      <v-col md="12" v-if="!canvasMode">
        <v-text-field label="Position" v-model="field.position" disabled></v-text-field>
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

      <v-col md="6">
        <v-text-field label="Min File" v-model="field.minValue" type="number" disabled></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Max File" v-model="field.maxValue" type="number" disabled></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Min File Size (MB)" v-model="field.minSize" max="0" type="number"></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Max File Size (MB)" v-model="field.maxSize" max="10" type="number"></v-text-field>
      </v-col>
      <v-col md="12">
        <v-checkbox v-model="field.required" :label="`Required : ${field.required.toString()}`"></v-checkbox>
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
        v =>
          v.length == 13 ||
          "Grid Position must valid : row-start / column-start / row-end / column-end"
      ]
    };
  },
  watch: {}
};
</script>

<style scoped>
</style>

