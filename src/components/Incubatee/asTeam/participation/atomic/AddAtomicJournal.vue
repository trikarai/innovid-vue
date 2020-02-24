<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="12">
        <v-skeleton-loader class="mx-auto" type="card" v-if="tableLoad"></v-skeleton-loader>
        <v-card class="pa-3" v-else>
          <v-card-title primary-title>
            {{dataList.name}}
            <v-spacer></v-spacer>
            <span class="dot2"></span>
            <span class="dot1 ml-1"></span>
          </v-card-title>
          <v-card-text>
            <div class="subtitle">{{dataList.description}}</div>
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
          <!-- <v-card-actions>
            <v-btn
              v-if="dataList.previousMission !== null"
              text
              color="accent"
              :disabled="dataList.previousMission == null"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + dataList.previousMission.id "
            >Prev Mission</v-btn>
            <v-btn
              v-else
              text
              color="accent"
              :disabled="dataList.previousMission == null"
              router
            >Prev Mission</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <v-col md="12 mt-5" class="title">Learning Material</v-col>
      <v-col cols="12" md="12" lg="12" xs="12" v-if="learningLoad">
        <v-skeleton-loader :loading="true" class="mx-auto" type="list-item-two-line@2" v-></v-skeleton-loader>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
        xs="12"
        v-if="learningList.total == 0"
      >
        <v-alert dense type="info" :value="true">
          No Learning Material Added
        </v-alert>    
      </v-col>
      <v-col cols="12" md="12" lg="12" xs="12" v-else>
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(learning,i) in learningList.list" :key="i">
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-chip color="#505050" dark>
                  Expand
                  <v-icon class="ml-3" color="white">keyboard_arrow_down</v-icon>
                </v-chip>
              </template>
              {{learning.name}}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-10 ml-4">
              <span v-html="$sanitize(learning.content)" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12 mt-5" class="title">Worksheet</v-col>
      <v-col cols="12" md="12" lg="12" xs="12">
        <v-card class="pa-3 mt-3">
          <v-col class="px-5">
            <v-btn
              small
              class="ma-2 mt-4 ml-0"
              color="primary"
              @click="createReloadWorksheet"
              :outlined="!mode"
            >
              <v-icon left v-if="mode" small>star</v-icon>Reload Existing Worksheet
            </v-btn>
            <v-btn small class="mt-2" color="primary" @click="createNewWorksheet" :outlined="mode">
              <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
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
                  <v-text-field class="mx-5" label="Worksheet Name" v-model="worksheetName" outlined></v-text-field>
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
                  <v-text-field class="mx-5" label="Worksheet Name" v-model="worksheetName" outlined></v-text-field>
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

import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
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
    RenderForm
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
            "/worksheets?programParticipationId=" +
            this.$route.params.cohortId +
            "&worksheetFormIds[]=" +
            this.dataList.worksheetForm.id +
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
