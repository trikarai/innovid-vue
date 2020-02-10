<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-data-table
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="participantList.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
            <v-btn class="ml-2" small color="primary" @click="gotoJournal(item.id)">
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
      tableLoad: false,
      participantList: { total: 0, list: [] },
      tableHeaders: [
        { text: "Team", value: "team.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted() {
    this.getParticipant();
  },
  methods: {
    getParticipant() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.participantList = res.data.data;
          } else {
            this.participantList = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoJournal(id) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.programId +
          "/participant/" +
          id +
          "/journal"
      });
    }
  }
};
</script>