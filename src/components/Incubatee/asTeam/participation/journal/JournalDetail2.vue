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
        </v-card>
      </v-col>
      <v-col md="12 mt-5" class="title">Learning Material</v-col>
      <v-col cols="12" md="12" lg="12" xs="12" v-if="learningLoad">
        <v-skeleton-loader :loading="true" class="mx-auto" type="list-item-two-line@2" v-></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="learningList.total == 0">
        <v-alert dense type="info" :value="true">No Learning Material Added</v-alert>
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
      <v-col cols="12" md="12" lg="12" xs="12">
        <v-tabs v-model="tab" class="elevation-2" background-color="primary" centered grow>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">New Journal</v-tab>
          <v-tab href="#tab-2">Selected Journal</v-tab>
          <v-tab href="#tab-3">Other Journals in this Mission</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <!-- new journal start-->
          <v-tab-item value="tab-1">
            <v-row>
              <v-col>
                <v-btn
                  small
                  class="ma-2 mt-4 ml-0"
                  color="primary"
                  :text="mode"
                  @click="createNewWorksheet"
                >
                  <v-icon left v-if="!mode" small>star</v-icon>Create New Journal
                </v-btn>
                <v-btn
                  small
                  class="mt-2"
                  color="primary"
                  @click="createReloadWorksheet"
                  :text="!mode"
                >
                  <v-icon left v-if="mode" small>star</v-icon>New Journal From Existing Worksheet
                </v-btn>
              </v-col>
              <v-col class="px-5" md="12" v-if="selectWorksheet">
                <v-select
                  class="ml-0"
                  v-model="exworksheetId"
                  :items="worksheetList.list"
                  item-value="id"
                  item-text="name"
                  label="Existing Worksheet"
                  :loading="worksheetListLoad"
                  no-data-text="No worksheet available"
                  @change="getWorksheetDataReload"
                  solo
                ></v-select>
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
                  @submit-form="submitFormJournalNew"
                />
              </v-col>
            </v-row>
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
                  @submit-form="submitFormJournalNew"
                  @assignworksheet="assignWorksheet"
                />
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col md="12">
                <v-skeleton-loader type="article@2" :boilerplate="true"></v-skeleton-loader>
              </v-col>
            </v-row>-->
          </v-tab-item>
          <!-- new journal end-->

          <v-tab-item value="tab-2">
            <v-row>
              <template v-show="!journalLoad">
                <v-col md="6" v-if="!updateJ">
                  <v-btn small v-if="!editWS" color="primary" @click="editWorksheet">Edit worksheet</v-btn>
                  <v-btn color="warning" small @click="editWS = !editWS" v-else>
                    <v-icon small left>cancel</v-icon>Cancel Edit
                  </v-btn>
                </v-col>
                <v-col md="3" v-if="updateJ">
                  <v-btn
                    small
                    class="ma-2"
                    color="primary"
                    :text="mode"
                    @click="createNewWorksheet"
                  >
                    <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
                  </v-btn>
                </v-col>
                <v-col md="4" v-if="updateJ">
                  <v-btn
                    small
                    class="ma-2"
                    color="primary"
                    :text="!mode"
                    @click="createReloadWorksheet"
                  >
                    <v-icon left v-if="mode" small>star</v-icon>Replace With Existing Worksheet
                  </v-btn>
                </v-col>

                <v-col md="3">
                  <template v-if="!editWS">
                    <v-btn
                      small
                      v-if="!updateJ"
                      color="primary"
                      @click="updateJournal"
                    >Change Journal</v-btn>
                    <v-btn class="ma-2" color="warning" small @click="updateJ = !updateJ" v-else>
                      <v-icon small left>cancel</v-icon>Cancel Change
                    </v-btn>
                  </template>
                </v-col>
                <v-col md="3">
                  <v-btn small fab color="success" @click="openComment()">
                    <v-icon>forum</v-icon>
                  </v-btn>
                </v-col>
              </template>
            </v-row>
            <!--update jurnal start-->
            <template v-if="updateJ">
              <v-row>
                <v-col md="6" v-if="selectWorksheet">
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
                <v-col v-else>
                  <v-skeleton-loader type="card" :boilerplate="true"></v-skeleton-loader>
                </v-col>
              </v-row>
            </template>
            <!--update journal end -->
            <v-row v-if="!editWS">
              <v-col>
                <template v-if="!updateJ">
                  <v-card v-if="!journalLoad">
                    <v-card-title primary-title>
                      <b>{{dataSingle.name}}</b>
                    </v-card-title>
                    <v-card-text class="subtitle-1">
                      <b>Worksheet Form</b>
                      <br />
                      {{dataListTemp.worksheetForm.name}}
                    </v-card-text>
                    <v-card-text class="pt-0 mt-2 ml-3">
                      <render-record :fields="fields" />
                    </v-card-text>
                  </v-card>
                  <v-skeleton-loader type="article" v-else></v-skeleton-loader>
                </template>
              </v-col>
            </v-row>
            <v-row v-else>
              <!--edit worksheet jurnal start-->
              <v-col>
                <v-text-field label="Worksheet Name" outlined v-model="newWsName"></v-text-field>
              </v-col>
              <v-col md="12" lg="12" xs="12">
                <render-form
                  v-if="!worksheetDataLoad"
                  :modeReload="reloadTrue"
                  :formTemplate="dataList.worksheetForm"
                  @submit-form="submitForm"
                />
                <template v-else>
                  <v-skeleton-loader type="article"></v-skeleton-loader>
                </template>
              </v-col>
              <!--edit worksheet jurnal end-->
            </v-row>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card flat v-if="otherLoad">
              <v-card-text>
                <v-skeleton-loader max-width="500" type="list-item-avatar@5"></v-skeleton-loader>
              </v-card-text>
            </v-card>
            <v-row v-else>
              <v-col md="12" lg="12" xs="12">
                <v-btn icon color="primary" @click="getOtherJournal">
                  <v-icon>autorenew</v-icon>
                </v-btn>
              </v-col>
              <v-col md="6" lg="6" xs="12">
                <v-data-table
                  :loading="otherLoad"
                  :headers="tableHeaders"
                  :items="otherJournals.list"
                  class="elevation-1"
                >
                  <template v-slot:item.worksheet="{item}">{{item.worksheet.name}}</template>
                  <template v-slot:item.action="{item}">
                    <v-btn
                      class="elevation-0 mr-2"
                      color="primary"
                      small
                      @click="openDetail(item.mission.id, item.id, item.worksheet.id)"
                    >
                      <v-icon>zoom_in</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-overlay :value="worksheetDataLoad">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-layout row justify-center>
      <v-dialog
        v-model="dialogComment"
        persistent
        :fullscreen="isCommentFullscreen"
        scrollable
        max-width="600px"
      >
        <v-card>
          <v-card-text>
            <comment-module></comment-module>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="black" flat @click.native="isCommentFullscreen = !isCommentFullscreen">
              <v-icon>fullscreen</v-icon>
            </v-btn>
            <v-btn text color="red" flat @click.native="dialogComment = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      tab: "tab-2",
      tableLoad: false,
      reloadFalse: false,
      reloadTrue: true,
      dataListTemp: {
        worksheetForm: {
          name: ""
        }
      },
      dataList: {
        id: "",
        worksheetForm: {
          name: ""
        },
        name: "Mission Name",
        description: "Mission Description",
        nextMission: { id: "" }
      },
      dataLoad: false,
      dataSingle: {},
      journalLoad: false,
      updateJ: false,
      newWsName: "",
      worksheetData: "",
      worksheetDataLoad: false,
      worksheetDataLoad2: false,
      editWS: false,
      fields: [],
      otherJournals: { total: 0, list: [] },
      otherLoad: false,
      tableHeaders: [
        { text: "Mission", value: "mission.name", sortable: false },
        { text: "Worksheet", value: "worksheet", sortable: false },
        { text: "", value: "sub", sortable: false, align: "left" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      learningList: { total: 0, list: [] },
      learningLoad: false,
      worksheetList: { total: 0, list: [] },
      worksheetListLoad: false,
      worksheetName: "",
      is_newWorksheet: true,
      is_reloadWorksheet: false,
      is_updateAtom: false,
      selectWorksheet: false,
      exworksheetId: "",
      branchUri: "",
      root: true,
      dialogComment: false,
      isCommentFullscreen: false
    };
  },
  components: { RenderRecord, RenderForm, CommentModule },
  watch: {
    $route: "refreshData"
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
    if (this.$route.params.parentJournalId) {
      this.root = false;
      this.branchUri = "/" + this.$route.params.parentJournalId;
    } else {
      this.root = true;
      this.branchUri = "";
    }
    this.getMissionDetail();
  },
  mounted() {
    this.getJournalDetail();
    this.getOtherJournal();
  },
  methods: {
    openDetail(missionId, journalId, worksheetId) {
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/mission/" +
          missionId +
          "/journal/" +
          journalId +
          "/worksheet/" +
          worksheetId +
          "/new" +
          this.branchUri
      });
    },
    getOtherJournal() {
      this.otherLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals?missionId=" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.otherJournals = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.otherLoad = false;
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
          this.dataListTemp = JSON.parse(JSON.stringify(res.data.data));
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
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
      this.worksheetData = {};
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
          this.worksheetList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getJournalDetail() {
      this.journalLoad = true;
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
          this.refactorRecordJSON(res.data.data);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.journalLoad = false;
        });
    },
    getWorksheetData() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      this.worksheetOK = false;
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
    getWorksheetDataReload() {
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
    submitFormJournalNew(params) {
      params["missionId"] = this.dataList.id;
      params["worksheetFormId"] = this.dataList.worksheetForm.id;
      params["name"] = this.worksheetName;
      this.worksheetDataLoad = true;
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
          this.worksheetDataLoad = false;
        });
    },
    assignWorksheet(params) {
      params["missionId"] = this.dataList.id;
      params["worksheetId"] = this.exworksheetId;
      params["name"] = this.worksheetName;
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
    refreshData() {
      this.tab = "tab-2";
      this.fields = [];
      this.editWS = false;
      this.updateJ = false;
      this.getMissionDetail();
      this.getJournalDetail();
    },
    openComment() {
      this.dialogComment = true;
    }
  }
};
</script>