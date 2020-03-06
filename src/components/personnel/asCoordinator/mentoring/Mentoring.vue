<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="3">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          persistent
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" scrollable @change="menu1 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col md="3">
        <v-menu
          :disabled="startDate == ''"
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :disabled="startDate == ''"
              v-model="endDate"
              label="End Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker :min="startDate" v-model="endDate" @change="menu2 = false" scrollable></v-date-picker>
        </v-menu>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          v-model="mentoringEventId"
          :items="mentoringEvents.list"
          :loading="mentoringEventLoad"
          label="Mentoring Event"
          item-text="name"
          item-value="id"
          cache-items
          outlined
          no-data-text="No data available, please try to reload"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="getMentoringEventData()">
              <v-icon :class="{rotating : mentoringEventLoad}">sync</v-icon>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-autocomplete
          v-model="mentorId"
          :items="mentors.list"
          :loading="mentorLoad"
          item-text="personnel.name"
          item-value="id"
          label="Mentor"
          cache-items
          outlined
          no-data-text="No data available, please try to reload"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="getMentorData()">
              <v-icon :class="{rotating : mentorLoad}">sync</v-icon>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          v-model="participantId"
          :items="participants.list"
          :loading="participantLoad"
          label="Participant"
          item-text="team.name"
          item-value="id"
          cache-items
          no-data-text="No data available, please try to reload"
          outlined
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="getParticipantData()">
              <v-icon :class="{rotating : participantLoad}">sync</v-icon>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="mentorings.list"
          class="elevation-1"
          select-all
          :loading="mentoringLoad"
        >
          <template v-slot:item.time="{item}">
            {{item.startTime | moment("dddd, D MMM YYYY") }} -
            {{item.endTime | moment("dddd, D MMM YYYY") }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      startDate: "",
      endDate: "",
      filterUri: "",
      participantLoad: false,
      participants: { total: 0, list: [] },
      participantId: "",
      mentors: { total: 0, list: [] },
      mentorId: "",
      mentorLoad: false,
      mentoringEventId: "",
      mentoringEvents: { total: 0, list: [] },
      mentoringEventLoad: false,
      mentoringLoad: false,
      mentorings: { total: 0, list: [] },
      headers: [
        { text: "Mentoring", value: "mentoring.name", sortable: false },
        { text: "Startup", value: "participant.team.name", sortable: false },
        { text: "Mentor", value: "mentor.personnel.name", sortable: false },
        { text: "Time", value: "time", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  watch: {
    startDate: "filterByDate",
    endDate: "filterByDate",
    mentorId: "filterByMentor",
    participantId: "filterByParticipant",
    mentoringEventId: "filterByEvent"
  },
  mounted() {
    this.getMentoringList();
  },
  methods: {
    filterByDate() {
      this.filterUri = "?startTime=" + this.startDate;
      if (this.endDate !== "") {
        this.filterUri += "&endTime=" + this.endDate;
      }
      if (this.mentorId !== "") {
        this.filterUri += "&mentorIds[]=" + this.mentorId;
      }
      if (this.participantId !== "") {
        this.filterUri += "&participantIds[]=" + this.participantId;
      }
      if (this.mentoringEventId !== "") {
        this.filterUri += "&mentoringIds[]=" + this.mentoringEventId;
      }
      this.getMentoringList();
    },
    filterByMentor() {
      this.filterUri = "?mentorIds[]=" + this.mentorId;
      if (this.startDate !== "") {
        this.filterUri += "&startTime=" + this.startDate;
      }
      if (this.endDate !== "") {
        this.filterUri += "&endTime=" + this.endDate;
      }
      if (this.participantId !== "") {
        this.filterUri += "&participantIds[]=" + this.participantId;
      }
      if (this.mentoringEventId !== "") {
        this.filterUri += "&mentoringIds[]=" + this.mentoringEventId;
      }
      this.getMentoringList();
    },
    filterByParticipant() {
      this.filterUri = "?participantIds[]=" + this.participantId;
      if (this.startDate !== "") {
        this.filterUri += "&startTime=" + this.startDate;
      }
      if (this.endDate !== "") {
        this.filterUri += "&endTime=" + this.endDate;
      }
      if (this.mentorId !== "") {
        this.filterUri += "&mentorIds[]=" + this.mentorId;
      }
      if (this.mentoringEventId !== "") {
        this.filterUri += "&mentoringIds[]=" + this.mentoringEventId;
      }
      this.getMentoringList();
    },
    filterByEvent() {
      this.filterUri = "?mentoringIds[]=" + this.mentoringEventId;
      if (this.startDate !== "") {
        this.filterUri += "&startTime=" + this.startDate;
      }
      if (this.endDate !== "") {
        this.filterUri += "&endTime=" + this.endDate;
      }
      if (this.mentorId !== "") {
        this.filterUri += "&mentorIds[]=" + this.mentorId;
      }
      if (this.participantId !== "") {
        this.filterUri += "&participantIds[]=" + this.participantId;
      }
      this.getMentoringList();
    },
    getMentoringList() {
      this.mentoringLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/mentoring-schedules" +
            this.filterUri,
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
    getMentorData() {
      this.mentorLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/mentors",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.mentors = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.mentorLoad = false;
        });
    },
    getParticipantData() {
      this.participantLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
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
    getMentoringEventData() {
      this.mentoringEventLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/mentorings",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.mentoringEvents = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.mentoringEventLoad = false;
        });
    }
  }
};
</script>
<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}
</style>