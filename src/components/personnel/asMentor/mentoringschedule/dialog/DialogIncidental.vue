<template>
  <v-dialog
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
    v-model="show"
  >
    <v-card>
      <v-card-title>
        <p class="text-capitalize">Report Incidental Mentoring</p>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" @click="$emit('update:show', false)">
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
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  props: {
    programId: {
      type: String,
      required: true
    },
    mentorshipId: {
      type: String,
      required: true
    },
    show: {
      default: false
    }
  },
  data() {
    return {
      menu: false,
      menu2: false,
      valid: false,
      mentoringLoad: false,
      mentorings: { total: 0, list: [] },
      participantLoad: false,
      participants: { total: 0, list: [] },
      incidentalParams: {
        mentoringId: "",
        participantId: "",
        startTime: ""
      },
      date: "",
      time: ""
    };
  },
  mounted() {},
  watch: {
    date: "setDateTime",
    time: "setDateTime",
    show() {
      if (this.show) {
        this.getMentoringList();
        this.getParticipantList();
      }
    }
  },
  methods: {
    setDateTime: function() {
      this.incidentalParams.startTime = this.date + " " + this.time;
    },
    getMentoringList() {
      this.mentoringLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.programId +
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
            this.programId +
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
            this.mentorshipId +
            "/schedules",
          this.incidentalParams,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Mentoring Submitted");
          this.$emit("refresh");
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
