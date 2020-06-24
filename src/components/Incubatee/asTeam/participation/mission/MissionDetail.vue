<template>
  <v-container fluid>
    <v-row>
      <v-col class="pl-0" cols="12" xl="12" lg="12" md="6">
        <v-card elevation="0" class="pa-0" :loading="tableLoad">
          <v-card-title class="pb-0" primary-title>
            <v-row justify="space-between">
              <v-col cols="12" xl="4" lg="6" md="6" sm="6">
                <div style="display: -webkit-box;">
                  {{ dataList.name }}
                  <v-card-text
                    style="position: relative;bottom: 11px;"
                    v-if="dataList.previousMission != null"
                  >
                    <v-chip small>
                      <v-avatar left>
                        <v-icon small color="primary">account_tree</v-icon>
                      </v-avatar>
                      <span style="color:#999">Branch Mission</span>
                    </v-chip>
                  </v-card-text>
                  <v-card-text style="position: relative;bottom: 11px;" v-else>
                    <v-chip small>
                      <v-avatar left>
                        <v-icon small color="primary"
                          >assignment_turned_in</v-icon
                        >
                      </v-avatar>
                      <span style="color:#999">Main Mission</span>
                    </v-chip>
                  </v-card-text>
                </div>
              </v-col>
              <v-col cols="12" xl="8" lg="6" md="2" sm="2">
                <v-row style="text-align:right;">
                  <v-col cols="12" xl="2" lg="4">
                    <v-btn
                      small
                      icon
                      v-if="dataList.position !== '1'"
                      @click="gotoMissionByPosPrev(dataList.position)"
                    >
                      <v-icon>mdi-triangle mdi-rotate-270</v-icon> previous
                      mission
                    </v-btn>
                  </v-col>
                  <v-col xl="2" lg="4">
                    <v-btn
                      small
                      icon
                      @click="gotoMissionByPosNext(dataList.position)"
                      v-if="
                        dataList.position !==
                          $store.getters.getMissionLength.toString()
                      "
                    >
                      next mission <v-icon>mdi-triangle mdi-rotate-90</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- <span class="dot2"></span>
            <span class="dot1 ml-1"></span> -->
          </v-card-title>
          <v-card-text style="position:relative;bottom:20px;">
            <div class="subtitle">
              {{ dataList.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="pt-0" cols="12" xl="10" lg="11">
        <v-tabs v-model="tab" color="primary" slider-color="primary">
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1">Learning Material</v-tab>
          <v-tab href="#tab-2">Worksheets</v-tab>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <learning-material :missionId.sync="dataList.id" class="pa-2" />
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-row>
                <v-col cols="12" lg="12" v-if="!isNewWorksheet">
                  <worksheet-viewer
                    :isNewWorksheet.sync="isNewWorksheet"
                    :dataMission.sync="dataList"
                    :missionId.sync="dataList.id"
                  />
                </v-col>
                <v-col v-else>
                  <v-btn
                    class="mb-3"
                    color="warning"
                    small
                    @click="isNewWorksheet = false"
                  >
                    <v-icon left small>close</v-icon>Cancel
                  </v-btn>
                  <new-journal
                    :dataListTemp.sync="dataListTemp"
                    :tableLoad2="tableLoad"
                    :loader.sync="loader"
                    :branchUri.sync="branchUri"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-row>
    <v-overlay :value="loader">
      <v-row>
        <v-col cols="12" xl="12" lg="12">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-col>
        <v-col cols="12" lg="12">please wait...</v-col>
      </v-row>
    </v-overlay>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import LearningMaterial from "./sub/subLearning";
import WorksheetViewer from "./sub/worksheetViewer";
import NewJournal from "../journal/component/newJournal";

// import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  data() {
    return {
      tab: "tab-1",
      isNewWorksheet: false,
      root: true,
      branchUri: "",
      search: "",
      dataListTemp: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" },
      },
      dataList: { id: "", name: "", description: "", nextMission: { id: "" } },
      journalList: { total: 0, list: [] },
      learningList: { total: 0, list: [] },
      journalId: null,
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Mission", value: "name", sortable: false },
        { text: "Worksheet", value: "worksheet.name", sortable: false },
        { text: "", value: "sub", sortable: false, align: "left" },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      dialog: false,
      dialogForm: false,
      dialogApply: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      previousMission: {
        id: "",
        name: "",
      },
    };
  },
  components: {
    LearningMaterial,
    WorksheetViewer,
    NewJournal,
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");

    bus.$on("UpdateWorksheet", () => {
      this.loader = true;
    });
  },
  mounted() {
    this.getDataList();
    // this.getJournalList();
    // this.getLearningMaterialList();
  },
  watch: {
    $route: "getDataList",
    journalId() {
      if (this.journalId == null) {
        this.root = true;
      } else {
        this.root = false;
      }
    },
  },
  methods: {
    getDataList() {
      this.tab = "tab-1";
      this.isNewWorksheet = false;
      // this.componentKey += 1;
      if (this.$route.params.missionPos) {
        this.getDataListByPosition();
      } else {
        this.getDataListById();
      }
    },
    getDataListById() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/by-id/" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataList = res.data.data;
          Object.assign(this.dataListTemp, this.dataList);
          this.previousMission = res.data.data.previousMission;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getDataListByPosition() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/by-position/" +
            this.$route.params.missionPos,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataList = res.data.data;
          Object.assign(this.dataListTemp, this.dataList);
          this.previousMission = res.data.data.previousMission;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getJournalList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals?missionId=" +
            this.previousMission.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journalList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getLearningMaterialList() {
      this.tableLoad = true;
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
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.learningList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    submitForm(params) {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets",
          params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Data Uploaded");
          this.$router.go(-2);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      //   this.leftName = item.mentoring.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Mentoring Schedule"
          );
          this.refresh();
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoMissionByPosNext(pos) {
      var next = parseInt(pos) + 1;
      // eslint-disable-next-line no-console
      // console.log("next pos is " + pos);
      this.$router.push({
        name: "team-misssion-detail-pos",
        params: {
          teamId: this.$route.params.teamId,
          cohortId: this.$route.params.cohortId,
          missionPos: next,
        },
      });
    },
    gotoMissionByPosPrev(pos) {
      var prev = parseInt(pos) - 1;
      this.$router.push({
        name: "team-misssion-detail-pos",
        params: {
          teamId: this.$route.params.teamId,
          cohortId: this.$route.params.cohortId,
          missionPos: prev,
        },
      });
    },
  },
};
</script>

<style scoped>
a.v-tab.v-tab--active {
  background: #efefef;
}
.v-window.v-item-group.theme--light.v-tabs-items {
  background: #efefef;
  padding: 30px;
  padding-top: 16px;
  border-radius: 7px;
}
</style>
