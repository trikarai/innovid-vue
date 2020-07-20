<template>
  <v-container fluid grid-list-xs>
    <v-row>
      <v-col md="5">
        <v-btn
          color="primary"
          router
          small
          :to="
            '/incubatee/team/' +
              $route.params.teamId +
              '/participation/' +
              $route.params.cohortId +
              '/mentoring'
          "
        >
          <v-icon left>add</v-icon>Propose New Mentoring Schedule to Mentor
        </v-btn>
      </v-col>
      <v-col md="1">
        or
      </v-col>
      <v-col md="3">
        <v-btn small color="primary" @click="openIncidental()">
          <v-icon left>add</v-icon>Add Schedule that Mentor have Agreed
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-tabs v-model="tab" background-color="primary" dark grow>
        <v-tab key="1"
          ><v-badge
            :value="negotiateschedulementorings.total !== 0"
            color="error"
            :content="filterSchedule(negotiateschedulementorings.list).length"
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
              <!-- <v-col cols="12" xl="12" lg="12">
                <pre> {{ negotiateschedulementorings }} </pre>
              </v-col> -->
              <v-col cols="12" xl="12" lg="12">
                <v-data-table
                  :loading="negotiateLoad"
                  :headers="tableHeaders"
                  :items="filterSchedule(negotiateschedulementorings.list)"
                  :server-items-length="negotiateschedulementorings.total"
                  :options.sync="optionsNego"
                  :search="search"
                  :footer-props="{
                    'items-per-page-options': [5, 15, 25],
                  }"
                  class="elevation-1"
                >
                  <template v-slot:item.name="{ item }">
                    {{ item.mentoring.name }}
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <v-row class="ma-2">
                      <!-- <v-icon left color="primary">calendar_today</v-icon> -->
                      {{ item.startTime | moment("MMMM Do YYYY") }}
                    </v-row>
                    <v-row class="ma-2">
                      <!-- <v-icon left color="primary">access_time</v-icon> -->
                      {{ item.startTime | moment("h:mm a") }} -
                      {{ item.endTime | moment("h:mm a") }}
                    </v-row>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-chip color="info" small v-if="item.status == 'proposed'"
                      >Waiting for mentor’s confirmation</v-chip
                    >
                    <v-chip
                      color="warning"
                      small
                      v-if="item.status == 'offered'"
                      >Mentor has proposed new schedule</v-chip
                    >
                    <v-chip small v-else> {{ item.status }} </v-chip>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <template v-if="item.status != 'scheduled'">
                      <template v-if="item.status !== 'proposed'">
                        <template v-if="item.status !== 'cancelled'">
                          <v-btn
                            class="ml-2"
                            small
                            color="primary"
                            @click="leftAct(item, 'accept')"
                          >
                            <v-icon small left>check</v-icon>Accept
                          </v-btn>
                          <v-btn
                            class="ml-2"
                            small
                            color="primary"
                            @click="reproposeAct(item)"
                          >
                            <v-icon small left>update</v-icon>Re-schedule
                          </v-btn>
                        </template>
                      </template>
                      <v-btn
                        v-if="item.status !== 'cancelled'"
                        class="ml-2"
                        small
                        color="warning"
                        @click="leftAct(item, 'cancel')"
                      >
                        <v-icon small left>block</v-icon>Cancel
                      </v-btn>
                    </template>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item key="2">
            <v-data-table
              :loading="scheduleLoad"
              :headers="tableHeaders"
              :items="schedulementorings.list"
              :server-items-length="schedulementorings.total"
              :options.sync="optionsApproved"
              :footer-props="{
                'items-per-page-options': [5, 15, 25],
              }"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                <!-- <v-btn
                  class="elevation-0 mr-2"
                  fab
                  x-small
                  color="primary"
                  @click="openDetail(item.id)"
                >
                  <v-icon>zoom_in</v-icon>
                </v-btn> -->
                {{ item.mentoring.name }}
              </template>
              <template v-slot:item.startTime="{ item }">
                <v-row class="ma-2">
                  {{ item.startTime | moment("MMMM Do YYYY") }}
                </v-row>
                <v-row class="ma-2">
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
                    name: 'team-mentoring-conference',
                    params: {
                      teamId: $route.params.teamId,
                      cohortId: $route.params.cohortId,
                      scheduleId: item.id,
                    },
                  }"
                >
                  <v-icon>mdi-message-video</v-icon>
                </v-btn>
                <v-btn
                  v-if="item.participantMentoringReport == null"
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
          </v-tab-item>
          <v-tab-item key="3">
            <v-data-table
              :loading="schedulepastLoad"
              :headers="tableHeaders"
              :items="schedulementoringspast.list"
              :server-items-length="schedulementoringspast.total"
              :options.sync="optionsPast"
              :footer-props="{
                'items-per-page-options': [5, 15, 25],
              }"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                <!-- <v-btn
                  class="elevation-0 mr-2"
                  fab
                  x-small
                  color="primary"
                  @click="openDetail(item.id)"
                >
                  <v-icon>zoom_in</v-icon>
                </v-btn> -->
                {{ item.mentoring.name }}
              </template>
              <template v-slot:item.startTime="{ item }">
                <v-row class="ma-2">
                  {{ item.startTime | moment("MMMM Do YYYY") }}
                </v-row>
                <v-row class="ma-2">
                  {{ item.startTime | moment("h:mm a") }} -
                  {{ item.endTime | moment("h:mm a") }}
                </v-row>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn
                  class="elevation-0 mr-2"
                  small
                  color="primary"
                  @click="openDetail(item.id)"
                >
                  <v-icon>zoom_in</v-icon> View
                </v-btn>
                <v-btn
                  v-if="!item.containParticipantMentoringReport"
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
          </v-tab-item>
          <v-tab-item key="4">
            <v-data-table
              :loading="schedulefinishLoad"
              :headers="tableHeaders"
              :items="schedulementoringsfinish.list"
              :server-items-length="schedulementoringsfinish.total"
              :options.sync="optionsFinish"
              :footer-props="{
                'items-per-page-options': [5, 15, 25],
              }"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                {{ item.mentoring.name }}
              </template>
              <template v-slot:item.startTime="{ item }">
                <v-row class="ma-2">
                  {{ item.startTime | moment("MMMM Do YYYY") }}
                </v-row>
                <v-row class="ma-2">
                  {{ item.startTime | moment("h:mm a") }} -
                  {{ item.endTime | moment("h:mm a") }}
                </v-row>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn
                  class="elevation-0 mr-2"
                  small
                  color="primary"
                  @click="openDetail(item.id)"
                >
                  <v-icon>zoom_in</v-icon> View
                </v-btn>
                <v-btn
                  v-if="!item.containParticipantMentoringReport"
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
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
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
          <v-progress-linear
            :indeterminate="true"
            color="primary"
          ></v-progress-linear>
        </v-card-text>
        <v-card-text>{{ dataSingle }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{ leftAction }}</p>
        </v-card-title>
        <v-card-text>{{ leftName }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            v-if="leftAction == 'cancel'"
            text
            color="red"
            @click="deleteAccount(leftId)"
            >Yes</v-btn
          >
          <v-btn
            v-if="leftAction == 'accept'"
            text
            color="red"
            @click="acceptAccount(leftId)"
            >Yes</v-btn
          >
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogForm"
      scrollable
      persistent
      :overlay="true"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">Reschedule Mentoring</p>
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="dialogForm = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear
            :indeterminate="true"
            color="primary"
          ></v-progress-linear>
        </v-card-text>
        <v-card-text>
          <p>
            <b>Mentoring Name</b>
            <br />
            {{ dataSingle.mentoring.name }}
          </p>
          <p>
            <b>Mentor Name</b>
            <br />
            {{ dataSingle.mentor.personnel.name }}
          </p>
          <b>Offered Schedule</b>

          <v-row>
            <v-col>
              <b>Start time</b>
              <br />
              <v-icon left color="primary">calendar_today</v-icon>
              {{ dataSingle.startTime | moment("MMMM Do YYYY") }}
              <br />
              <v-icon left color="primary">access_time</v-icon>
              {{ dataSingle.startTime | moment("h:mm a") }}
            </v-col>
            <v-col>
              <b>End time</b>
              <br />
              <v-icon left color="primary">calendar_today</v-icon>
              {{ dataSingle.endTime | moment("MMMM Do YYYY") }}
              <br />
              <v-icon left color="primary">access_time</v-icon>
              {{ dataSingle.endTime | moment("h:mm a") }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
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
                    :min="nowDate"
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
                    color="primary"
                    :locale="$vuetify.lang.current"
                    v-model="time"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
          <!-- {{startTime}} -->
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn
            block
            color="primary"
            :disabled="!valid"
            @click="proposeAction()"
            :loading="tableLoad"
          >
            <v-icon left>update</v-icon>RePropose
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
                  :rules="rulesRequired"
                  :items="mentorings.list"
                  v-model="incidentalParams.mentoringId"
                  label="Mentoring Event"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col md="12">
                <v-autocomplete
                  :loading="mentorLoad"
                  :rules="rulesRequired"
                  :hide-no-data="true"
                  :items="mentors.list"
                  v-model="incidentalParams.mentorId"
                  item-text="personnel.name"
                  item-value="id"
                  label="Mentor"
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
          <v-btn
            block
            :disabled="!valid"
            color="primary"
            @click="submitIncidentalMentoring"
            >Report</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";
import { participationWatcherMixins } from "@/mixins/participationWatcherMixins";

export default {
  mixins: [validationMixins, participationWatcherMixins],
  data() {
    return {
      tab: "2",
      menu: false,
      menu2: false,
      authData: "",
      search: "",
      valid: false,
      negotiateschedulementorings: { total: 0, list: [] },
      schedulementorings: { total: 0, list: [] },
      schedulementoringspast: { total: 0, list: [] },
      schedulementoringsfinish: { total: 0, list: [] },
      dataSingle: {
        mentoring: { name: "" },
        mentor: {
          personnel: {
            name: "",
          },
        },
        startTime: "",
        endTime: "",
      },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Date/Time", value: "startTime", sortable: false },
        { text: "Mentoring", value: "name", sortable: false },
        { text: "Mentor", value: "mentor.personnel.name", sortable: false },
        {
          text: "",
          value: "status",
          sortable: false,
          filter: (value) => {
            return value !== "offered";
          },
        },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      dialogIncidental: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: {
        startTime: "",
      },
      incidentalParams: {
        mentoringId: "",
        mentorId: "",
        startTime: "",
      },
      mentoringLoad: false,
      mentorings: { total: 0, list: [] },
      mentorLoad: false,
      mentors: { total: 0, list: [] },
      date: "",
      time: "",
      nowDate: new Date().toISOString().slice(0, 10),
      optionsApproved: { page: 1, itemsPerPage: 15 },
      optionsPast: { page: 1, itemsPerPage: 15 },
      optionsFinish: { page: 1, itemsPerPage: 15 },
      optionsNego: { page: 1, itemsPerPage: 15 },
      scheduleLoad: false,
      schedulepastLoad: false,
      schedulefinishLoad: false,
      negotiateLoad: false,
    };
  },
  watch: {
    date: "setDateTime",
    time: "setDateTime",
    $route() {
      this.getScheduleMentorings();
      this.getNegotiateScheduleMentorings();
      this.getScheduleMentoringsPast();
      this.getScheduleMentoringsFinish();
    },
    participationId() {
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.participationId +
          "/schedule",
      });
    },
    optionsApproved: "getScheduleMentorings",
    optionsNego: "getNegotiateScheduleMentorings",
    optionsPast: "getScheduleMentoringsPast",
    optionsFinish: "getScheduleMentoringsFinish",
  },
  created() {
    var today = new Date().toLocaleString();
    this.today = this.$moment(today).format("YYYY/MM/DD");
  },
  mounted: function() {
    this.getScheduleMentorings();
    this.getNegotiateScheduleMentorings();
    this.getScheduleMentoringsPast();
    this.getScheduleMentoringsFinish();
  },
  methods: {
    filterSchedule(params) {
      return this._.filter(params, (item) => {
        return item.status == "offered" || item.status == "proposed";
      });
    },
    setDateTime: function() {
      this.params.startTime = this.date + " " + this.time;
      this.incidentalParams.startTime = this.date + " " + this.time;
    },
    getScheduleMentorings() {
      this.scheduleLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules",
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
          if (res.data.data) {
            this.schedulementorings = res.data.data;
          } else {
            this.schedulementorings = { total: 0, list: [] };
          }
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
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules",
          {
            params: {
              maxStartTime: this.today,
              containParticipantReport: false,
              page: this.optionsApproved.page,
              pageSize: this.optionsApproved.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.schedulementoringspast = res.data.data;
          } else {
            this.schedulementoringspast = { total: 0, list: [] };
          }
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
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules",
          {
            params: {
              maxStartTime: this.today,
              containParticipantReport: true,
              page: this.optionsApproved.page,
              pageSize: this.optionsApproved.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.schedulementoringsfinish = res.data.data;
          } else {
            this.schedulementoringsfinish = { total: 0, list: [] };
          }
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
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.negotiateschedulementorings = res.data.data;
          } else {
            this.negotiateschedulementorings = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.negotiateLoad = false;
        });
    },
    openDetail(id) {
      // this.dialogDetail = true;
      // this.getDataSingle(id);
      this.$router.push({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/schedule/" +
          id,
      });
    },
    openNegoDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataSingle = res.data.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.mentoring.name;
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
            "/negotiate-mentoring-schedules/" +
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
    acceptAccount(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
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
    reproposeAct(item) {
      this.dataSingle = item;
      this.dialogForm = true;
    },
    proposeAction() {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            this.dataSingle.id +
            "/re-propose",
          this.params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Repropose Schedule");
          this.refresh();
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openIncidental() {
      this.dialogIncidental = true;
      this.getMentoringList();
      this.getMentorList();
    },
    getMentoringList() {
      this.mentoringLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentorings",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.mentorings = res.data.data;
          } else {
            this.mentorings = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.mentoringLoad = false;
        });
    },
    getMentorList() {
      this.mentorLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentors",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.mentors = res.data.data;
          } else {
            this.mentors = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.mentorLoad = false;
        });
    },
    submitIncidentalMentoring() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules",
          this.incidentalParams,

          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.refresh();
        })
        .catch((res) => {
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
      this.getScheduleMentorings();
      this.getNegotiateScheduleMentorings();
    },
    // eslint-disable-next-line no-unused-vars
    // filterConcluded(value, search, item) {
    // },
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
