<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-card :loading="tableLoad">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{dataList.mentoring.name}}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">{{dataList.participant.team.name}}</v-col>
              <v-col md="12">{{dataList.startTime}}</v-col>
              <v-col md="12">{{dataList.endTime}}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="12">
        <!-- <pre> {{dataList.worksheetForm}} </pre> -->
        <render-form
          v-if="!tableLoad"
          :formTemplate="dataList.mentoring.mentorMentoringFeedbackForm"
          @submit-form="submitForm"
        />
      </v-col>
    </v-row>

    <!-- <v-dialog v-model="dialogDelete" width="300" :persistent="true">
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
    </v-dialog> -->
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  data() {
    return {
      search: "",
      dataList: {
        id: "",
        mentoring: { id: "", name: "" },
        participantMentoringFeedbackForm: {
          name: "",
          description: "",
          stringFields: [],
          integerFields: [],
          textAreaFields: [],
          attachmentFields: [],
          singleSelectFields: [],
          multiSelectFields: []
        },
        startTime: "",
        endTime: "",
        mentor: {
          id: "",
          personnel: {
            name: ""
          }
        }
      },
      tableLoad: false,
      loader: false,
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
    RenderForm
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules/" +
            this.$route.params.scheduleId,
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
    }
  }
};
</script>