<template>
  <v-container extend grid-list-xs>
    <!-- jangan dihapus start-->
    <v-row style="display:none">
      <v-col md="6">
        <pre>{{journalList}}</pre>
        <pre>{{journalList2}}</pre>
      </v-col>
    </v-row>
    <!-- jangan dihapus end-->
    <v-row>
      <v-col md="12" v-if="missionLoader">
        <v-skeleton-loader max-width="500" type="article"></v-skeleton-loader>
      </v-col>
      <v-col md="6" v-if="dataList.total == 0">
        <div v-if="!missionLoader">
          <v-alert
            type="info"
            :value="true"
          >Incubator hasn't publish a mission at the momment for this program</v-alert>
        </div>
      </v-col>
      <v-col md="12" v-else>
        <v-timeline :reverse="true" align-top>
          <v-timeline-item v-for="(data, index) in reOrderMission(dataList.list)" :key="data.id">
            <template v-slot:icon>
              <v-avatar>
                <span style="color:#fff">{{data.position}}</span>
              </v-avatar>
            </template>
            <v-card class="pa-3 elevation-5">
              <v-card-title class="headline">
                {{data.name}}
                <v-spacer></v-spacer>
                <span class="dot2"></span>
                <span class="dot1 ml-1"></span>
              </v-card-title>
              <v-card-text v-if="data.previousMission != null">
                <v-chip small>
                  <v-avatar left>
                    <v-icon small color="primary">account_tree</v-icon>
                  </v-avatar>
                  <span style="color:#999">{{data.previousMission.name}}</span>
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
              <v-card-text class="subtitle">{{data.description}}</v-card-text>
              <v-card-text v-if="data.journal.length != 0">
                <!-- {{data.journal}} -->
                <v-select
                  dense
                  label="Choose a journal"
                  :items="data.journal"
                  item-text="worksheet.name"
                  item-value="id"
                  outlined
                  return-object
                  v-model="selectedJournalinMission[index]"
                  @change="getBranchJournal($event, data.id)"
                  append-outer-icon="zoom_in"
                  @click:append-outer="openJournal(selectedJournalinMission[index])"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn
                  small
                  color="primary"
                  v-if="selectedJournalinMission[index] !== ''"
                  @click="openJournal(selectedJournalinMission[index])"
                >view journal</v-btn>-->
                <!-- <v-btn
                  small
                  color="primary"
                  router
                  :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id "
                >
                  <v-icon left small>zoom_in</v-icon>view
                </v-btn>-->

                <v-btn
                  v-if="data.previousMission == null"
                  color="primary"
                  small
                  router
                  :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id + '/atom' "
                >
                  <v-icon small left>search</v-icon>View Detail
                </v-btn>
                <template v-else>
                  <v-btn
                    v-if="data.selectedParentJournal"
                    color="primary"
                    small
                    router
                    :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id + '/atom/'+ data.selectedParentJournal "
                  >
                    <v-icon small left>search</v-icon>View Detail
                  </v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persisteFnt="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
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
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

export default {
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
      leftAction: ""
    };
  },
  mounted() {
    this.getDataList();
    this.getRootMissionJurnal();
  },
  methods: {
    reOrderMission: function(params) {
      return Vue._.orderBy(
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
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;

          this.dataList.list.forEach(element => {
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
      //   this.leftName = item.mentoring.name;
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
            headers: auth.getAuthHeader()
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
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getRootMissionJurnal() {
      // this.tableLoad = true;
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
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.journalList = res.data.data;
          // this.dataList.list[0]["journal"] = res.data.data;
          this.journalList.list.forEach(journalElement => {
            this.dataList.list.forEach(missionElement => {
              if (missionElement.id == journalElement.mission.id) {
                missionElement["journal"].push(journalElement);
              }
            });
          });
        })
        .catch(() => {})
        .finally(() => {
          // this.tableLoad = false;
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
          journal.worksheet.id
      });
    },
    getBranchJournal(event, missionId) {
      // this.tableLoad = true;

      this.resetElement(missionId);

      this.dataList.list.forEach(element => {
        if (
          element.previousMission != null &&
          element.previousMission.id == missionId
        ) {
          element["selectedParentJournal"] = event;
        }
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
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          // this.journalList = res.data.data;
          // this.dataList.list[index + 1]["journal"] = res.data.data;
          this.journalList2 = res.data.data;

          this.journalList2.list.forEach(journalElement => {
            this.dataList.list.forEach(missionElement => {
              if (missionElement.id == journalElement.mission.id) {
                missionElement["journal"].push(journalElement);
              }
            });
          });
        })
        .catch(() => {})
        .finally(() => {
          // this.tableLoad = false;
        });
    },
    resetElement(parentMissionId) {
      this.dataList.list.forEach(element => {
        if (
          element.previousMission != null &&
          element.previousMission.id == parentMissionId
        ) {
          this.resetElement(element.id);
          element.journal = new Array();
        }
      });
    }
  }
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
  bottom: 23px;
  left: 13px;
}
.dot2 {
  height: 7px;
  width: 7px;
  background-color: rgb(163, 215, 45);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: 23px;
  left: 13px;
}
</style>