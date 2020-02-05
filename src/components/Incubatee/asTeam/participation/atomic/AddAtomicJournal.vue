<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-card :loading="tableLoad">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{dataList.name}}</h3>
          </v-card-title>
          <v-card-text>
            <div class="subtitle">{{dataList.description}}</div>
          </v-card-text>
          <v-card-text v-if="dataList.previousMission != null">
            <v-icon color="indigo accent-1" left>account_tree</v-icon>
          </v-card-text>
          <v-card-text v-else>
            <v-icon color="indigo accent-1" left>trip_origin</v-icon>Root
          </v-card-text>
          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-btn
          small
          class="ma-2"
          color="primary"
          :disabled="mode"
          @click="createReloadWorksheet"
        >Reload Existing Worksheet</v-btn>
        <v-btn
          small
          class="ma-2"
          color="primary"
          :disabled="!mode"
          @click="createNewWorksheet"
        >Create New Worksheet</v-btn>
      </v-col>
      <v-col v-if="selectWorksheet" md="6">
        <v-select
          class="ml-0"
          v-model="exworksheetId"
          :items="worksheetList.list"
          item-value="id"
          item-text="name"
          label="Existing Worksheet"
          :loading="tableLoad"
          no-data-text="No worksheet available"
          @change="getWorksheetData"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-if="!is_newWorksheet">
      <v-col md="12" v-if="is_reloadWorksheet">
        <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
        <render-form
          :modeReload="reloadTrue"
          v-if="!tableLoad"
          :formTemplate="dataList.worksheetForm"
          @submit-form="submitForm"
        />
      </v-col>
      <!-- <v-col><pre>{{worksheetData}}</pre></v-col> -->
      <!-- <v-col>
        <pre>{{dataList.worksheetForm}}</pre>
      </v-col>-->
    </v-row>
    <v-row v-if="is_newWorksheet">
      <v-col md="12">
        <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
        <render-form
          :modeReload="reloadFalse"
          v-if="!tableLoad"
          :formTemplate="dataList.worksheetForm"
          @submit-form="submitForm"
        />
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>{{testMap}}</v-col>
    </v-row>-->
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
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets",
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
          this.tableLoad = false;
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
    }
  }
};
</script>