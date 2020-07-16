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
        <v-col>{{ selectedCohort.program.name }}</v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Participant</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                router
                :to="
                  '/personnel/coordinator/program/' +
                    selectedCohort.program.id +
                    '/participant'
                "
              >
                <v-icon>group</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Applicant</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                :to="
                  '/personnel/coordinator/program/' +
                    selectedCohort.program.id +
                    '/applicant'
                "
              >
                <v-icon>how_to_vote</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" sm="12">
          <v-card :disabled="selectedCohort.program.id == ''">
            <v-card-title primary-title>Registration Phase</v-card-title>
            <v-card-actions>
              <v-btn
                depressed
                block
                color="primary"
                :to="
                  '/personnel/coordinator/program/' +
                    selectedCohort.program.id +
                    '/phase'
                "
              >
                <v-icon>today</v-icon>
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
            :options.sync="options"
            :server-items-length="dataList.total"
            :footer-props="{
              'items-per-page-options': [5, 15, 25],
            }"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <template v-if="item.program.removed">
                <v-chip color="warning">Program Removed</v-chip>
              </template>
              <template v-else>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="
                    '/personnel/coordinator/program/' +
                      item.program.id +
                      '/participant'
                  "
                >
                  <v-icon left>group</v-icon>Participant
                </v-btn>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="
                    '/personnel/coordinator/program/' +
                      item.program.id +
                      '/applicant'
                  "
                >
                  <v-icon left>how_to_vote</v-icon>Applicant
                </v-btn>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="
                    '/personnel/coordinator/program/' +
                      item.program.id +
                      '/phase'
                  "
                >
                  <v-icon left>today</v-icon>Registration Phase
                </v-btn>
                <v-btn
                  class="mr-2"
                  color="primary"
                  :to="
                    '/personnel/coordinator/program/' +
                      item.program.id +
                      '/mentoring'
                  "
                >
                  <v-icon left>assignment</v-icon>Mentoring
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
          name: "",
        },
      },
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", email: "" },
      tableHeaders: [
        { text: "Program Name", value: "program.name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      tableLoad: false,
      options: { page: 1, itemsPerPage: 15 },
      loader: false,
    };
  },
  watch: {
    options: "getDataList",
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/coordinatorships", {
          params: {
            page: this.options.page,
            pageSize: this.options.itemsPerPage,
          },
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
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
    },
  },
};
</script>
