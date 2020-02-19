<template>
  <div>
    <v-card-title>Integer Properties</v-card-title>
    <v-row class="pa-5">
      <v-col md="12">
        <v-text-field label="Label Name" v-model="field.name"></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field label="Description" v-model="field.description"></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field label="Placeholder" v-model="field.placeholder"></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Position" v-model="field.position" disabled></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Grid Position" disabled></v-text-field>
      </v-col>
      <v-col md="12">
        <v-text-field label="Default Value" v-model="field.defaultValue"></v-text-field>
      </v-col>
      <template v-if="field.required">
        <v-col md="6">
          <v-text-field label="Min Char" v-model="field.minValue" type="number"></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field label="Max Char" v-model="field.maxValue" type="number"></v-text-field>
        </v-col>
      </template>
      <v-col md="12">
        <v-checkbox v-model="field.required" :label="`Required : ${field.required.toString()}`"></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {
    "field.required": "isRequired"
  },
  methods: {
    isRequired() {
      if (!this.field.required) {
        this.field.minValue = 0;
        this.field.maxValue = 0;
        this.field.defaultValue = '';
      }
    }
  }
};
</script>

<style scoped>
</style>

