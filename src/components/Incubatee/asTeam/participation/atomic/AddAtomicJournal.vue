<template>
  <v-container extend grid-list-xs>
    <mission-comp :tableLoad.sync="tableLoad" :dataList.sync="dataList" />
    <learning-comp :learningLoad.sync="learningLoad" :learningList.sync="learningList" />
    <v-row>
      <v-col cols="12" md="12" lg="12" xs="12">
        <v-card class="pa-5">
          <v-tabs v-model="tab" class="elevation-0" background-color="primary" dark>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">New Journal</v-tab>
            <v-tab disabled href="#tab-2">Selected Journal</v-tab>
            <v-tab href="#tab-3">Other Journals in this Mission</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <!-- new journal start-->
            <v-tab-item value="tab-1">
              <template v-if="!tableLoad">
                <new-journal
                  :dataListTemp.sync="dataListTemp"
                  :tableLoad2="tableLoad"
                  :loader.sync="loader"
                  :branchUri.sync="branchUri"
                />
              </template>
              <template v-else>
                <v-col>
                  <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
              </template>
            </v-tab-item>
            <!-- new journal end-->
            <v-tab-item value="tab-3">
              <other-comp />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="loader">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
// import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import MissionComp from "../journal/subMissionCard";
import LearningComp from "../journal/subLearning";
import OtherComp from "../journal/subOtherJournal";

import NewJournal from "../journal/component/newJournal";

import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      tab: "tab-1",
      learningList: { total: 0, list: [] },
      learningLoad: false,
      search: "",
      dataList: { id: "", name: "", description: "", nextMission: { id: "" } },
      dataListTemp: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" }
      },
      tableLoad: false,
      loader: false,
      branchUri: ""
    };
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
    if (this.$route.params.journalId) {
      this.branchUri = "/" + this.$route.params.journalId;
    } else {
      this.branchUri = "";
    }
  },
  components: {
    MissionComp,
    LearningComp,
    OtherComp,
    NewJournal
  },
  mounted() {
    this.getDataList();
    this.getLearningMaterialList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;
          this.$route.meta.text =
            "Learn & Add " + this.dataList.worksheetForm.name;
          Object.assign(this.dataListTemp, this.dataList);
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getLearningMaterialList() {
      this.learningLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.learningList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.learningLoad = false;
        });
    }
  }
};
</script>

<style scoped>
a.v-tab.v-tab--active {
  background: #fff;
  color: #249c90 !important;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  -moz-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  border-top: solid 5px;
}
.notActive {
  color: var(--v-grey-base) !important;
}
</style>
