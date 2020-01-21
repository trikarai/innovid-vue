<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Learning Material</v-expansion-panel-header>
            <v-expansion-panel-content>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-card :loading="tableLoad">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{dataList.name}}</h3>
              <div>{{dataList.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="accent" disabled>Prev Mission</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="accent" disabled>Next Mission</v-btn>
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
      <v-col md="12">{{worksheetData}}</v-col>
      <v-col md="12">
        <pre> {{dataList}} </pre>
      </v-col>
    </v-row>
    <v-row v-if="is_newWorksheet">
      <v-col md="12">
        <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
        <!-- <pre> {{dataList.worksheetForm}} </pre> -->
        <render-form
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

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  data() {
    return {
      mode: false,
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
      testMap: ""
    };
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
          this.dataListTemp = res.data.data;
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

      //   this.params = params;
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals_atomic-worksheet",
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
      this.worksheetData = {};
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
          this.is_reloadWorksheet = false;
        });
    },
    pairFieldValue(data) {
      //https://stackoverflow.com/questions/56444006/how-to-merge-the-property-with-same-key-in-two-object-array?noredirect=1&lq=1
      var map = new Map(
        data.stringFieldRecords.map(o => [o.stringField.id, o])
      );
      var result = this.dataList.worksheetForm.stringFields.map(o =>
        Object.assign({}, o, map.get(o.id))
      );
      //   this.testMap = result;
      this.dataList.worksheetForm.stringFields = result;
    }
  }
};
</script>