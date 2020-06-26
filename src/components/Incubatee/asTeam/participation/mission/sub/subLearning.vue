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
    <v-col style="max-width:800px;" cols="12" md="12" lg="12" xs="12">
      <span
        v-html="$sanitize(learning.content)"
        v-if="learning.content != null"
      />
    </v-col>
  </v-row>
</template>

<script>
// import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    missionId: { type: String, required: false },
  },
  data() {
    return {
      loadingLearning: false,
      learnings: { total: 0, list: [] },
      learning: { name: "", content: null },
    };
  },
  watch: {
    missionId: "getLearningMaterial",
    learning() {
      this.$analytics.logEvent("learning_view", {
        name: this.learning.name,
      });
    },
  },
  mounted() {
    this.getLearningMaterial();
  },
  methods: {
    reOrderByName: function(params) {
      return this._.orderBy(params, "name", "asc");
    },
    getLearningMaterial() {
      if (this.missionId !== "") {
        this.learnings = { total: 0, list: [] };
        this.learning = { content: null };
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
            this.learnings.list = this.reOrderByName(this.learnings.list);
            this.learning = this.learnings.list[0];
          })
          .catch(() => {})
          .finally(() => {
            this.loadingLearning = false;
          });
      }
    },
  },
};
</script>

<style></style>
