<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Mission
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
          <template v-slot:item.sub="{item}">
            <v-icon v-if="item.previousMission === null">stars</v-icon>
          </template>
          <template v-slot:item.action="{item}">
            <v-btn small color="warning" @click="openAddBranch(item.id)">
              <v-icon small left>account_tree</v-icon>Add Branch
            </v-btn>
            <!-- <v-btn small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
            </v-btn>-->
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <add-form
      v-if="dialogForm"
      :rootid="rootId"
      :isbranch="branch"
      :edit="edit"
      @close="dialogForm = false"
      @refresh="refresh"
    />

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
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.name">{{dataSingle.name}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.description">{{dataSingle.description}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.worksheetForm">{{dataSingle.worksheetForm.name}}</v-card-text>
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

import AddForm from "./addmission";

export default {
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", description: "", worksheetForm: { name: "" } },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "personnel", sortable: false, align: "right" },
        { text: "", value: "sub", sortable: false, align: "right" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      rootId: "",
      branch: false
    };
  },
  components: {
    AddForm
  },
  created: function() {
    this.authData = JSON.parse(auth.getAuthData());
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
            "/personnel/as-admin/programmes/" +
            this.$route.params.programId +
            "/cohorts/" +
            this.$route.params.cohortId +
            "/missions",
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
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programmes/" +
            this.$route.params.programId +
            "/cohorts/" +
            this.$route.params.cohortId +
            "/missions/" +
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
    openAdd() {
      this.rootId = "";
      this.branch = false;
      this.edit = false;
      this.dialogForm = true;
    },
    openAddBranch(id) {
      this.rootId = id;
      this.branch = true;
      this.edit = false;
      this.dialogForm = true;
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
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/personnel/as-admin/programmes/" +
            this.$route.params.programId +
            "/cohorts/" +
            this.$route.params.cohortId +
            "/missions/" +
            id,
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
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>