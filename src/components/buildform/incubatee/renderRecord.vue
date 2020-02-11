<template>
  <div>
    <template v-for="data in fields">
      <v-row :key="data.field.id">
        <b>{{data.field.name}}</b>
      </v-row>
      <v-row
        class="mb-4 grey--text"
        :key="data.field.id"
        v-if="data.type == 'string'"
      >{{data.value}}</v-row>
      <v-row
        class="mb-4 grey--text"
        :key="data.field.id"
        v-if="data.type == 'integer'"
      >{{data.value}}</v-row>
      <v-row
        class="mb-4 grey--text"
        :key="data.field.id"
        v-if="data.type == 'textarea'"
      >{{data.value}}</v-row>
      <v-row
        class="mb-4 grey--text"
        :key="data.field.id"
        v-if="data.type == 'radio'"
      >{{data.selectedOption.name}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.field.id" v-if="data.type == 'select'">
        <template v-for="opt in data.selectedOptions">{{opt.option.name}} ,</template>
      </v-row>
    </template>
  </div>
</template>
<script>
export default {
  props: ["fields"],
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>