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
            :loading="tableLoad"
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
        <v-row>-->
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
          <span class="title">Participant</span>
        </v-col>
        <v-col md="2">
          <v-switch v-model="modeJournal" label="Group by Mission"></v-switch>
        </v-col>
        <!-- <v-col md="12">
          <pre> {{participantJournalList}} </pre>
        </v-col>-->
        <v-col md="12">
          <v-data-table
            :headers="tableHeaders2"
            :items="participantJournalList.list"
            hide-default-footer
            class="elevation-1"
            :loading="tableLoad"
          >
            <template v-if="!modeJournal" v-slot:item.journal="{item}">
              <template v-for="journal in item.journals">
                <v-row :key="journal.id">
                  <v-chip class="ma-1">{{journal.mission.name}} - {{journal.worksheet.name}}</v-chip>
                  <v-btn icon color="success" @click="gotoJournalDetail(item.id, journal.id)">
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </template>

            <template v-if="modeJournal" v-slot:item.group="{item}">
              <template v-for="(group, index) in item.grouped">
                <v-row :key="index">
                  <template>
                    <v-col md="12" class="title">{{group[0]}}</v-col>
                  </template>
                  <template v-for="data in group[1]">
                    <v-col :key="data.id">
                      <v-chip
                        close
                        close-icon="zoom_in"
                        @click:close="gotoJournalDetail(item.id, data.id)"
                      >{{data.worksheet.name}}</v-chip>
                    </v-col>
                  </template>
                </v-row>
              </template>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col>
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

import { participantjournalMixins } from "@/mixins/participantjournalMixins";

export default {
  mixins: [participantjournalMixins],
  data() {
    return {
      mode: false,
      modeJournal: false,
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
        { text: "", value: "journal", sortable: false },
        { text: "", value: "group", sortable: false },
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
          // this.getParticipant();
          this.getParticipantJournal();
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
            "/participants/",
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
    },
    
  }
};
</script>
