<template>
  <v-container extend fluid>
    <v-row>
      <v-col cols="12" xl="8" lg="10" md="12" v-if="participantLoad">
        <v-skeleton-loader type="card" />
      </v-col>
      <template v-else>
      <v-card width="800">
        <v-col cols="12" xl="8" lg="12" md="12">
          <v-row>
          <v-card class="ma-3 pa-3" width="100%" flat dark>
            <v-col cols="12" lg="6" md="8">
              <span class="title">
                {{ participant.team.name }}
              </span>
            </v-col>
            <v-col>
              <v-btn
                small
                color="primary"
                :to="{
                  name: 'mentor-program-participant-journal',
                  params: {
                    mentorId: $route.params.mentorId,
                    programId: $route.params.programId,
                    participantId: $route.params.participantId,
                  },
                }"
              >
                <v-icon left small>zoom_in</v-icon> View team's journal
              </v-btn>
            </v-col>
          </v-card>
          </v-row>
          <v-row>
            <v-col>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="profile in participant.team.profiles"
                  :key="profile.id"
                >
                  <v-expansion-panel-header>{{
                    profile.form.name
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <profile-record :profile="profile" />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xl="12" lg="12">
          <v-row>
            <v-col cols="12" lg="6" md="8">
              <span class="subtitle">
                Team's members
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              lg="12"
              v-for="(member, index) in participant.team.members"
              :key="member.id"
            >
              <v-card-title>
                {{ index + 1 }} -
                {{ member.founder.name }}
              </v-card-title>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="profile in member.founder.profiles"
                  :key="profile.id"
                >
                  <v-expansion-panel-header>
                    {{ profile.form.name }}</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <profile-record :profile="profile" />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import ProfileRecord from "./ProfileRecord";

export default {
  data() {
    return {
      participantLoad: false,
      participant: {},
      fields: [],
    };
  },
  components: { ProfileRecord },
  mounted() {
    this.getParticipant();
  },
  methods: {
    getParticipant() {
      this.participantLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.participantId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.participant = res.data.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.participantLoad = false;
        });
    },
  },
};
</script>
