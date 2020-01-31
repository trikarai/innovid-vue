<template>
  <v-container extend grid-list-xs>
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
              <v-col md="12">{{dataList.mentor.personnel.name}}</v-col>
              <v-col md="12">{{dataList.startTime}}</v-col>
              <v-col md="12">{{dataList.endTime}}</v-col>
            </v-row>
          </v-card-text>
          <template v-if="!edit">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Report</h3>
                <v-btn color="primary" small @click="edit = !edit"><v-icon small>edit</v-icon></v-btn>
              </div>
            </v-card-title>
            <v-card-text>
              <template v-for="data in fields">
                <v-row :key="data.id">
                  <v-col md="2" class="sub-title">{{data.field.name}}</v-col>
                  <v-col md="6" class="display-1">{{data.value}}</v-col>
                </v-row>
              </template>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
      <v-col md="12" v-if="edit">
        <!-- <pre> {{dataList.participantMentoringReport}} </pre> -->
        <render-form
          v-if="!tableLoad"
          :formTemplate="dataList.mentoring.participantMentoringFeedbackForm"
          @submit-form="submitForm"
        />
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
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      search: "",
      edit: true,
      dataList: {
        id: "",
        mentoring: { id: "", name: "" },
        participantMentoringFeedbackForm: {
          id: "",
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
        participantMentoringReport: null,
        mentor: {
          id: "",
          personnel: {
            name: ""
          }
        }
      },
      fields: [],

      tableLoad: false,
      loader: false,
      dialog: false,
      dialogForm: false,
      dialogApply: false,
      dialogDelete: false,
      dialogDetail: false,
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
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules/" +
            this.$route.params.scheduleId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;
          if (res.data.data.participantMentoringReport !== null) {
            this.refactorRecordJSON(res.data.data.participantMentoringReport);
            this.edit = false;
          } else {
            this.edit = true;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    submitForm(params) {
      this.loader = true;
      params[
        "Form_id"
      ] = this.dataList.mentoring.participantMentoringFeedbackForm.id;

      this.axios
        .put(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/mentoring-schedules/" +
            this.$route.params.scheduleId +
            "/participant-mentoring-report",
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Form Report Uploaded");
          this.$router.go(-1);
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
    }
  }
};
</script>