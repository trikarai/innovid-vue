<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xl="6" lg="12" md="12" v-if="missionLoader">
        <v-skeleton-loader max-width="500" type="article"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" v-if="dataList.total == 0">
        <div v-if="!missionLoader">
          <v-alert type="info" :value="true"
            >Incubator hasn't publish a mission at the momment for this
            program</v-alert
          >
        </div>
      </v-col>
      <v-col cols="12" xl="10" lg="11" md="12" v-else>
          <v-timeline :reverse="true" align-top :dense="false">
            <v-timeline-item
              v-for="data in reOrderMission(dataList.list)"
              :key="data.id"
            >
              <template v-slot:icon>
                <v-avatar>
                  <span style="color:#fff">{{ data.position }}</span>
                </v-avatar>
              </template>
              <v-card class="pa-3 pt-0 elevation-5">
                <div style="float: right !important;position: relative;top: 38px;">
                  <span class="dot2"></span>
                  <span class="dot1 ml-1"></span>
                </div>
                <v-card-title class="headline">
                  <v-row>
                    <v-col style="word-break: break-word;font-size: 15px;font-weight: 600;" md="8">{{
                      data.name
                    }}</v-col>
                    <v-col
                      style="text-align:end;"
                      md="4"
                      v-if="data.previousMission != null"
                    >
                      <v-chip x-small>
                        <v-avatar left>
                          <v-icon x-small color="primary">account_tree</v-icon>
                        </v-avatar>
                        <span style="color:#999">{{
                          data.previousMission.name
                        }}</span>
                      </v-chip>
                    </v-col>
                    <v-col style="text-align:end;" md="4" v-else>
                      <v-chip x-small>
                        <v-avatar left>
                          <v-icon x-small color="primary"
                            >assignment_turned_in</v-icon
                          >
                        </v-avatar>
                        <span style="color:#999">Main Mission</span>
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text class="subtitle" style="text-align:justify;">
                  <span class="">{{ data.description }}</span>
                </v-card-text>

                <v-card-actions class="pt-0">
                  <v-row justify="space-between">
                    <v-col cols="12" lg="6">
                      <v-btn
                        small
                        color="primary"
                        @click="gotoMissionDetail(data.id)"
                      >
                        <v-icon left>zoom_in</v-icon>Open
                      </v-btn>
                    </v-col>
                    <v-col style="text-align:right;" cols="12" lg="6">
                      <!-- <span class="textlimit2" v-if="data.submittedJournal" -->
                      <span style="
                            position: relative;
                            top: 6px;
                            background: #d6f7ff;
                            color: #646464;
                            padding: 3px 13px 3px 13px;" 
                            v-if="data.submittedJournal"
                        >Submitted Journal: <span style="color: #00667f;font-weight: 900;margin-left: 5px;">{{ data.submittedJournal }}</span> </span
                      >
                      <span 
                      style="
                          position: relative;
                          top: 6px;
                          background: #d6f7ff;
                          color: #646464;
                          padding: 3px 13px 3px 13px;" 
                      v-else>No Journal Submitted</span>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-timeline-item>
          </v-timeline>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{ leftAction }}</p>
        </v-card-title>
        <v-card-text>{{ leftName }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="red" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import { participationWatcherMixins } from "@/mixins/participationWatcherMixins";

export default {
  mixins: [participationWatcherMixins],
  data() {
    return {
      selectedJournalinMission: [],
      search: "",
      journalIdRoot: "",
      dataList: { total: 0, list: [] },
      missionLoader: false,
      journalList: { total: 0, list: [] },
      journalList2: [],
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
      journalCreateLoading: false,
    };
  },
  watch: {
    $route() {
      this.dataList = { total: 0, list: [] };
      this.getDataList();
      // this.getRootMissionJurnal();
    },
    participationId() {
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.participationId +
          "/mission",
      });
    },
  },
  mounted() {
    this.getDataList();
    // this.getRootMissionJurnal();
  },
  methods: {
    reOrderMission: function(params) {
      return this._.orderBy(
        params,
        function(o) {
          return new Number(o.position);
        },
        "asc"
      );
    },
    getDataList() {
      this.tableLoad = true;
      this.missionLoader = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataList = res.data.data;

          this.dataList.list.forEach((element) => {
            element["journal"] = new Array();
          });
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
          this.missionLoader = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
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
    getRootMissionJurnal() {
      this.journalCreateLoading = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals?parentJournalId=" +
            encodeURI(null),
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journalList = res.data.data;
          // this.dataList.list[0]["journal"] = res.data.data;
          this.journalList.list.forEach((journalElement) => {
            this.dataList.list.forEach((missionElement) => {
              if (missionElement.id == journalElement.mission.id) {
                missionElement["journal"].push(journalElement);
              }
            });
          });
        })
        .catch(() => {})
        .finally(() => {
          this.journalCreateLoading = false;
        });
    },
    openJournal(journal) {
      // eslint-disable-next-line no-console
      this.$router.push({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/mission/" +
          journal.mission.id +
          "/journal/" +
          journal.id +
          "/worksheet/" +
          journal.worksheet.id,
      });
    },
    // eslint-disable-next-line no-unused-vars
    openJournal2(journal, type, parentId) {
      // eslint-disable-next-line no-console
      var parent_uri = "";

      if (type == "branch") {
        parent_uri = "/" + parentId;
      }

      this.$router.push({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/mission/" +
          journal.mission.id +
          "/journal/" +
          journal.id +
          "/worksheet/" +
          journal.worksheet.id +
          "/new" +
          parent_uri,
      });
    },
    getBranchJournal(event, missionId) {
      this.journalCreateLoading = true;
      this.resetElement(missionId);
      this.dataList.list.forEach((element) => {
        if (
          element.previousMission != null &&
          element.previousMission.id == missionId
        ) {
          element["selectedParentJournal"] = event;
        }
        // else {
        //   delete element.selectedParentJournal;
        // }
      });
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals?parentJournalId=" +
            event.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          // this.journalList = res.data.data;
          // this.dataList.list[index + 1]["journal"] = res.data.data;
          this.journalList2 = res.data.data;

          this.journalList2.list.forEach((journalElement) => {
            this.dataList.list.forEach((missionElement) => {
              if (missionElement.id == journalElement.mission.id) {
                missionElement["journal"].push(journalElement);
              }
            });
          });
        })
        .catch(() => {})
        .finally(() => {
          this.journalCreateLoading = false;
        });
    },
    resetElement(parentMissionId) {
      this.dataList.list.forEach((element) => {
        if (
          element.previousMission != null &&
          element.previousMission.id == parentMissionId
        ) {
          this.resetElement(element.id);
          element.journal = new Array();
        }
      });
    },
    refreshRootJournal() {
      this.getRootMissionJurnal();
    },
    refreshBranchJournal() {
      this.getBranchJournal();
    },

    gotoMissionDetail(missionId) {
      this.$store.commit("setMissionLength", this.dataList.list.length);
      this.$router.push({
        name: "team-misssion-detail",
        params: {
          cohortId: this.$route.params.cohortId,
          teamId: this.$route.params.teamId,
          missionId: missionId,
        },
      });
    },
  },
};
</script>

<style>
.dot1 {
  height: 7px;
  width: 7px;
  background-color: #249c90;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: 7px;
  left: 1px;
}
.dot2 {
  height: 7px;
  width: 7px;
  background-color: rgb(163, 215, 45);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: 7px;
  left: 1px;
}
</style>

<style scoped>
.textlimit {
  display: block; /* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  line-height: 1.8em;
}
.textlimit2 {
  display: block; /* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 5.6em;
  line-height: 1.8em;
}
</style>
