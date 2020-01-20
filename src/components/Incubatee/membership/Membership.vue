<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Create Team
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Membership</v-col>
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
            {{item.team.name}}
          </template>
          <template v-slot:item.action="{item}">
            <v-btn
              class="mr-2"
              small
              color="accent"
              router
              :to="'/incubatee/team/' + item.team.id + '/member' "
            >
              <v-icon left small>group</v-icon>Members
            </v-btn>
            <v-btn
              class="mr-2"
              small
              color="accent"
              router
              :to="'/incubatee/team/' + item.team.id + '/worksheet' "
            >Worksheet</v-btn>
            <v-btn
              class="mr-2"
              small
              color="accent"
              router
              :to="'/incubatee/team/' + item.team.id + '/application' "
            >
              <v-icon left small>how_to_vote</v-icon>Programs
            </v-btn>
            <v-btn
              class="mr-2"
              small
              color="accent"
              router
              :to="'/incubatee/team/' + item.team.id + '/participation' "
            >
              <v-icon left small>how_to_reg</v-icon>Participation
            </v-btn>
            <v-btn class="mr-2" small color="accent" @click="updateAct(item, 'Update')">
              <v-icon left small>edit</v-icon>Update Name
            </v-btn>
            <v-btn small color="warning" @click="leftAct(item, 'Quit')">
              <v-icon left small>flag</v-icon>Quit
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Candidateship Invitation</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :loading="tableLoad"
          :headers="tableHeaders2"
          :items="dataList2.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <!-- <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>-->
            {{item.team.name}}
          </template>
          <template v-slot:item.concluded="{item}">
            <v-icon v-if="item.concluded" color="green darken-1">check</v-icon>
            <v-icon v-else color="red darken-1">removed</v-icon>
          </template>
          <template v-slot:item.action="{item}">
            <template v-if="item.note == 'invited'">
              <v-btn small color="primary" class="mr-2" @click="leftAct2(item, 'accept')">
                <v-icon left small>check</v-icon>Accept
              </v-btn>
              <v-btn small color="warning" @click="leftAct2(item, 'reject')">
                <v-icon left small>block</v-icon>Reject
              </v-btn>
            </template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <team-form v-if="dialogForm" :edit="edit" @close="dialogForm = false" @refresh="refresh" />

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

    <v-dialog v-model="dialogDelete2" width="300" :persistent="true">
      <v-card :loading="tableLoad2">
        <v-card-title>
          <p class="text-capitalize">{{leftAction2}}</p>
        </v-card-title>
        <v-card-text>{{leftName2}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="deleteAccount2(leftId2)">Yes</v-btn>
          <v-btn color="red" @click="dialogDelete2 = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card :loading="tableLoad">
          <v-card-title class="headline">Update Name</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Team Name" v-model="leftName"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="warning" @click.native="dialog = false">Cancel</v-btn>
            <v-btn small color="primary" @click="updateTeamName()">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

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
          <v-card-text :key="dataSingle.team.name">{{dataSingle.team.name}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.position">{{dataSingle.position}}</v-card-text>
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
import TeamForm from "./teamForm";

export default {
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataList2: { total: 0, list: [] },
      dataSingle: { team: { name: "" }, position: "" },
      tableLoad: false,
      tableLoad2: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      tableHeaders2: [
        { text: "Name", value: "name", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Concluded", value: "concluded", sortable: false },
        { text: "Note", value: "note", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialog: false,
      dialogForm: false,
      dialogDelete: false,
      dialogDelete2: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      leftId2: "",
      leftName2: "",
      leftAction2: ""
    };
  },
  components: {
    TeamForm
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
  },
  mounted: function() {
    this.getDataList();
    this.getDataList2();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/founder/team-memberships", {
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
    getDataList2() {
      this.tableLoad2 = true;
      this.axios
        .get(config.baseUri + "/founder/team-member-candidateships", {
          headers: auth.getAuthHeader()
        })
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
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(config.baseUri + "/founder/team-memberships/" + id, {
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
      this.leftName = item.team.name;
      this.leftAction = action;
    },
    leftAct2(item, action) {
      this.dialogDelete2 = true;
      this.leftId2 = item.id;
      this.leftName2 = item.team.name;
      this.leftAction2 = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(config.baseUri + "/founder/team-memberships/" + id, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Quit from team");
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    deleteAccount2(id) {
      this.tableLoad2 = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/team-member-candidateships/" +
            id +
            "/" +
            this.leftAction2,
          {},
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction2 + " candidateships"
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
    updateAct(item, action) {
      this.dialog = true;
      this.leftId = item.team.id;
      this.leftName = item.team.name;
      this.leftAction = action;
    },
    updateTeamName() {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri + "/founder/as-team-member/" + this.leftId,
          { name: this.leftName },
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Successfully Change Team Name");
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
      this.dialog = false;
      this.dialogForm = false;
      this.dialogDelete = false;
      this.dialogDelete2 = false;
      this.getDataList();
      this.getDataList2();
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