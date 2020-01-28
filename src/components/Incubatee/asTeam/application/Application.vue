<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col>Available Program</v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" lg="8" xs="12">
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          class="elevation-1"
        >
        <template v-slot:no-data>No Program Available / Already Participate one of the program</template>
          <!-- <template v-slot:item.name="{item}">
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
          </template> -->
          <template v-slot:item.action="{item}">
            <v-btn small color="primary" class="mr-2" @click="leftApply(item)">
              <v-icon left>check</v-icon>Register
            </v-btn>
            <!-- <v-btn small color="warning" class="mr-2" @click="leftAct(item, 'Cancel')">
              <v-icon left>cancel</v-icon>Cancel
            </v-btn>-->
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col>Registered Program</v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" lg="8" xs="12">
        <v-data-table
          :search="search"
          :loading="tableLoad2"
          :headers="tableHeaders2"
          :items="dataList2.list"
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
            {{item.program.name}}
          </template>

          <template v-slot:item.action="{item}">
            <v-btn small color="warning" class="mr-2" @click="leftCancel(item, 'Cancel')">
              <v-icon left>cancel</v-icon>Cancel
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogApply" width="300" :persistent="true">
      <v-card :loading="loader">
        <v-card-title>
          <p class="text-capitalize">Apply Program</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="red" @click="applyCohort()">Yes</v-btn>
          <v-btn text color="grey" @click="dialogApply = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="loader">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
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
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.name">
            <p>{{dataSingle.name}}</p>
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
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      search: "",
      dataList: { total: 0, list: [] },
      dataList2: { total: 0, list: [] },
      dataSingle: { name: "" },
      tableLoad: false,
      tableLoad2: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Description", value: "description", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      tableHeaders2: [
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
        programId: ""
      }
    };
  },
  mounted() {
    this.getDataList();
    this.getDataList2();
  },
  watch: {
    '$route': "getDataList"
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/programs",
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
            "/program-registrations",
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
    getDataSingle(id) {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/programs/" +
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
    openDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.name;
      this.leftAction = action;
    },
    leftApply(item) {
      this.dialogApply = true;
      this.params.programId = item.id;
      this.leftName = item.name;
    },
    applyCohort() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-registrations/",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Apply");
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/programs/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Cancel");
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
      this.dialogApply = false;
      this.getDataList();
    }
  }
};
</script>
<style scoped>
</style>