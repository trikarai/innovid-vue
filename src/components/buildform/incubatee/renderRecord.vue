<template>
  <div>
    <!-- {{fields}} -->
    <template v-for="(data, index) in reOrderField(fields)">
      <v-row :key="index">
        <b>{{data.field.name}}</b>
      </v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'string'">{{data.value}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'integer'">{{data.value}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'textarea'">{{data.value}}</v-row>

      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'radio'">
        <template v-if="data.selectedOption != null">{{data.selectedOption.name}}</template>
        <template v-else>-</template>
      </v-row>

      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'select'">
        <template v-if="data.selectedOptions.length == 0"> - </template>
        <template v-for="opt in data.selectedOptions">{{opt.option.name}} ,</template>
      </v-row>

      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'attachment'">
        Attachment placeholder ...
      </v-row>
    </template>
  </div>
</template>
<script>
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  props: ["fields"],
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>