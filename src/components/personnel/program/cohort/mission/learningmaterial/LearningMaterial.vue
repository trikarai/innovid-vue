<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Learning Material
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
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
            <v-btn small color="accent" class="mr-2" @click="openEdit(item.id)">
              <v-icon small>edit</v-icon>
            </v-btn>
            <v-btn small color="warning" @click="leftAct(item, 'Delete')">
              <v-icon small>delete</v-icon>
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
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      tableLoad: false,
      edit: false,
      dataList: { total: 0, list: [] },
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogDelete: false,
      leftId: "",
      leftName: "",
      leftAction: ""
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
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openAdd() {
      this.$router.push({
        path:
          "/personnel/program/" +
          this.$route.params.programId +
          "/mission/" +
          this.$route.params.missionId +
          "/learning-material/add"
      });
    },
    openDetail(id) {
      this.$router.push({
        path:
          "/personnel/program/" +
          this.$route.params.programId +
          "/mission/" +
          this.$route.params.missionId +
          "/learning-material/" +
          id
      });
    },
    openEdit(id) {
      this.$router.push({
        path:
          "/personnel/program/" +
          this.$route.params.programId +
          "/mission/" +
          this.$route.params.missionId +
          "/learning-material/" +
          id +
          "/edit"
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
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials/" +
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
      this.dialogDelete = false;
      this.getDataList();
    }
  }
};
</script>
<style scoped>
</style>