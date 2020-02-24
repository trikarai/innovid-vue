<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6" lg="6" xs="12">
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.worksheet="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.mission.id, item.id, item.worksheet.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.worksheet.name}}
          </template>

          <!-- <template v-slot:item.action="{item}"> -->
            <!-- <v-btn small color="warning" @click="leftAct(item, 'Remove')">
              <v-icon left>delete</v-icon>Remove
            </v-btn> -->
          <!-- </template> -->
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
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
import { participationWatcherMixins } from "@/mixins/participationWatcherMixins";

export default {
  mixins: [participationWatcherMixins],
  data() {
    return {
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { cohort: { name: "" } },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Mission", value: "mission.name", sortable: false },
        { text: "Worksheet", value: "worksheet", sortable: false },
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
  watch: {
    $route() {
      this.getDataList();
    },
    participationId() {
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.participationId +
          "/journal"
      });
    }
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
            "/journals",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
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
            "Successfully " + this.leftAction + " Journal"
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
    openDetail(missionId, journalId, worksheetId) {
      this.$router.push({
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
          worksheetId
      });
    }
  }
};
</script>