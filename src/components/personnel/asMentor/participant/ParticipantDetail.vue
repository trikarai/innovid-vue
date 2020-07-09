<template>
  <v-container extend fluid>
    <v-row>
      <v-col cols="12" xl="8" lg="10" md="12" v-if="participantLoad">
        <v-skeleton-loader type="card" />
      </v-col>
      <template v-else>
        <v-col cols="12" xl="8" lg="12" md="12">
          <v-card-title>
            {{ participant.team.name }}
          </v-card-title>
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
          <v-card-text class="title">
            Team's members
          </v-card-text>
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
