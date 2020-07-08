<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-select
          :loading="cohortLoad"
          v-model="selectedCohort"
          label="Program"
          :items="dataMentorships.list"
          item-text="program.name"
          return-object
          outlined
        ></v-select>
      </v-col>
    </v-row>
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
              v-if="selectedCohort.id !== ''"
              class="ml-2"
              small
              color="primary"
              :to="{
                name: 'mentor-dashboard-participant-detail',
                params: {
                  programId: selectedCohort.program.id,
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
      selectedCohort: {
        id: "",
        program: {
          id: "",
          name: "",
        },
      },
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
  mounted() {
    this.getMentorship();
  },
  watch: {
    selectedCohort: "getParticipant",
    options: "getParticipant",
  },
  methods: {
    getMentorship() {
      this.cohortLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.dataMentorships = res.data.data;
          this.selectedCohort = res.data.data.list[0];
        })
        .catch(() => {})
        .finally(() => {
          this.cohortLoad = false;
        });
    },
    getParticipant() {
      this.participantLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.selectedCohort.program.id +
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
          this.selectedCohort.id +
          "/" +
          this.selectedCohort.program.id +
          "/participant/" +
          id +
          "/journal",
      });
    },
  },
};
</script>
