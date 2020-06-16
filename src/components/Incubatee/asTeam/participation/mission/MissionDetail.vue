<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col cols="12" lg="12" md="6">
        <v-card class="pa-3" :loading="tableLoad">
          <v-card-title primary-title>
            {{ dataList.name }}
            <v-spacer></v-spacer>
            <span class="dot2"></span>
            <span class="dot1 ml-1"></span>
          </v-card-title>
          <v-card-text>
            <div class="subtitle">{{ dataList.description }}</div>
          </v-card-text>
          <v-card-text v-if="dataList.previousMission != null">
            <v-chip small>
              <v-avatar left>
                <v-icon small color="primary">account_tree</v-icon>
              </v-avatar>
              <span style="color:#999">Branch Mission</span>
            </v-chip>
          </v-card-text>
          <v-card-text v-else>
            <v-chip small>
              <v-avatar left>
                <v-icon small color="primary">assignment_turned_in</v-icon>
              </v-avatar>
              <span style="color:#999">Main Mission</span>
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12">
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
                  <worksheet-viewer :isNewWorksheet.sync="isNewWorksheet" />
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
        <v-col cols="12" lg="12">
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
  },
};
</script>
