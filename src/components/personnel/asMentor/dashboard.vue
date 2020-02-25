<template>
  <v-container extend grid-list-xs>
    <!-- <v-row>
      <v-col md2>
        <v-switch v-model="mode" label="table"></v-switch>
      </v-col>
    </v-row>-->
    <template v-if="!mode">
      <v-row>
        <v-col>
          <v-select
            v-model="selectedCohort"
            label="Program"
            :items="dataList.list"
            item-text="program.name"
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12">
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
        <v-col md="6" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Scheduled Mentoring</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                :to="'/personnel/mentor/' + selectedCohort.program.id +'/schedule'"
              >
                <v-icon>event_available</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
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
          </v-data-table>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  data() {
    return {
      mode: true,
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
      loader: false
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
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
