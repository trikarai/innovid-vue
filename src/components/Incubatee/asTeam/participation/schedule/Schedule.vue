<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-btn
          color="primary"
          router
          :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mentoring' "
        ><v-icon left>add</v-icon>Propose New Mentoring</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Schedule</v-col>
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
            {{item.mentoring.name}}
          </template>
          <template v-slot:item.action="{item}">
            <v-btn
              class="ml-2"
              small
              color="accent"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/schedule/' + item.id + '/report'"
            >
              <v-icon small left>assignment</v-icon>Report
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- <v-divider></v-divider> -->

    <v-row>
      <v-col>Negotiate Schedule</v-col>
    </v-row>
    <v-row>
      <v-col>
        {{dataList2}}
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList2.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openNegoDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.mentoring.name}}
          </template>
          <template v-slot:item.action="{item}">
            <template v-if="item.status !== 'proposed'">
              <template v-if="item.status !== 'cancelled'">
                <v-btn class="ml-2" small color="primary" @click="leftAct(item, 'accept')">
                  <v-icon small left>check</v-icon>Accept
                </v-btn>
              </template>
              <v-btn class="ml-2" small color="primary" @click="reproposeAct(item)">
                <v-icon small left>update</v-icon>Re-schedule
              </v-btn>
            </template>
            <v-btn
              v-if="item.status !== 'cancelled'"
              class="ml-2"
              small
              color="warning"
              @click="leftAct(item, 'cancel')"
            >
              <v-icon small left>block</v-icon>Cancel
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
        <v-card-text>{{dataSingle}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn v-if="leftAction = 'cancel'" text color="red" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn v-if="leftAction = 'accept'" text color="red" @click="acceptAccount(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
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
          <p>{{dataSingle.mentoring.name}}</p>
          <p>{{dataSingle.mentor.personnel.name}}</p>
          <p>{{dataSingle.startTime}}</p>
          <p>{{dataSingle.endTime}}</p>
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
          <!-- {{startTime}} -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!valid" @click="proposeAction()">
            <v-icon left>update</v-icon>RePropose
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
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      menu: false,
      menu2: false,
      authData: "",
      search: "",
      valid: false,
      dataList: { total: 0, list: [] },
      dataList2: { total: 0, list: [] },
      dataSingle: {
        mentoring: { name: "" },
        mentor: {
          personnel: {
            name: ""
          }
        },
        startTime: "",
        endTime: ""
      },
      tableLoad: false,
      tableLoad2: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Mentor", value: "mentor.personnel.name", sortable: false },
        { text: "startTime", value: "startTime", sortable: false },
        { text: "endTime", value: "endTime", sortable: false },
        { text: "status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: {
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
  mounted: function() {
    this.getDataList();
    this.getDataList2();
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
            "/mentoring-schedules",
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
    getDataList2() {
      this.tableLoad2 = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList2 = res.data.data;
          } else {
            this.dataList2 = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad2 = false;
        });
    },
    openDetail(id) {
      // this.dialogDetail = true;
      // this.getDataSingle(id);
      this.$router.push({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/schedule/" +
          id
      });
    },
    openNegoDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.mentoring.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Mentoring Schedule"
          );
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    acceptAccount(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/negotiate-mentoring-schedules/" +
            id +
            "/" +
            this.leftAction,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Mentoring Schedule"
          );
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    reproposeAct(item) {
      this.dataSingle = item;
      this.dialogForm = true;
    },
    proposeAction() {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-negotiate-schedules/" +
            this.dataSingle.id +
            "/re-propose",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Repropose Schedule");
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    refresh() {
      this.dialogForm = false;
      this.dialogDelete = false;
      this.getDataList();
      this.getDataList2();
    }
  }
};
</script>