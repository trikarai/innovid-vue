<template>
  <v-container flud>
    <v-row>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
        <v-data-table
          :loading="loadJournal"
          :headers="tableHeaders"
          :items="journals.list"
          :options.sync="options"
          hide-default-footer
        >
          <template v-slot:item.teamname="{ item }">
            <v-btn
              depressed
              color="primary"
              :to="{
                name: 'mentor-dashboard-participant-detail',
                params: {
                  mentorId: $store.getters.getMentorship.id,
                  programId: $store.getters.getMentorship.program.id,
                  participantId: item.participant.id,
                },
              }"
            >
              {{ item.participant.team.name }}
            </v-btn>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              :key="item.id"
              small
              color="primary"
              @click="gotoJournalDetail(item)"
            >
              <v-icon left small>zoom_in</v-icon>View
            </v-btn>
          </template>
        </v-data-table>
        <!-- <pre>{{ journals }}</pre> -->
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
      loadJournal: false,
      journals: { total: 0, list: [] },
      tableHeaders: [
        { text: "Team", value: "teamname", sortable: false },
        {
          text: "Form",
          value: "worksheet.worksheetForm.name",
          sortable: false,
        },
        { text: "Worksheet", value: "worksheet.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      options: {
        page: 1,
        itemsPerPage: 100,
      },
    };
  },
  watch: {
    "$store.state.mentorship": "getJournals",
    options: "getJournals",
  },
  mounted() {
    this.getJournals();
  },
  methods: {
    getJournals() {
      this.loadJournal = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$store.getters.getMentorship.program.id +
            "/journals",
          {
            // params: {
            //   page: this.options.page,
            //   pageSize: this.options.itemsPerPage,
            // },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journals = res.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadJournal = false;
        });
    },
    gotoJournalDetail(item) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$store.getters.getMentorship.id +
          "/" +
          this.$store.getters.getMentorship.program.id +
          "/participant/" +
          item.participant.id +
          "/journal/" +
          item.id,
      });
    },
  },
};
</script>

<style></style>
