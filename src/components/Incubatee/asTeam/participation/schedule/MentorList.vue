<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>Mentor List</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.personnel.name}}
          </template>

          <template v-slot:item.action="{item}">
            <v-btn color="accent" @click="proposeAct(item)">
              <v-icon left>insert_invitation</v-icon>Propose
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialogDetail"
      scrollable
      persistent
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p class="text-capitalize"></p>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.personnel.name">
            <p>{{dataSingle.personnel.name}}</p>
            <!-- <p>{{dataSingle.acceptedTime}}</p>
            <p>{{dataSingle.active}}</p>
            <p>{{dataSingle.note}}</p>-->
          </v-card-text>
        </transition>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogForm"
      scrollable
      persistent
      :overlay="true"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p class="text-capitalize"></p>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <v-card-text>
          <p>{{dataSingle.personnel.name}}</p>
        </v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date Offer"
                      prepend-icon="today"
                      readonly
                      :rules="rulesRequired"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    :locale="$vuetify.lang.current"
                    v-model="date"
                    min="1950-01-01"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="schedule"
                      readonly
                      :rules="rulesRequired"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    color="blue"
                    :locale="$vuetify.lang.current"
                    v-model="time"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
          {{params}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!valid" @click="proposeAction()">
            <v-icon left>update</v-icon>Propose
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogForm = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// import bus from "@/config/bus";

import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      search: "",
      valid: false,
      menu: false,
      menu2: false,
      dataList: { total: 0, list: [] },
      dataSingle: { personnel: { name: "" } },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "sub", sortable: false, align: "left" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialog: false,
      dialogForm: false,
      dialogApply: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: {
        mentoringId: this.$route.params.mentoringId,
        mentorId: "",
        startTime: ""
      },
      date: "",
      time: ""
    };
  },
  watch: {
    date: "setDateTime",
    time: "setDateTime"
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    setDateTime: function() {
      this.params.startTime = this.date + " " + this.time;
    },
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentors",
          {
            headers: auth.getAuthHeader()
          }
        )
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
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentors/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    openDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    proposeAct(item) {
      this.dataSingle = item;
      this.params.mentorId = item.id;
      this.dialogForm = true;
    },
    proposeAction() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules",
          this.params,

          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.$router.replace({
            path:
              "/incubatee/team/" + 
              this.$route.params.teamId +
              "/participation/" +
              this.$route.params.cohortId +
              "/schedule"
          });
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
</style>