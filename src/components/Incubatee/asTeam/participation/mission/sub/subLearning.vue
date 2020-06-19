<template>
  <v-row>
    <v-col cols="12" md="6" lg="6" xs="12">
      <v-select
        background-color="#fff"
        dense
        :loading="loading"
        :items="learnings.list"
        item-text="name"
        v-model="learning"
        return-object
        label="Learning Material"
        outlined
      ></v-select>
    </v-col>
    <template v-if="!loading">
      <v-col cols="12" md="12" lg="12" xs="12" v-if="learnings.total == 0">
        <v-alert dense type="info" :value="true"
          >No Learning Material Added</v-alert
        >
      </v-col>
    </template>
    <v-col cols="12" md="12" lg="12" xs="12">
      <span v-html="$sanitize(learning.content)" />
    </v-col>
  </v-row>
</template>

<script>
// import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    missionId: { type: String, required: true },
  },
  data() {
    return {
      loadingLearning: false,
      learnings: { total: 0, list: [] },
      learning: { content: "" },
    };
  },
  watch: {
    missionId: "getLearningMaterial",
  },
  mounted() {
    this.getLearningMaterial();
  },
  methods: {
    getLearningMaterial() {
      this.learnings = { total: 0, list: [] };
      this.learning = { content: "" };
      this.loadingLearning = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.missionId +
            "/learning-materials",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.learnings = res.data.data;
          this.learning = this.learnings.list[0];
        })
        .catch(() => {})
        .finally(() => {
          this.loadingLearning = false;
        });
    },
  },
};
</script>

<style></style>
