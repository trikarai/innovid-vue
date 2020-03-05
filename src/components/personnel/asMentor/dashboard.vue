<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="2">
        <v-switch v-model="mode" label="table"></v-switch>
      </v-col>
    </v-row>
    <template v-if="!mode">
      <v-row>
        <v-col md="6">
          <v-select
            v-model="selectedCohort"
            label="Program"
            :items="dataList.list"
            item-text="program.name"
            return-object
            @change="getParticipant"
            outlined
          ></v-select>
        </v-col>
      <!-- </v-row>
      <v-row> -->
        <v-col md="3" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Requested Mentoring</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                router
                :to="'/personnel/mentor/' + selectedCohort.program.id +'/negotiate-schedule'"
              >
                <v-icon>schedule</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="3" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Scheduled Mentoring</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                :to="'/personnel/mentor/' + selectedCohort.id + '/' + selectedCohort.program.id +'/schedule'"
              >
                <v-icon>event_available</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="12">
          <span class="title" >Participant</span>
        </v-col>
        <v-col md="12">
          <v-data-table
            :loading="tableLoad"
            :headers="tableHeaders2"
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
    </template>
    <template v-else>
      <v-row>
        <v-col>
          <!-- <pre>{{dataList}}</pre> -->
          <v-data-table
            :loading="tableLoad"
            :headers="tableHeaders"
            :items="dataList.list"
            class="elevation-1"
          >
            <template v-slot:item.action="{item}">
              <template v-if="item.program.removed">
                <v-chip>Program Removed</v-chip>
              </template>
              <template v-else>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="'/personnel/mentor/'+ item.id + '/'+ item.program.id +'/participant'"
                >
                  <v-icon left>group</v-icon>Participant
                </v-btn>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="'/personnel/mentor/' + item.id +'/negotiate-schedule'"
                >
                  <v-icon left>today</v-icon>Requested Mentoring
                </v-btn>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="'/personnel/mentor/' + item.id + '/'+ item.program.id +'/schedule'"
                >
                  <v-icon left>how_to_vote</v-icon>Scheduled Mentoring
                </v-btn>
              </template>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  data() {
    return {
      mode: false,
      search: "",
      selectedCohort: {
        id: "",
        program: {
          id: "",
          name: ""
        }
      },
      dataList: { total: 0, list: [] },
      tableHeaders: [
        { text: "Name", value: "program.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dataSingle: { name: "", email: "" },
      tableLoad: false,
      loader: false,
      participantList: { total: 0, list: [] },
      tableHeaders2: [
        { text: "Team", value: "team.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dataList = res.data.data;
          this.selectedCohort = res.data.data.list[0];
          this.getParticipant();
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getParticipant() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.selectedCohort.program.id +
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
          this.selectedCohort.id +
          "/" +
          this.selectedCohort.program.id +
          "/participant/" +
          id +
          "/journal"
      });
    }
  }
};
</script>
