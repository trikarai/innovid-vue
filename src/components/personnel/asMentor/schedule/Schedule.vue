<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-btn color="primary" @click="openIncidental()">
          <v-icon left>rate_review</v-icon>Report Incidental Mentoring
        </v-btn>
      </v-col>
    </v-row>
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
            <v-btn
              v-if="!item.containMentorMentoringReport"
              class="ml-2"
              small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon small left>assignment</v-icon>Submit Report
            </v-btn>
            <template v-else>
              <v-chip small>Report Submitted</v-chip>
            </template>
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
    <v-dialog
      v-model="dialogIncidental"
      scrollable
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card :loading="loader">
        <v-card-title>
          <p class="text-capitalize">Report Incidental Mentoring</p>
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="dialogIncidental = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col md="12">
                <v-select
                  :loading="mentoringLoad"
                  :items="mentorings.list"
                  v-model="incidentalParams.mentoringId"
                  label="Mentoring Event"
                  item-text="name"
                  item-value="id"
                  :rules="rulesRequired"
                ></v-select>
              </v-col>
              <v-col md="12">
                <v-autocomplete
                  :loading="participantLoad"
                  :hide-no-data="true"
                  :items="participants.list"
                  v-model="incidentalParams.participantId"
                  item-text="team.name"
                  item-value="id"
                  label="Participant"
                  :rules="rulesRequired"
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date Offer"
                      prepend-icon="today"
                      readonly
                      :rules="rulesRequired"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    :locale="$vuetify.lang.current"
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="schedule"
                      readonly
                      :rules="rulesRequired"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    color="blue"
                    :locale="$vuetify.lang.current"
                    v-model="time"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn block :disabled="!valid" color="primary" @click="submitIncidentalMentoring">Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      menu: false,
      menu2: false,
      valid: false,
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
      leftAction: "",
      dialogIncidental: false,
      incidentalParams: {
        mentoringId: "",
        participantId: "",
        startTime: ""
      },
      date: "",
      time: "",
      mentoringLoad: false,
      mentorings: { total: 0, list: [] },
      participantLoad: false,
      participants: { total: 0, list: [] }
    };
  },
  watch: {
    date: "setDateTime",
    time: "setDateTime"
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    setDateTime: function() {
      this.incidentalParams.startTime = this.date + " " + this.time;
    },
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
    },
    openIncidental() {
      this.dialogIncidental = true;
      this.getMentoringList();
      this.getParticipantList();
    },
    getMentoringList() {
      this.mentoringLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/mentorings",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.mentorings = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.mentoringLoad = false;
        });
    },
    getParticipantList() {
      this.participantLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.participants = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.participantLoad = false;
        });
    },
    submitIncidentalMentoring() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules",
          this.incidentalParams,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Mentoring Submitted");
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    refresh() {
      this.dialogIncidental = false;
      this.dialogForm = false;
      this.dialogDelete = false;
      this.dialogDetail = false;
      this.getDataList();
    }
  }
};
</script>