<template>
  <v-container extend grid-list-xs>
    <!-- <v-row>
      <v-col md="12" class="title">RAW</v-col>
      <v-col md="12" class="title">{{dataSingle.name}}</v-col>
      <v-col md="12">{{dataSingle.content}}</v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col md="12" class="title">Markdown</v-col>
      <v-col md="12" class="title">{{dataSingle.name}}</v-col>
      <v-col md="12">
        <div v-html="marked(dataSingle.content)"></div>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col md="12" class="title">{{dataSingle.name}}</v-col>
      <v-col md="12">
        <div v-html="$sanitize(dataSingle.content)"></div>
      </v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      dataSingle: {},
      tableLoad: false
    };
  },
  mounted() {
    this.getDatasingle();
  },
  computed: {},
  methods: {
    getDatasingle() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials/" +
            this.$route.params.learningId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>