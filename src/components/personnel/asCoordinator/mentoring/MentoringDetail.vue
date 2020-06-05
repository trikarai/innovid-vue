<template>
  <v-container extend grid-list-xs>
    <v-row v-if="mentoringLoad">
      <v-col md="6">
        <v-skeleton-loader type="card, article"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col md="6">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{data.mentoring.name}}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">
                <b>Team Name</b>
                <br />
                {{data.participant.team.name}}
              </v-col>
              <v-col md="12">
                <b>Mentor</b>
                <br />
                {{data.mentor.personnel.name}}
              </v-col>
              <v-col md="6">
                <b>Start Time</b>
                <v-row>
                  <v-col>
                    <v-icon left color="primary">calendar_today</v-icon>
                    {{ data.startTime | moment("MMMM Do YYYY") }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-0 pt-0">
                    <v-icon left color="primary">access_time</v-icon>
                    {{ data.startTime | moment("h:mm a") }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6">
                <b>End Time</b>
                <v-row>
                  <v-col>
                    <v-icon left color="primary">calendar_today</v-icon>
                    {{ data.endTime | moment("MMMM Do YYYY") }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-0 pt-0">
                    <v-icon left color="primary">access_time</v-icon>
                    {{ data.endTime | moment("h:mm a") }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row v-if="data.mentorMentoringReport == null">
              <v-col>No Report from mentor yet</v-col>
            </v-row>
            <v-row v-else>
              <v-col md="12" class="title">Mentor Report</v-col>
              <v-col>
                <render-record :fields="refactorRecordJSON2(data.mentorMentoringReport)" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row v-if="data.participantMentoringReport == null">
              <v-col>No Report from participant yet</v-col>
            </v-row>
            <v-row v-else>
              <v-col md="12" class="title">Participant report</v-col>
              <v-col>
                <render-record :fields="refactorRecordJSON2(data.participantMentoringReport)" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      data: {},
      mentoringLoad: false
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RenderRecord
  },
  mounted() {
    this.getMentoringData();
  },
  methods: {
    getMentoringData() {
      this.mentoringLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/mentoring-schedules/" +
            this.$route.params.mentoringId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.data = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.mentoringLoad = false;
        });
    }
  }
};
</script>