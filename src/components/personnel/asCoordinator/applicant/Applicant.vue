<template>
  <v-container fluid>
    <!-- <v-row>
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
    </v-row> -->
    <v-row>
      <v-col cols="12" xl="10" lg="12">
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          :options.sync="options"
          :server-items-length="dataList.total"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            <!-- <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn> -->
            {{ item.team.name }}
          </template>
          <template v-slot:item.note="{ item }">
            <v-chip small v-if="item.note !== null">{{ item.note }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <template v-if="!item.concluded">
              <v-btn
                class="ml-2"
                small
                color="primary"
                @click="leftAct(item, 'accept')"
              >
                <v-icon small left>check</v-icon>accept
              </v-btn>
              <v-btn
                class="ml-2"
                small
                color="warning"
                @click="leftAct(item, 'reject')"
              >
                <v-icon small left>block</v-icon>reject
              </v-btn>
            </template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{ leftAction }}</p>
        </v-card-title>
        <v-card-text>{{ leftName }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="red" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
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
          <v-progress-linear
            :indeterminate="true"
            color="primary"
          ></v-progress-linear>
        </v-card-text>
        <v-card-text>{{ dataSingle }}</v-card-text>
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

export default {
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", email: "" },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Status", value: "note", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      options: { page: 1, itemsPerPage: 15 },
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
    };
  },
  watch: {
    options: "getDataList",
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
            "/registrants",
          {
            params: {
              page: this.options.page,
              pageSize: this.options.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
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
    openDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registrants/" +
            id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataSingle = res.data.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.team.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/as-coordinator/" +
            this.$route.params.programId +
            "/registrants/" +
            id +
            "/" +
            this.leftAction,
          {},
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Registrant"
          );
          this.refresh();
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    refresh() {
      this.dialogForm = false;
      this.dialogDelete = false;
      this.dialogDetail = false;
      this.getDataList();
    },
  },
};
</script>
<style scoped></style>
