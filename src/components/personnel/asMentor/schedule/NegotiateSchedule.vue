<template>
  <v-container grid-list-xs>
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
            <v-btn class="ml-2" small color="primary" @click="leftAct(item, 'accept')">
              <v-icon small left>check</v-icon>Accept
            </v-btn>
            <v-btn class="ml-2" small color="accent" @click="offerAct(item)">
              <v-icon small left>update</v-icon>Offer
            </v-btn>
            <v-btn class="ml-2" small color="warning" @click="leftAct(item, 'reject')">
              <v-icon small left>block</v-icon>Reject
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn color="red" @click="dialogDelete = false">Cancel</v-btn>
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
          <p>{{dataSingle.participant.team.name}}</p>
          <p>{{dataSingle.startTime}}</p>
          <p>{{dataSingle.endTime}}</p>
        </v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="params.startTime"
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
                v-model="params.startTime"
                min="1950-01-01"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
          <!-- {{startTime}} -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!valid" @click="offerAction()">
            <v-icon left>update</v-icon>Offer
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogForm = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      authData: "",
      search: "",
      valid: false,
      menu: false,
      dataList: { total: 0, list: [] },
      dataSingle: {
        id: "",
        mentoring: {
          id: "",
          name: "1"
        },
        participant: {
          id: "",
          team: {
            id: "",
            name: ""
          }
        },
        startTime: "",
        endTime: ""
      },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Team", value: "participant.team.name", sortable: false },
        { text: "startTime", value: "startTime", sortable: false },
        { text: "endTime", value: "endTime", sortable: false },
        { text: "status", value: "status", sortable: false },
        { text: "concluded", value: "concluded", sortable: false },
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
      }
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/negotiate-schedules",
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
    openDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/negotiate-schedules/" +
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
      this.leftName = item.participant.team.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/negotiate-schedules/" +
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
            "Successfully " + this.leftAction + " Schedule"
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

    offerAct(item) {
      this.dataSingle = item;
      this.dialogForm = true;
    },
    offerAction() {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/negotiate-schedules/" +
            this.dataSingle.id +
            "/offer",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Offer Schedule");
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
    }
  }
};
</script>