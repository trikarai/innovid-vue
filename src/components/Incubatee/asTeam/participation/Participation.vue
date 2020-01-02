<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col></v-col>
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
            {{item.cohort.name}}
          </template>
          <template v-slot:item.sub="{item}">
            <v-btn
              small
              color="accent"
              class="mr-2"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + item.id + '/schedule'"
            >
              <v-icon left>today</v-icon>Schedules
            </v-btn>
            <v-btn
              small
              color="accent"
              class="mr-2"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + item.id + '/journal'"
            >
              <v-icon left>book</v-icon>Journals
            </v-btn>
            <v-btn
              small
              color="accent"
              class="mr-2"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + item.id + '/mission'"
            >
              <v-icon left>emoji_objects</v-icon>Missions
            </v-btn>
          </template>
          <template v-slot:item.action="{item}">
            <v-btn small color="warning" class="mr-2" @click="leftAct(item, 'Cancel')">
              <v-icon left>flag</v-icon>Quit
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="loader">
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
          <v-card-text :key="dataSingle.cohort.name">
            <p>{{dataSingle.cohort.name}}</p>
            <p>{{dataSingle.acceptedTime}}</p>
            <p>{{dataSingle.active}}</p>
            <p>{{dataSingle.note}}</p>
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

// import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { cohort: { name: "" } },
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
      leftAction: ""
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          //   config.baseUri +
          "http://localhost:3004/api" +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations",
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
          //   config.baseUri +
          "http://localhost:3004/api" +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations/" +
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
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.cohort.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          //   config.baseUri +
          "http://localhost:3004/api" +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Quit");
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>