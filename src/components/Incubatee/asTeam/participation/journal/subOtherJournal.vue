<template>
  <v-card class="mt-5" flat v-if="otherLoad">
    <v-card-text>
      <v-skeleton-loader max-width="500" type="list-item-avatar@5"></v-skeleton-loader>
    </v-card-text>
  </v-card>
  <v-row v-else>
    <v-col class="mt-5" md="12" lg="12" xs="12">
      <v-btn small color="primary" @click="getOtherJournal">
        <v-icon left small>autorenew</v-icon>reload data
      </v-btn>
    </v-col>
    <v-col md="6" lg="6" xs="12">
      <v-data-table
        :loading="otherLoad"
        :headers="tableHeaders"
        :items="otherJournals.list"
        class="elevation-1"
      >
        <template v-slot:item.worksheet="{item}">{{item.worksheet.name}}</template>
        <template v-slot:item.action="{item}">
          <v-btn
            class="elevation-0 mr-2"
            color="primary"
            small
            @click="openDetail(item.mission.id, item.id, item.worksheet.id, item.parent)"
          >
            <v-icon>zoom_in</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  props: ["branchUri"],
  data() {
    return {
      otherLoad: false,
      otherJournals: {},
      tableHeaders: [
        { text: "Mission", value: "mission.name", sortable: false },
        { text: "Worksheet", value: "worksheet", sortable: false },
        { text: "", value: "sub", sortable: false, align: "left" },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted() {
    this.getOtherJournal();
  },
  methods: {
    getOtherJournal() {
      this.otherLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals?missionId=" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.otherJournals = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.otherLoad = false;
        });
    },
    openDetail(missionId, journalId, worksheetId, parent) {
      let branchUri = "";
      if (parent == null) {
        branchUri = "";
      } else {
        branchUri = "/" + parent.id;
      }
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/mission/" +
          missionId +
          "/journal/" +
          journalId +
          "/worksheet/" +
          worksheetId +
          "/new" +
          branchUri
      });
    }
  }
};
</script>