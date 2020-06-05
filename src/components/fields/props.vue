<template>
  <div>
    <!-- {{field}} -->
    <string-field :canvasMode="canvasMode" v-bind:index="index" v-bind:field="field" v-if="field.type === 'string'"></string-field>
    <string-field :canvasMode="canvasMode" v-bind:index="index" v-bind:field="field" v-if="field.type === 'textarea'"></string-field>
    <integer-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'integer'"></integer-field>
    <selection-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'radio'"></selection-field>
    <selection-field v-bind:index="index" v-bind:field="field" v-if="field.type === 'select'"></selection-field>
    <attachment-field :canvasMode="canvasMode" v-bind:index="index" v-bind:field="field" v-if="field.type === 'attachment'"></attachment-field>
  </div>
</template>

<script>
import string from "./properties/string";
import integer from "./properties/integer";
import selection from "./properties/selection";
import attachment from "./properties/attachment";

export default {
  components: {
    "string-field": string,
    "integer-field": integer,
    "selection-field": selection,
    "attachment-field": attachment
  },
  props: ["field", "index", "canvasMode"],
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

