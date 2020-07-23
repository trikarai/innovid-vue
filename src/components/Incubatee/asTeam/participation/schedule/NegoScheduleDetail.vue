<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="6" v-if="loading">
        <v-skeleton-loader type="card" />
      </v-col>
      <v-col cols="12" lg="6" v-else>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ schedule.mentoring.name }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">
                <b>Mentor Name</b>
                <br />
                {{ schedule.mentor.personnel.name }}
              </v-col>
              <v-col>
                <b>Start time</b>
                <br />
                <v-icon left color="primary">calendar_today</v-icon>
                {{ schedule.startTime | moment("MMMM Do YYYY") }}
                <br />
                <v-icon left color="primary">access_time</v-icon>
                {{ schedule.startTime | moment("h:mm a") }}
              </v-col>
              <v-col>
                <b>End time</b>
                <br />
                <v-icon left color="primary">calendar_today</v-icon>
                {{ schedule.endTime | moment("MMMM Do YYYY") }}
                <br />
                <v-icon left color="primary">access_time</v-icon>
                {{ schedule.endTime | moment("h:mm a") }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-chip color="info" small v-if="schedule.status == 'proposed'"
              >Waiting for mentor’s confirmation</v-chip
            >
            <v-chip color="warning" small v-if="schedule.status == 'offered'"
              >Mentor has proposed new schedule</v-chip
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";
export default {
  data() {
    return {
      schedule: {
        id: " ",
        mentoring: {
          id: " ",
          name: " ",
        },
        mentor: {
          id: " ",
          personnel: {
            id: " ",
            name: " ",
          },
        },
        startTime: " ",
        endTime: " ",
        concluded: false,
        status: "",
      },
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            this.$route.params.scheduleId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.schedule = res.data.data;
        })
        .catch()
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
