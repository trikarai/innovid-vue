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
      <v-col md="12">
        <v-timeline :reverse="true">
          <v-timeline-item v-for="(data, index) in dataList.list" :key="data.id">
            <v-card class="elevation-5">
              <v-card-title class="headline">{{data.position}} : {{data.name}}</v-card-title>
              <v-card-text v-if="data.previousMission != null">
                <v-icon color="indigo accent-1" left>account_tree</v-icon>
                {{data.previousMission.name}}
              </v-card-text>
              <v-card-text v-else>
                <v-icon color="indigo accent-1" left>trip_origin</v-icon>Root
              </v-card-text>
              <!-- {{data}} -->
              <v-card-text v-if="data.journal.length != 0">
                <v-select
                  :ref="'selectInput'+index"
                  :items="data.journal"
                  item-text="worksheet.name"
                  item-value="id"
                  outlined
                  @change="getBranchJournal($event, data.id)"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="success"
                  fab
                  x-small
                  router
                  :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id "
                >
                  <v-icon small>zoom_in</v-icon>
                </v-btn>

                <v-btn
                  v-if="data.previousMission == null"
                  color="primary"
                  small
                  router
                  :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id + '/atom' "
                >
                  <v-icon left>add</v-icon>Add Journal
                </v-btn>
                <template v-else>
                  <v-btn
                    v-if="data.selectedParentJournal"
                    color="primary"
                    small
                    router
                    :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + data.id + '/atom/'+ data.selectedParentJournal "
                  >
                    <v-icon left>add</v-icon>Add Journal
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
          <v-btn color="green" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn color="red" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

export default {
  data() {
    return {
      search: "",
      journalIdRoot: "",
      dataList: { total: 0, list: [] },
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
    getDataList() {
      this.tableLoad = true;
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
    openJournal(index) {
      // eslint-disable-next-line no-console
      console.log(this.$refs["selectInput" + index]);
      // this.$router.push({
      //   path:
      //     "/incubatee/team/" +
      //     this.$route.params.teamId +
      //     "/worksheet/" +
      //     this.$refs['selectInput' + index]
      // });
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
            event,
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