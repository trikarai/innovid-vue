<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-select
          :loading="tableLoad"
          v-model="selectedCohort"
          label="Program"
          :items="dataMentorships.list"
          item-text="program.name"
          return-object
          outlined
        ></v-select>
      </v-col>
      <v-col md="2">
        <v-switch v-model="modeJournal" label="Group by Mission"></v-switch>
      </v-col>
    </v-row>
    <v-row>
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
            <template v-if="item.journals.length == 0">No Journal Submitted</template>
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
                      @click="gotoJournalDetail(item.id, data.id)"
                      @click:close="gotoJournalDetail(item.id, data.id)"
                    >{{data.worksheet.name}}</v-chip>
                  </v-col>
                </template>
              </v-row>
            </template>
            <template v-if="item.journals.length == 0">No Journal Submitted</template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

import { participantjournalMixins } from "@/mixins/participantjournalMixins";

export default {
  mixins: [participantjournalMixins],
  data() {
    return {
      modeJournal: false,
      dataMentorships: { total: 0, list: [] },
      tableLoad: false,
      selectedCohort: {
        id: "",
        program: {
          id: "",
          name: ""
        }
      },
      tableHeaders2: [
        { text: "Team", value: "team.name", sortable: false },
        { text: "", value: "journal", sortable: false },
        { text: "", value: "group", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  watch: {
    selectedCohort() {
      this.getParticipantJournal();
    }
  },
  mounted() {
    this.getMentorship();
  },
  methods: {
    getMentorship() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dataMentorships = res.data.data;
          this.selectedCohort = res.data.data.list[0];
          this.getParticipantJournal();
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>