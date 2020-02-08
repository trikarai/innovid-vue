<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="dataLoad">
        <v-skeleton-loader
          type="card-heading, card-heading, card-heading, list-item-avatar-two-line@3"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="!dataLoad">
        <v-card>
          <v-card-title primary-title>{{dataSingle.name}}</v-card-title>
          <v-card-title>Mission : {{dataList.name}}</v-card-title>
          <v-card-title>Worksheet : {{dataList.worksheetForm.name}}</v-card-title>
          <v-card-actions>
            <template v-if="!updateJ">
              <v-btn color="primary" small v-if="!editWS" @click="editWorksheet">
                <v-icon small left>edit</v-icon>Edit Worksheet Record
              </v-btn>
              <v-btn color="warning" small @click="editWS = !editWS" v-else>
                <v-icon small left>cancel</v-icon>Cancel Edit
              </v-btn>
            </template>
            <template v-if="!editWS">
              <v-btn color="primary" small v-if="!updateJ" @click="updateJournal">
                <v-icon small left>edit</v-icon>Update Journal
              </v-btn>
              <v-btn color="warning" small @click="updateJ = !updateJ" v-else>
                <v-icon small left>cancel</v-icon>Cancel Update
              </v-btn>
            </template>
          </v-card-actions>
          <template v-if="!updateJ">
            <v-card-text class="pt-0 mt-2 ml-3" v-if="!editWS">
              <template v-for="data in fields">
                <v-row :key="data.field.id">
                  <b>{{data.field.name}}</b>
                </v-row>
                <v-row
                  class="mb-4 grey--text"
                  :key="data.id"
                  v-if="data.type == 'string'"
                >{{data.value}}</v-row>
                <v-row
                  class="mb-4 grey--text"
                  :key="data.id"
                  v-if="data.type == 'radio'"
                >{{data.selectedOption.name}}</v-row>
                <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'select'">
                  <template v-for="opt in data.selectedOptions">{{opt.option.name}} ,</template>
                </v-row>
              </template>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
      <!--comment block-->
      <comment-module></comment-module>
      <!--comment block-->
    </v-row>

    <!--edit worksheet jurnal start-->
    <template v-if="!worksheetDataLoad">
      <v-row v-if="editWS">
        <v-col md="6" lg="6" xs="12">
          <v-text-field label="Worksheet Name" outlined v-model="newWsName"></v-text-field>
        </v-col>
        <v-col md="12" lg="12" xs="12">
          <render-form
            :modeReload="reloadTrue"
            v-if="!tableLoad"
            :formTemplate="dataList.worksheetForm"
            @submit-form="submitForm"
          />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col md="6" lg="6" xs="12">
          <v-skeleton-loader type="card-heading, article, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
    <!--edit worksheet jurnal end-->

    <!--update jurnal start-->
    <template v-if="updateJ">
      <v-row>
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
      <v-row v-if="is_newWorksheet">
        <v-col md="6">
          <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
        </v-col>
        <v-col md="12">
          <render-form
            :modeReload="reloadFalse"
            v-if="!tableLoad"
            :formTemplate="dataList.worksheetForm"
            @submit-form="submitForm"
          />
        </v-col>
      </v-row>
      <v-row v-if="!is_newWorksheet">
        <v-col md="6" v-if="is_reloadWorksheet">
          <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
        </v-col>
        <v-col md="12" v-if="is_reloadWorksheet">
          <render-form
            :modeReload="reloadTrue"
            v-if="!tableLoad"
            :formTemplate="dataList.worksheetForm"
            @submit-form="submitForm"
          />
        </v-col>
      </v-row>
    </template>
    <!--update jurnal end-->
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      mode: false,
      reloadTrue: true,
      is_newWorksheet: true,
      is_reloadWorksheet: false,
      selectWorksheet: false,
      exworksheetId: "",
      worksheetName: "",
      teamId: this.$route.params.teamId,
      authData: "",
      search: "",
      dataList: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" },
        worksheetForm: {
          name: ""
        }
      },
      dataListTemp: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" }
      },
      worksheetList: { total: 0, list: [] },
      dataSingle: {},
      worksheetData: {},
      fields: [],
      tableLoad: false,
      dataLoad: false,
      worksheetDataLoad: false,
      worksheetDataLoad2: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      editWS: false,
      updateJ: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: ""
    };
  },
  components: { RenderForm, CommentModule },
  created: function() {
    this.getMissionDetail();
  },
  mounted: function() {
    this.getDataSingle();
  },
  methods: {
    getDataSingle() {
      this.dataLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.$route.params.worksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
          this.worksheetData = res.data.data;
          this.refactorRecordJSON(res.data.data);
          // this.pairFieldValue(res.data.data);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.dataLoad = false;
        });
    },
    getWorksheetData() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      // this.worksheetOK = false;
      this.is_reloadWorksheet = false;
      var worksheetId;
      if (this.editWS) {
        this.worksheetDataLoad = true;
        worksheetId = this.$route.params.worksheetId;
      } else {
        this.worksheetDataLoad2 = true;
        worksheetId = this.exworksheetId;
      }
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            worksheetId,
          // this.exworksheetId,
          // this.$route.params.worksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.worksheetData = res.data.data;
          this.newWsName = this.worksheetData.name;
          this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
          this.worksheetDataLoad2 = false;
          if (this.updateJ) {
            this.is_reloadWorksheet = true;
          } else {
            this.is_reloadWorksheet = false;
          }
        });
    },
    getMissionDetail() {
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
      if (this.editWS) {
        params["name"] = this.newWsName;
        this.submitEdit(params);
      } else {
        params["name"] = this.worksheetName;
        params["worksheetFormId"] = this.worksheetData.worksheetForm.id;
        this.submitUpdate(params);
      }
      // this.params = params;
    },
    submitEdit(params) {
      this.params = params;
      this.worksheetDataLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.$route.params.worksheetId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    submitUpdate(params) {
      this.params = params;
      this.worksheetDataLoad2 = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals_atomic-worksheet/" +
            this.$route.params.journalId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad2 = false;
        });
    },
    editWorksheet() {
      this.editWS = true;
      this.updateJ = false;
      this.getWorksheetData();
    },
    updateJournal() {
      this.updateJ = true;
      this.editWS = false;
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
    refreshData() {
      this.editWS = false;
      this.getDataSingle();
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>