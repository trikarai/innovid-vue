<template>
  <div>
    <!-- {{field}} -->
    <string-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'string'"></string-field>
    <string-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'textarea'"></string-field>
    <string-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'integer'"></string-field>
    <selection-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'radio'"></selection-field>
    <selection-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'select'"></selection-field>
    <attachment-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'attachment'"></attachment-field>
  </div>
</template>

<script>
import string from "./properties/string";
import selection from "./properties/selection";
import attachment from "./properties/attachment";

export default {
  components: {
    "string-field": string,
    "selection-field": selection,
    "attachment-field": attachment
  },
  props: ["field", "index"],
  data: function() {
    return {
      show: false,
      value: "",
      form: {
        value: ""
      }
    };
  },
  created: function() {},
  methods: {}
};
</script>

