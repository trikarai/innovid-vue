<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCohort"
          label="Program"
          :items="dataList.list"
          item-text="cohort.name"
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>{{selectedCohort.cohort.programme.name}} - {{selectedCohort.cohort.name}}</v-col>
    </v-row>
    <v-row>
      <v-col md="6" sm="12">
        <v-card :disabled="selectedCohort.cohort.id == ''">
          <v-card-title primary-title>Participant</v-card-title>
          <v-card-actions>
            <v-btn
              depressed
              block
              color="primary"
              router
              :to="'/personnel/coordinator/program/' + selectedCohort.cohort.programme.id + '/cohort/' + selectedCohort.cohort.id + '/participant'"
            >
              <v-icon>group</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" sm="12">
        <v-card :disabled="selectedCohort.cohort.id == ''">
          <v-card-title primary-title>Applicant</v-card-title>
          <v-card-actions>
            <v-btn
              depressed
              block
              color="primary"
              :to="'/personnel/coordinator/program/' + selectedCohort.cohort.programme.id + '/cohort/' + selectedCohort.cohort.id + '/applicant'"
            >
              <v-icon>how_to_vote</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import * as config from "@/config/config";
import auth from "@/config/auth";
export default {
  data() {
    return {
      search: "",
      selectedCohort: {
        id: "",
        cohort: {
          id: "",
          name: "",
          programme: { id: "", name: "" }
        }
      },
      dataList: { total: 0, list: [] },
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
        .get("http://localhost:3006/api" + "/personnel/coordinatorships", {
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
