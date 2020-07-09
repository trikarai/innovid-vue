<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" xl="8" lg="10" md="12">
        <v-data-table
          :loading="participantLoad"
          :headers="tableHeaders"
          :items="participantList.list"
          :options.sync="options"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              v-if="$store.state.mentorship.id !== ''"
              class="ml-2"
              small
              color="primary"
              :to="{
                name: 'mentor-dashboard-participant-detail',
                params: {
                  programId: $store.getters.getMentorship.program.id,
                  participantId: item.id,
                },
              }"
            >
              <v-icon small left>zoom_in</v-icon> Team Profile
            </v-btn>
            <v-btn
              class="ml-2"
              small
              color="primary"
              @click="gotoJournal(item.id)"
            >
              <v-icon small left>assignment</v-icon>Journal
            </v-btn>
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
      cohortLoad: false,
      dataMentorships: { total: 0, list: [] },
      participantLoad: false,
      participantList: { total: 0, list: [] },
      tableHeaders: [
        { text: "Team", value: "team.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      options: {
        page: 1,
        itemsPerPage: 15,
      },
    };
  },
  mounted() {},
  watch: {
    "$store.state.mentorship": "getParticipant",
    options: "getParticipant",
  },
  methods: {
    getParticipant() {
      this.participantLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$store.getters.getMentorship.program.id +
            "/participants",
          {
            params: {
              page: this.options.page,
              pageSize: this.options.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.participantList = res.data.data;
          } else {
            this.participantList = { total: 0, list: [] };
          }
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.participantLoad = false;
        });
    },
    gotoJournal(id) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$store.getters.getMentorship.id +
          "/" +
          this.$store.getters.getMentorship.program.id +
          "/participant/" +
          id +
          "/journal",
      });
    },
  },
};
</script>
