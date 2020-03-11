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
              <v-col class="px-5">
                <v-btn
                  small
                  class="ma-2 mt-4 ml-0"
                  :color="setColor(!mode)"
                  @click="createNewWorksheet"
                  :text="mode"
                >
                  <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
                </v-btn>
                <v-btn
                  small
                  class="mt-2"
                  @click="createReloadWorksheet"
                  :text="!mode"
                  :color="setColor(mode)"
                >
                  <v-icon left v-if="mode" small>star</v-icon>Reload Existing Worksheet
                </v-btn>
              </v-col>
              <v-col class="px-5" md="6" v-if="selectWorksheet">
                <v-select
                  class="ml-0"
                  v-model="exworksheetId"
                  :items="worksheetList.list"
                  item-value="id"
                  item-text="name"
                  label="Existing Worksheet"
                  :loading="worksheetListLoad"
                  no-data-text="No worksheet available"
                  @change="getWorksheetData"
                  solo
                ></v-select>
              </v-col>
              <v-row v-if="!is_newWorksheet">
                <v-col class="my-0 py-0" md="12" v-if="is_reloadWorksheet">
                  <v-row>
                    <v-col md="6" lg="6" xs="12">
                      <v-text-field
                        class="mx-5"
                        label="Worksheet Name"
                        v-model="worksheetName"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <render-form
                    :modeReload="reloadTrue"
                    :modeAtom="true"
                    v-if="!tableLoad"
                    :formTemplate="dataList.worksheetForm"
                    @submit-form="submitForm"
                    @assignworksheet="assignWorksheet"
                  />
                </v-col>
              </v-row>
              <v-row class="my-0 py-0" v-if="is_newWorksheet">
                <v-col class="my-0 py-0" md="12">
                  <v-row>
                    <v-col md="6" lg="6" xs="12">
                      <v-text-field
                        class="mx-5"
                        label="Worksheet Name"
                        v-model="worksheetName"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <render-form
                    :modeAtom="false"
                    :modeReload="reloadFalse"
                    v-if="!tableLoad"
                    :formTemplate="dataList.worksheetForm"
                    @submit-form="submitForm"
                  />
                </v-col>
              </v-row>
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
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import MissionComp from "../journal/subMissionCard";
import LearningComp from "../journal/subLearning";
import OtherComp from "../journal/subOtherJournal";

import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      tab: "tab-1",
      learningList: { total: 0, list: [] },
      learningLoad: false,
      mode: false,
      reloadFalse: false,
      reloadTrue: true,
      search: "",
      dataList: { id: "", name: "", description: "", nextMission: { id: "" } },
      dataListTemp: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" }
      },
      worksheetList: { total: 0, list: [] },
      worksheetListLoad: false,
      worksheetData: {},
      worksheetDataOK: false,
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Mission", value: "name", sortable: false },
        { text: "Worksheet", value: "worksheet.name", sortable: false },
        { text: "", value: "sub", sortable: false, align: "left" },
        { text: "", value: "action", sortable: false, align: "right" }
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
      is_newWorksheet: true,
      is_reloadWorksheet: false,
      selectWorksheet: false,
      exworksheetId: "",
      worksheetName: "",
      params: "",
      testMap: "",
      root: true
    };
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
    if (this.$route.params.journalId) {
      this.root = false;
      this.branchUri = "/" + this.$route.params.journalId;
    } else {
      this.root = true;
      this.branchUri = "";
    }
  },
  components: {
    RenderForm,
    MissionComp,
    LearningComp,
    OtherComp
  },
  mounted() {
    this.getDataList();
    this.getLearningMaterialList();
  },
  methods: {
    setColor(mode) {
      if (mode) {
        return "primary";
      } else {
        ("grey");
      }
    },
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
          Object.assign(this.dataListTemp, this.dataList);
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    submitForm(params) {
      params["missionId"] = this.dataList.id;
      params["worksheetFormId"] = this.dataList.worksheetForm.id;
      params["name"] = this.worksheetName;

      // this.params = params;
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals_atomic-worksheet" +
            this.branchUri,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Data Uploaded");
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    assignWorksheet(params) {
      params["missionId"] = this.dataList.id;
      params["worksheetId"] = this.exworksheetId;
      params["name"] = this.worksheetName;

      // this.params = params;
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals" +
            this.branchUri,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Assigned");
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    createNewWorksheet() {
      this.mode = false;
      this.is_newWorksheet = true;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = false;
      this.getDataList();
    },
    createReloadWorksheet() {
      this.mode = true;
      this.exworksheetId = "";
      this.is_newWorksheet = false;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = true;
      this.getWorksheetList();
    },
    getWorksheetList() {
      this.worksheetListLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets?worksheetFormIds[]=" +
            this.dataList.worksheetForm.id +
            // "&programParticipationId=" +
            // this.$route.params.cohortId +
            "&missionIds[]=" +
            this.dataList.id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.worksheetList = res.data.data;
          } else {
            this.worksheetList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetListLoad = false;
        });
    },
    getWorksheetData() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      this.worksheetOK = false;
      this.is_reloadWorksheet = false;
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.exworksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.worksheetData = res.data.data;
          this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
          this.is_reloadWorksheet = true;
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
