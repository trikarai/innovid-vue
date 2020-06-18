<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-select
          :loading="scheduleLoad"
          v-model="selectedCohort"
          label="Program"
          :items="dataMentorships.list"
          item-text="program.name"
          return-object
          outlined
        ></v-select>
      </v-col>
      <v-col md="6">
        <v-btn
          v-if="dataMentorships.total != 0"
          color="primary"
          @click="openIncidental()"
        >
          <v-icon left>add</v-icon>Report Incidental Mentoring
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12" class="title">Schedule Mentoring</v-col>
      <v-col md="12">
        <v-data-table
          :loading="scheduleLoad"
          :headers="scheduleHeaders"
          :items="schedulementorings.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{ item.mentoring.name }}
          </template>
          <template v-slot:item.startTime="{ item }">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.startTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.startTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.endTime="{ item }">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.endTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.endTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              class="mr-2"
              small
              color="primary"
              :to="{
                name: 'mentor-schedule-conference',
                params: {
                  mentorshipId: selectedCohort.id,
                  scheduleId: item.id,
                },
              }"
            >
              <v-icon>mdi-message-video</v-icon>
            </v-btn>
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
    <v-row>
      <v-col md="12" class="title">Negotiate Schedule Mentoring</v-col>

      <v-col md="12">
        <v-data-table
          :loading="negotiateLoad"
          :headers="negotiatescheduleHeaders"
          :items="negotiateschedulementorings.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">{{
            item.mentoring.name
          }}</template>
          <template v-slot:item.startTime="{ item }">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.startTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.startTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.endTime="{ item }">
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ item.endTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ item.endTime | moment("h:mm a") }}
            </v-row>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip x-small>{{ item.status }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <template v-if="!item.concluded">
              <v-row>
                <v-col>
                  <v-row>
                    <v-btn
                      small
                      color="primary"
                      @click="leftAct(item, 'accept')"
                    >
                      <v-icon small left>check</v-icon>Accept
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row>
                    <v-btn small color="primary" @click="offerAct(item)">
                      <v-icon small left>update</v-icon>Offer
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-btn
                      class="mt-2"
                      small
                      color="warning"
                      @click="leftAct(item, 'reject')"
                    >
                      <v-icon small left>block</v-icon>Reject
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <incidental-mentoring
      :mentorshipId="selectedCohort.id"
      :programId="selectedCohort.program.id"
      :show.sync="dialogIncidental"
    />

    <offer-mentoring
      :mentorshipId="selectedCohort.id"
      :dataSingle="dataOffer"
      :showOffer.sync="dialogOffer"
    />

    <v-dialog v-model="dialogAction" width="300" :persistent="true">
      <v-card :loading="actionLoad">
        <v-card-title>
          <p class="text-capitalize">{{ leftAction }}</p>
        </v-card-title>
        <v-card-text>{{ leftName }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="red" @click="executeAction(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogAction = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import IncidentalMentoring from "./dialog/DialogIncidental";
import OfferMentoring from "./dialog/DialogOffer";

export default {
  components: {
    IncidentalMentoring,
    OfferMentoring,
  },
  data() {
    return {
      dialogOffer: false,
      dataOffer: {
        id: "",
        mentoring: {
          id: "",
          name: "1",
        },
        participant: {
          id: "",
          team: {
            id: "",
            name: "",
          },
        },
        startTime: "",
        endTime: "",
      },
      dialogAction: false,
      actionLoad: false,
      dialogIncidental: false,
      schedulementorings: { total: 0, list: [] },
      scheduleHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Team", value: "participant.team.name", sortable: false },
        { text: "startTime", value: "startTime", sortable: false },
        { text: "endTime", value: "endTime", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      negotiateschedulementorings: { total: 0, list: [] },
      negotiatescheduleHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Team", value: "participant.team.name", sortable: false },
        { text: "startTime", value: "startTime", sortable: false },
        { text: "endTime", value: "endTime", sortable: false },
        { text: "status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      dataMentorships: { total: 0, list: [] },
      scheduleLoad: false,
      negotiateLoad: false,
      selectedCohort: {
        id: "",
        program: {
          id: "",
          name: "",
        },
      },
      leftId: "",
      leftName: "",
      leftAction: "",
    };
  },
  watch: {
    date: "setDateTime",
    time: "setDateTime",
    selectedCohort() {
      this.getScheduleMentorings();
      this.getNegotiateScheduleMentorings();
    },
  },
  mounted() {
    this.getMentorship();
  },
  methods: {
    setDateTime: function() {
      this.incidentalParams.startTime = this.date + " " + this.time;
    },
    getMentorship() {
      this.scheduleLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.dataMentorships = res.data.data;
          this.selectedCohort = res.data.data.list[0];
          this.getScheduleMentorings();
          this.getNegotiateScheduleMentorings();
        })
        .catch(() => {})
        .finally(() => {
          this.scheduleLoad = false;
        });
    },
    getScheduleMentorings() {
      this.scheduleLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.selectedCohort.id +
            "/schedules",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.schedulementorings = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.scheduleLoad = false;
        });
    },
    getNegotiateScheduleMentorings() {
      this.negotiateLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.selectedCohort.id +
            "/negotiate-schedules",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.negotiateschedulementorings = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.negotiateLoad = false;
        });
    },
    openIncidental() {
      this.dialogIncidental = true;
    },
    openDetail(id) {
      this.$router.push({
        path: "/personnel/mentor/" + this.selectedCohort.id + "/schedule/" + id,
      });
    },
    leftAct(item, action) {
      this.dialogAction = true;
      this.leftId = item.id;
      this.leftName = item.participant.team.name;
      this.leftAction = action;
    },
    executeAction(id) {
      this.actionLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/mentorships/" +
            this.selectedCohort.id +
            "/negotiate-schedules/" +
            id +
            "/" +
            this.leftAction,
          {},
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Schedule"
          );
          this.$emit("refresh");
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.actionLoad = false;
        });
    },
    offerAct(item) {
      this.dialogOffer = true;
      this.dataOffer = item;
    },
    refresh() {
      this.dialogOffer = false;
      this.dialogIncidental = false;
      this.dialogAction = false;
      this.getScheduleMentorings();
      this.getNegotiateScheduleMentorings();
    },
  },
};
</script>
<style scoped></style>
