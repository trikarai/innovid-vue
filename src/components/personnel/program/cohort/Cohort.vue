<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Create New Program
        </v-btn>
      </v-col>
    </v-row>
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
          <template v-slot:item.published="{item}">
            <v-icon large v-if="item.published" color="green darken-1">check</v-icon>
            <v-icon large v-else color="red darken-1">remove</v-icon>
          </template>
          <template v-slot:item.action="{item}">
            <v-btn
              dark
              small
              color="primary"
              class="mr-2"
              @click="publishCohort(item.id)"
              v-if="!item.published"
            >
              <v-icon left small>check</v-icon>Publish
            </v-btn>
            <v-btn v-if="!item.published" small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.personnel="{item}">
            <v-row>
            <v-btn small color="primary" class="my-2" @click="gotoMentor(item.id)">
              <!-- <v-icon left small>person</v-icon> -->
              Mentor
            </v-btn>
            </v-row>
            <v-row>
            <v-btn small color="primary" class="my-2 mt-0" @click="gotoCoordinator(item.id)">
              <!-- <v-icon left small>person</v-icon> -->
              Coordinator
            </v-btn>
            </v-row>
          </template>
          <template v-slot:item.sub="{item}">
            <v-row>
            <v-btn small color="primary" class="my-2" @click="gotoMission(item.id)">
              <!-- <v-icon left small>flag</v-icon> -->
              Mission
            </v-btn>
            </v-row>
            <v-row>
            <v-btn small color="primary" class="my-2 mt-0" @click="gotoMentoring(item.id)">
              <!-- <v-icon left small>forum</v-icon> -->
              Mentoring
            </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <add-form v-if="dialogForm" :edit="edit" @close="dialogForm = false" @refresh="refresh" />

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
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
      :overlay="false"
      max-width="330px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p class="text-capitalize">Program Detail</p>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.name"><b>Name</b><br>{{dataSingle.name}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.description"><b>Description</b><br>{{dataSingle.description}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.startDate">
            <!-- <v-icon left color="primary">calendar_today</v-icon> -->
              <b>Time Range</b><br>
              {{ dataSingle.startDate | moment("MMMM Do YYYY") }} - {{ dataSingle.endDate | moment("MMMM Do YYYY") }}
          </v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.published"><b>Status Publish</b><br>{{dataSingle.published}}</v-card-text>
        </transition>
        <!-- <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import AddForm from "./addform";

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
        { text: "", value: "personnel", sortable: false, align: "right" },
        { text: "", value: "sub", sortable: false, align: "right" },
        {
          text: "Published",
          value: "published",
          sortable: false,
          align: "right"
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: ""
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
        .get(config.baseUri + "/personnel/as-admin/programs", {
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
    },
    getDataSingle(id) {
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(config.baseUri + "/personnel/as-admin/programs/" + id, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    openAdd() {
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
        .delete(config.baseUri + "/personnel/as-admin/programs/" + id, {
          headers: auth.getAuthHeader()
        })
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
    publishCohort(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri + "/personnel/as-admin/programs/" + id + "/publish",
          {},
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
    },
    gotoCoordinator(id) {
      this.$router.push({
        path: "/personnel/program/" + id + "/coordinator"
      });
    },
    gotoMentor(id) {
      this.$router.push({
        path: "/personnel/program/" + id + "/mentor"
      });
    },
    gotoMission(id) {
      this.$router.push({
        path: "/personnel/program/" + id + "/mission"
      });
    },
    gotoMentoring(id) {
      this.$router.push({
        path: "/personnel/program/" + id + "/mentoring"
      });
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