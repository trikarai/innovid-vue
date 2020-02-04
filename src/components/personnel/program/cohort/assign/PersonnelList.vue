<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <!-- <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Personnel
        </v-btn>
      </v-col>-->
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
      <v-col cols="12" md="6" lg="6" xs="12">
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
            <v-btn class="mr-2" small color="primary" @click="leftAct(item, 'Assign')">
              <v-icon small left>how_to_reg</v-icon>Assign
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" width="300" :persistent="false">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">Assign</p>
        </v-card-title>
        <v-card-text><b>Name</b><br>{{leftName}}</v-card-text>
        <v-card-text>
          <div class="flex-grow-1"></div>
          <v-row>
          <v-btn block small color="primary" @click="assignAs(leftId, 'mentors')">as Mentor</v-btn>
          </v-row>
          <v-row>
          <v-btn block small class="mt-3" color="primary" @click="assignAs(leftId, 'coordinators')">as Coordinator</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogDetail"
      scrollable
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-progress-linear v-if="loader" :indeterminate="true" color="primary"></v-progress-linear>
        <v-card-title>
          <p class="text-capitalize">Personnel Detail</p>
        </v-card-title>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.name"><b>Name</b><br>{{dataSingle.name}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.email"><b>Email</b><br>{{dataSingle.email}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.phone"><b>Phone Number</b><br>{{dataSingle.phone}}</v-card-text>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <v-card-text :key="dataSingle.joinTime"><b>Join Time</b><br>
            <v-icon left color="primary">calendar_today</v-icon>
              {{ dataSingle.joinTime | moment("MMMM Do YYYY") }}
              <br />
              <v-icon left color="primary">access_time</v-icon>
              {{ dataSingle.joinTime | moment("h:mm a") }}
          </v-card-text>
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
  components: {},
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
        .get(config.baseUri + "/personnel/as-admin/personnels", {
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
      this.dataSingle = {};
      this.loader = true;
      this.axios
        .get(config.baseUri + "/personnel/as-admin/personnels/" + id, {
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
    assignAs(id, role) {
      this.tableLoad = true;
      this.axios
        .post(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/" +
            role,
          {
            personnelId: id
          },
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Assign Success");
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