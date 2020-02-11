<template>
  <div>
    <template v-for="(data, index) in fields">
      <v-row :key="index">
        <b>{{data.field.name}}</b>
      </v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'string'">{{data.value}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'integer'">{{data.value}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'textarea'">{{data.value}}</v-row>
      <v-row
        class="mb-4 grey--text"
        :key="data.id"
        v-if="data.type == 'radio'"
      >{{data.selectedOption.name}}</v-row>
      <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'select'">
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