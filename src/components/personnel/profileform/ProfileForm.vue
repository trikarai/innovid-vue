<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" router to="/personnel/profile-forms/build">
          <v-icon left>add</v-icon>Create Profile Form
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
    </v-row>-->
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-data-table
          :search="search"
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
          <template v-slot:item.name="{ item }">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{ item.name }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              small
              color="primary"
              class="mr-2"
              @click="openEdit(item.id)"
            >
              <v-icon left small>edit</v-icon>Edit
            </v-btn>
            <v-btn small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <add-form
      v-if="dialogForm"
      :edit="edit"
      @close="dialogForm = false"
      @refresh="refresh"
    />

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
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.name">{{
            dataSingle.name
          }}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.description">{{
            dataSingle.description
          }}</v-card-text>
        </transition>
        <!-- <v-card-text>{{dataSingle}}</v-card-text> -->
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
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      options: { page: 1, itemsPerPage: 15 },
    };
  },
  components: {},
  created: function() {
    this.authData = JSON.parse(auth.getAuthData());
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
        .get(config.baseUri + "/personnel/as-admin/profile-forms", {
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
    getDataSingle(id) {
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(config.baseUri + "/personnel/as-admin/profile-forms/" + id, {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
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
    openEdit(id) {
      var formType = "profile-forms";
      this.$router.push({
        path: "/personnel/" + formType + "/" + id + "/edit",
      });
    },
    openDetail(id) {
      // this.dialogDetail = true;
      // this.getDataSingle(id);
      var formType = "profile-forms";
      this.$router.push({ path: "/personnel/preview/" + formType + "/" + id });
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
        .delete(config.baseUri + "/personnel/as-admin/worksheet-forms/" + id, {
          headers: auth.getAuthHeader(),
        })
        .then(() => {
          this.refresh();
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    refresh() {
      this.dialogForm = false;
      this.dialogDelete = false;
      this.getDataList();
    },
  },
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
