<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col>
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.mentoring.name}}
          </template>
          <template v-slot:item.startTime="{item}">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.startTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.startTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.endTime="{item}">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.endTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.endTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.action="{item}">
            <v-btn class="ml-2" small color="primary" @click="openReport(item.id)">
              <v-icon small left>assignment</v-icon>Report
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialogDetail"
      scrollable
      persistent
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p class="text-capitalize"></p>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <v-card-text>{{dataSingle}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", email: "" },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Team", value: "participant.team.name", sortable: false },
        { text: "startTime", value: "startTime", sortable: false },
        { text: "endTime", value: "endTime", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: ""
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules",
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
    openDetail(id) {
      // this.dialogDetail = true;
      // this.getDataSingle(id);
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.mentorshipId +
          "/schedule/" +
          id
      });
    },
    openReport(id) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.mentorshipId +
          "/schedule/" +
          id +
          "/report"
      });
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>