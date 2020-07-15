<template>
  <v-container extend fluid>
    <v-row>
      <v-col cols="12" xl="8" lg="10" md="12" v-if="participantLoad">
        <v-skeleton-loader type="card" />
      </v-col>
      <template v-else>
      <v-card class="px-3" width="100%">
        <v-col cols="12" xl="8" lg="12" md="12">
          <v-row>
          <v-card class="ma-3 pa-3 mb-0 pb-0" width="100%" flat style="background: #000000;">
            <v-col cols="12" lg="6" md="8">
              <span style="color:#fff" class="title">
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
              <v-expansion-panels class="mt-3 mb-4">
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
          </v-card>
          </v-row>
          <!-- <v-row>
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
          </v-row> -->
        </v-col>
        <v-col cols="12" xl="12" lg="12">
          <v-row>
            <v-col class="mb-0 pb-0" cols="12" lg="6" md="8">
              <span class="title">
                Team's members
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col
               class="mt-0 pt-0"
              cols="12"
              lg="12"
              v-for="(member, index) in participant.team.members"
              :key="member.id"
            >
              <v-card-title style="font-size:14px;">
                {{ index + 1 }} -
                {{ member.founder.name }}
              </v-card-title>
              <v-expansion-panels class="px-9">
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
