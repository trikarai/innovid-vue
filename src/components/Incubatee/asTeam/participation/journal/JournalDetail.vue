<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="dataLoad">
        <v-skeleton-loader
          type="card-heading, card-heading, card-heading, list-item-avatar-two-line@3"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="!dataLoad">
        <v-card class="pa-3">
          <v-card-title primary-title>
            <b>{{dataSingle.name}}</b>
          </v-card-title>
          <v-card-text class="subtitle-1">
            <b>Mission</b>
            <br />
            {{dataList.name}}
            <br />
            <!-- <blockquote class="blockquote">{{dataList.description}}</blockquote> -->
          </v-card-text>
          <v-card-text class="subtitle-1">
            <b>Description</b>
            <br />
            {{dataList.description}}
            <br />
          </v-card-text>
          <v-card-text class="subtitle-1">
            <b>Worksheet</b>
            <br />
            {{dataList.worksheetForm.name}}
          </v-card-text>
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
              <render-record :fields="fields" />
            </v-card-text>
          </template>
          <!--edit worksheet jurnal start-->
          <template v-if="!worksheetDataLoad">
            <v-row class="mt-5" v-if="editWS">
              <v-col>
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
                  :outlined="!mode"
                  @click="createReloadWorksheet"
                >
                  <v-icon left v-if="mode" small>star</v-icon>Replace With Existing Worksheet
                </v-btn>
                <v-btn
                  small
                  class="ma-2"
                  color="primary"
                  :outlined="mode"
                  @click="createNewWorksheet"
                >
                  <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
                </v-btn>
              </v-col>
              <v-col v-if="selectWorksheet">
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
              <v-col>
                <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
              </v-col>
              <v-col md="12">
                <render-form
                  :modeReload="reloadFalse"
                  v-if="!tableLoad"
                  :formTemplate="dataListTemp.worksheetForm"
                  @submit-form="submitForm"
                />
              </v-col>
            </v-row>
            <v-row v-if="!is_newWorksheet">
              <v-col v-if="is_reloadWorksheet">
                <!-- <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field> -->
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
        </v-card>
      </v-col>
      <!--comment block-->
      <v-col>
        <comment-module></comment-module>
      </v-col>
      <!--comment block-->
    </v-row>
    <v-overlay :value="worksheetDataLoad">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      mode: false,
      reloadFalse: false,
      reloadTrue: true,
      is_newWorksheet: true,
      is_updateAtom: true,
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
  components: { RenderForm, RenderRecord, CommentModule },
  created: function() {
    window.sessionStorage.setItem("uploadMode", "team");
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
          // Object.assign(this.dataListTemp, this.dataList);
          this.dataListTemp = JSON.parse(JSON.stringify(res.data.data));
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
        if (this.is_updateAtom == false) {
          params["worksheetId"] = this.exworksheetId;
          params["missionId"] = this.dataList.id;
          this.submitUpdate(params);
        } else {
          params["worksheetFormId"] = this.dataList.worksheetForm.id;
          params["name"] = this.worksheetName;
          this.submitUpdateAtom(params);
        }
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
      this.worksheetDataLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.$route.params.journalId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          // this.refreshData();
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    submitUpdateAtom(params) {
      this.params = params;
      this.worksheetDataLoad = true;
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
          // this.refreshData();
          this.$router.go(-1);
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
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
      // this.worksheetData = {};
      this.mode = false;
      this.is_newWorksheet = true;
      this.is_updateAtom = true;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = false;
      this.getMissionDetail();
    },
    createReloadWorksheet() {
      this.mode = true;
      this.exworksheetId = "";
      this.is_newWorksheet = false;
      this.is_updateAtom = false;
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
      this.fields = [];
      this.editWS = false;
      this.updateJ = false;
      this.getMissionDetail();
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