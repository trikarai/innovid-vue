<template>
  <v-row>
    <v-col cols="12" lg="12"> <render-record :fields="fields"/></v-col>
  </v-row>
</template>

<script>
import { formDynamicMixins } from "@/mixins/formDynamicMixins";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";

export default {
  mixins: [formDynamicMixins],
  props: {
    profile: {
      type: Object,
    },
  },
  components: {
    RenderRecord,
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.refactorRecordJSON(this.profile);
  },
};
</script>

<style></style>
