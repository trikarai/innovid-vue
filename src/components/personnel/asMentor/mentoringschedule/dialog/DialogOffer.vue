<template>
  <v-dialog
    scrollable
    persistent
    :overlay="true"
    max-width="550px"
    transition="dialog-transition"
    v-model="showOffer"
  >
    <v-card :loading="offerLoad">
      <v-card-title>
        <p class="text-capitalize">Offer New Schedule</p>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" :disabled="offerLoad" @click="$emit('update:showOffer', false)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>
          <b>Name</b>
          <br />
          {{dataSingle.mentoring.name}}
        </p>
        <p>
          <b>Team Name</b>
          <br />
          {{dataSingle.participant.team.name}}
        </p>
        <v-row>
          <v-col>
            <b>Start Time</b>
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ dataSingle.startTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ dataSingle.startTime | moment("h:mm a") }}
            </v-row>
          </v-col>
          <v-col>
            <b>End Time</b>
            <v-row class="my-3">
              <v-icon left color="primary">calendar_today</v-icon>
              {{ dataSingle.endTime | moment("MMMM Do YYYY") }}
            </v-row>
            <v-row class="my-3">
              <v-icon left color="primary">access_time</v-icon>
              {{ dataSingle.endTime | moment("h:mm a") }}
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="mt-0 pt-0">
        <v-form class="mt-0 pt-0" ref="form" v-model="valid">
          <v-row class="mt-0 pt-0">
            <v-col class="mt-0 pt-0">
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
                    label="New Date Offer"
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
                  min="1950-01-01"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="mt-0 pt-0">
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
                    label="New Time Offer"
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="offerAction()">
          <v-icon left>update</v-icon>Offer
        </v-btn>
        <v-btn
          :disabled="offerLoad"
          text
          color="grey"
          @click="$emit('update:showOffer', false)"
        >close</v-btn>
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
    dataSingle: {
      type: Object,
      required: true
    },
    mentorshipId: {
      type: String,
      required: true
    },
    showOffer: {
      default: false
    }
  },
  data() {
    return {
      offerLoad: false,
      menu: false,
      menu2: false,
      valid: false,
      params: {
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
      this.params.startTime = this.date + " " + this.time;
    },
    offerAction() {
      this.offerLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/mentorships/" +
            this.mentorshipId +
            "/negotiate-schedules/" +
            this.dataSingle.id +
            "/offer",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Offer Schedule");
          this.$emit("refresh");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.offerLoad = false;
        });
    }
  }
};
</script>
