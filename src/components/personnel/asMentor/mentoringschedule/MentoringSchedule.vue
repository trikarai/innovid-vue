<template>
  <v-container extend grid-list-xs>
    <v-row>
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
      <v-tabs v-model="tab" background-color="primary" dark grow>
        <v-tab key="1"
          ><v-badge
            :value="negotiateschedulementorings.total !== 0"
            color="error"
            :content="negotiateschedulementorings.total"
            >Session Request
          </v-badge></v-tab
        >
        <v-tab key="2"
          ><v-badge
            :value="schedulementorings.total !== 0"
            color="error"
            :content="schedulementorings.total"
            >Approved Session
          </v-badge>
        </v-tab>
        <v-tab key="3"
          ><v-badge
            :value="schedulementoringspast.total !== 0"
            color="error"
            :content="schedulementoringspast.total"
            >Past Session
          </v-badge>
        </v-tab>
        <v-tab key="4">
          <v-badge
            :value="schedulementoringsfinish.total !== 0"
            color="error"
            :content="schedulementoringsfinish.total"
            >Finish Session
          </v-badge></v-tab
        >
        <v-tabs-items v-model="tab">
          <v-tab-item key="1">
            <v-row>
              <v-col>
                <v-data-table
                  :loading="negotiateLoad"
                  :headers="negotiatescheduleHeaders"
                  :items="negotiateschedulementorings.list"
                  :options.sync="optionsNego"
                  class="elevation-1 ml-2 mr-2"
                >
                  <template v-slot:item.name="{ item }">{{
                    item.mentoring.name
                  }}</template>
                  <template v-slot:item.teamname="{ item }">
                    <v-btn
                      text
                      :to="{
                        name: 'mentor-dashboard-participant-detail',
                        params: {
                          programId: $store.getters.getMentorship.program.id,
                          participantId: item.participant.id,
                        },
                      }"
                    >
                      {{ item.participant.team.name }}
                    </v-btn>
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">calendar_today</v-icon> -->
                      {{ item.startTime | moment("dddd, Do MMM YYYY") }}
                    </v-row>
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">access_time</v-icon> -->
                      {{ item.startTime | moment("h:mm a") }} -
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
                            <template v-if="item.status !== 'offered'">
                              <v-btn
                                small
                                color="primary"
                                @click="leftAct(item, 'accept')"
                              >
                                <v-icon small left>check</v-icon>Accept
                              </v-btn>
                            </template>
                          </v-row>
                        </v-col>
                        <v-col>
                          <v-row>
                            <v-btn
                              small
                              color="primary"
                              @click="offerAct(item)"
                            >
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
          </v-tab-item>
          <v-tab-item key="2">
            <v-row>
              <v-col
                ><v-data-table
                  :loading="scheduleLoad"
                  :headers="scheduleHeaders"
                  :items="schedulementorings.list"
                  :options.sync="optionsApproved"
                  class="elevation-1 ml-2 mr-2"
                >
                  <template v-slot:item.name="{ item }">
                    {{ item.mentoring.name }}
                  </template>
                  <template v-slot:item.teamname="{ item }">
                    <v-btn
                      text
                      :to="{
                        name: 'mentor-dashboard-participant-detail',
                        params: {
                          programId: $store.getters.getMentorship.program.id,
                          participantId: item.participant.id,
                        },
                      }"
                    >
                      {{ item.participant.team.name }}
                    </v-btn>
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">calendar_today</v-icon> -->
                      {{ item.startTime | moment("dddd, Do MMM YYYY") }}
                    </v-row>
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">access_time</v-icon> -->
                      {{ item.startTime | moment("h:mm a") }} -
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
                    <v-btn
                      class="ml-2"
                      color="primary"
                      small
                      @click="openDetail(item.id)"
                    >
                      <v-icon small left>zoom_in</v-icon> View
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item key="3">
            <v-row>
              <v-col
                ><v-data-table
                  :loading="schedulepastLoad"
                  :headers="scheduleHeaders"
                  :items="schedulementoringspast.list"
                  :options.sync="optionsPast"
                  class="elevation-1 ml-2 mr-2"
                >
                  <template v-slot:item.name="{ item }">
                    {{ item.mentoring.name }}
                  </template>
                  <template v-slot:item.teamname="{ item }">
                    <v-btn
                      text
                      :to="{
                        name: 'mentor-dashboard-participant-detail',
                        params: {
                          programId: $store.getters.getMentorship.program.id,
                          participantId: item.participant.id,
                        },
                      }"
                    >
                      {{ item.participant.team.name }}
                    </v-btn>
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">calendar_today</v-icon> -->
                      {{ item.startTime | moment("dddd, Do MMM YYYY") }}
                    </v-row>
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">access_time</v-icon> -->
                      {{ item.startTime | moment("h:mm a") }} -
                      {{ item.endTime | moment("h:mm a") }}
                    </v-row>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <!-- <v-btn
                      disabled
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
                    </v-btn> -->
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
                    <v-btn
                      class="ml-2"
                      color="primary"
                      small
                      @click="openDetail(item.id)"
                    >
                      <v-icon small left>zoom_in</v-icon> View
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item key="4">
            <v-row>
              <v-col
                ><v-data-table
                  :loading="schedulefinishLoad"
                  :headers="scheduleHeaders"
                  :items="schedulementoringsfinish.list"
                  :options.sync="optionsFinish"
                  class="elevation-1 ml-2 mr-2"
                >
                  <template v-slot:item.name="{ item }">
                    {{ item.mentoring.name }}
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">calendar_today</v-icon> -->
                      {{ item.startTime | moment("MMMM Do YYYY") }}
                    </v-row>
                    <v-row class="my-3">
                      <!-- <v-icon left color="primary">access_time</v-icon> -->
                      {{ item.startTime | moment("h:mm a") }} -
                      {{ item.endTime | moment("h:mm a") }}
                    </v-row>
                  </template>
                  <template v-slot:item.teamname="{ item }">
                    <v-btn
                      text
                      :to="{
                        name: 'mentor-dashboard-participant-detail',
                        params: {
                          programId: $store.getters.getMentorship.program.id,
                          participantId: item.participant.id,
                        },
                      }"
                    >
                      {{ item.participant.team.name }}
                    </v-btn>
                  </template>
                  <template v-slot:item.action="{ item }">
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
                    <v-btn
                      class="ml-2"
                      color="primary"
                      small
                      @click="openDetail(item.id)"
                    >
                      <v-icon small left>zoom_in</v-icon> View
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-row>

    <incidental-mentoring
      :mentorshipId="$store.getters.getMentorship.id"
      :programId="$store.getters.getMentorship.program.id"
      :show.sync="dialogIncidental"
      @refresh="refresh"
    />

    <offer-mentoring
      :mentorshipId="$store.getters.getMentorship.id"
      :dataSingle="dataOffer"
      :showOffer.sync="dialogOffer"
      @refresh="refresh"
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
      tab: "2",
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
      schedulementoringspast: { total: 0, list: [] },
      schedulementoringsfinish: { total: 0, list: [] },
      scheduleHeaders: [
        { text: "Time", value: "startTime", sortable: false },
        { text: "Mentoring", value: "name", sortable: false },
        { text: "Team", value: "teamname", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      negotiateschedulementorings: { total: 0, list: [] },
      negotiatescheduleHeaders: [
        { text: "Time", value: "startTime", sortable: false },
        { text: "Mentoring", value: "name", sortable: false },
        { text: "Team", value: "teamname", sortable: false },
        { text: "status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      optionsApproved: { page: 1, itemsPerPage: 15 },
      optionsPast: { page: 1, itemsPerPage: 15 },
      optionsFinish: { page: 1, itemsPerPage: 15 },
      optionsNego: { page: 1, itemsPerPage: 15 },
      dataMentorships: { total: 0, list: [] },
      scheduleLoad: false,
      schedulepastLoad: false,
      schedulefinishLoad: false,
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
      today: "",
    };
  },
  created() {
    var today = new Date().toLocaleString();
    this.today = this.$moment(today).format("YYYY/MM/DD");
  },
  watch: {
    date: "setDateTime",
    time: "setDateTime",
    "$store.state.mentorship"() {
      this.getScheduleMentorings();
      this.getScheduleMentoringsPast();
      this.getScheduleMentoringsFinish();
      this.getNegotiateScheduleMentorings();
    },
    optionsApproved: "getScheduleMentorings",
    optionsPast: "getScheduleMentoringsPast",
    optionsFinish: "getScheduleMentoringsFinish",
    optionsNego: "getNegotiateScheduleMentorings",
  },
  mounted() {
    this.getScheduleMentorings();
    this.getScheduleMentoringsPast();
    this.getScheduleMentoringsFinish();
    this.getNegotiateScheduleMentorings();
  },
  methods: {
    setDateTime: function() {
      this.incidentalParams.startTime = this.date + " " + this.time;
    },
    getScheduleMentorings() {
      this.scheduleLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$store.getters.getMentorship.id +
            "/schedules",
          {
            params: {
              minStartTime: this.today,
              page: this.optionsApproved.page,
              pageSize: this.optionsApproved.itemsPerPage,
            },
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
    getScheduleMentoringsPast() {
      this.schedulepastLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$store.getters.getMentorship.id +
            "/schedules",
          {
            params: {
              maxStartTime: this.today,
              containMentorReport: false,
              page: this.optionsPast.page,
              pageSize: this.optionsPast.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.schedulementoringspast = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.schedulepastLoad = false;
        });
    },
    getScheduleMentoringsFinish() {
      this.schedulefinishLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$store.getters.getMentorship.id +
            "/schedules",
          {
            params: {
              maxStartTime: this.today,
              containMentorReport: true,
              page: this.optionsFinish.page,
              pageSize: this.optionsFinish.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.schedulementoringsfinish = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.schedulefinishLoad = false;
        });
    },
    getNegotiateScheduleMentorings() {
      this.negotiateLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$store.getters.getMentorship.id +
            "/negotiate-schedules",
          {
            params: {
              page: this.optionsNego.page,
              pageSize: this.optionsNego.itemsPerPage,
            },
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
        path:
          "/personnel/mentor/" +
          this.$store.getters.getMentorship.id +
          "/schedule/" +
          id,
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
            this.$store.getters.getMentorship.id +
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
<style scoped>
.v-tab.v-tab--active {
    background: #b4b4b4;
}
.theme--light.v-tabs-items {
    border-top-style: solid;
    border-top-color: #b4b4b4;
    border-top-width: thick;
}
</style>
