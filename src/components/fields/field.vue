<template>
  <v-row>
    <!-- {{field}} -->
    <string-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'string'"></string-field>
    <text-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'textarea'"></text-field>
    <integer-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'integer'"></integer-field>
    <radio-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'radio'"></radio-field>
    <select-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'select'"></select-field>
    <attachment-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'attachment'"></attachment-field>
  </v-row>
</template>

<script>
import integer from "./type/integer";
import string from "./type/string";
import text from "./type/text";
import radio from "./type/radio";
import select from "./type/select";
import attachment from "./type/file";

export default {
  components: {
    "integer-field": integer,
    "string-field": string,
    "text-field": text,
    "radio-field": radio,
    "select-field": select,
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

