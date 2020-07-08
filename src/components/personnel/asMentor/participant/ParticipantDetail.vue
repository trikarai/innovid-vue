<template>
  <v-container extend fluid>
    <v-row>
      <v-col cols="12" xl="8" lg="10" md="12" v-if="participantLoad">
        <v-skeleton-loader type="card" />
      </v-col>
      <v-col cols="12" xl="8" lg="10" md="12" v-else>
        {{ participant.team.name }}
      </v-col>
      <v-col cols="12" xl="12" lg="12">
        <pre>
        {{ participant }}
          </pre
        >
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
      participantLoad: false,
      participant: {},
    };
  },
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
