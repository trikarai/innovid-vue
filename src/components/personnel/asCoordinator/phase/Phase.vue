<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md6>
        <v-btn color="primary" @click="openAdd()">
          <v-icon>add</v-icon>New Phase
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" xs="12">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-col>
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
            {{item.name}}
          </template>
          <template v-slot:item.action="{item}">
            <v-btn class="ml-2" small color="accent" @click="openEdit(item)">
              <v-icon small left>edit</v-icon>Edit
            </v-btn>
            <v-btn class="ml-2" small color="warning" @click="leftAct(item, 'Remove')">
              <v-icon small left>delete</v-icon>Remove
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

    <v-layout row justify-center>
      <v-dialog v-model="dialogForm" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Registration Phase</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col>
                    <v-text-field
                      :rules="rulesRequired"
                      v-model="params.name"
                      label="name"
                      class="required"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md6>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="params.startDate"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="rulesRequired"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="params.startDate" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md6>
                    <v-menu
                      :disabled="params.startDate == ''"
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="date2"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :disabled="params.startDate == ''"
                          v-model="params.endDate"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="rulesRequired"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="params.endDate" :min="params.startDate" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red"  @click.native="dialogForm = false">Close</v-btn>
            <v-btn
              v-if="!edit"
              :disabled="!valid"
              color="primary"
              
              @click.native="createPhase"
            >Save</v-btn>
            <v-btn v-else :disabled="!valid" color="primary" @click.native="editPhase">edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      valid: false,
      menu: false,
      menu2: false,
      date: "",
      date2: "",
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", startDate: "", endDate: "" },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
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
        name: "",
        startDate: "",
        endDate: ""
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
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registration-phases",
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
    openAdd() {
      this.dialogForm = true;
      this.edit = false;
      this.params = {
        name: "",
        startDate: "",
        endDate: ""
      };
    },
    openEdit(item) {
      this.dialogForm = true;
      this.edit = true;
      this.leftId = item.id;
      this.params = {
        name: item.name,
        startDate: "",
        endDate: ""
      };
    },
    createPhase() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registration-phases/",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    editPhase() {
      this.loader = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registration-phases/" +
            this.leftId,
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registration-phases/" +
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
      this.leftName = item.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registration-phases/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Remove Phase");
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
<style scoped>
</style>