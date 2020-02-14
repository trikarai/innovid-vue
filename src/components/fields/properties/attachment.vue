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
 
    <v-col md="6">
      <v-text-field label="Position" v-model="field.position" disabled></v-text-field>
    </v-col>
    <v-col md="6">
      <v-text-field label="Grid Position" disabled></v-text-field>
    </v-col>
  
    <v-col md="6">
      <v-text-field label="Min File" v-model="field.minValue" type="number"></v-text-field>
    </v-col>
    <v-col md="6">
      <v-text-field label="Max File" v-model="field.maxValue" type="number"></v-text-field>
    </v-col>
    <v-col md="6">
      <v-text-field label="Min File Size (byte)" v-model="field.minSize" type="number"></v-text-field>
    </v-col>
    <v-col md="6">
      <v-text-field label="Max File Size (byte)" v-model="field.maxSize" type="number"></v-text-field>
    </v-col>
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
export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {}
};
</script>

<style scoped>
</style>

