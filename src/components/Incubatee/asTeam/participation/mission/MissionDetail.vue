<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-card :loading="tableLoad">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{dataList.name}}</h3>
              <div>{{dataList.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              v-if="dataList.previousMission !== null"
              text
              color="accent"
              :disabled="dataList.previousMission == null"
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + dataList.previousMission.id "
            >Prev Mission</v-btn>
            <v-btn
              v-else
              text
              color="accent"
              :disabled="dataList.previousMission == null"
              router
            >Prev Mission</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="accent" disabled>Next Mission</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn class="mr-2" small color="primary" disabled>View Journal</v-btn>
            <v-btn
              color="primary"
              small
              router
              :to="'/incubatee/team/' + $route.params.teamId + '/participation/' + $route.params.cohortId + '/mission/' + dataList.id + '/atom' "
            >
              <v-icon left>add</v-icon>Add Journal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="12">
        <!-- <pre> {{dataList.worksheetForm}} </pre> -->
        <!-- <render-form
          v-if="!tableLoad"
          :formTemplate="dataList.worksheetForm"
          @submit-form="submitForm"
        />-->
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
import auth from "@/config/auth";
import * as config from "@/config/config";

// import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  data() {
    return {
      search: "",
      dataList: { id: "", name: "", description: "", nextMission: { id: "" } },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Mission", value: "name", sortable: false },
        { text: "Worksheet", value: "worksheet.name", sortable: false },
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
  components: {
    // RenderForm
  },
  mounted() {
    this.getDataList();
  },
  watch: {
    $route: "getDataList"
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    submitForm(params) {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets",
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Data Uploaded");
          this.$router.go(-2);
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
      //   this.leftName = item.mentoring.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit(
            "callNotif",
            "info",
            "Successfully " + this.leftAction + " Mentoring Schedule"
          );
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