<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- <v-col md="12">{{dataList}}</v-col> -->
      <v-col md="6">
        <v-card :loading="tableLoad">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{dataList.mentoring.name}}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">
                <b>Team Name</b>
                <br />
                {{dataList.participant.team.name}}
              </v-col>
              <v-col md="6">
                <b>Start Time</b>
                <v-row>
                  <v-col>
                    <v-icon left color="primary">calendar_today</v-icon>
                    {{ dataList.startTime | moment("MMMM Do YYYY") }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-0 pt-0">
                    <v-icon left color="primary">access_time</v-icon>
                    {{ dataList.startTime | moment("h:mm a") }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="6">
                <b>End Time</b>
                <v-row>
                  <v-col>
                    <v-icon left color="primary">calendar_today</v-icon>
                    {{ dataList.endTime | moment("MMMM Do YYYY") }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-0 pt-0">
                    <v-icon left color="primary">access_time</v-icon>
                    {{ dataList.endTime | moment("h:mm a") }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <template v-if="!edit">
            <v-card-title primary-title>
              <h3 class="headline mb-0">Report</h3>
              <v-spacer></v-spacer>
              <v-btn color="primary" small @click="edit = !edit">
                <v-icon left small>edit</v-icon>Edit
              </v-btn>
            </v-card-title>
            <v-card-text class="pt-0 mt-2 ml-3">
              <render-record :fields="fields" />
            </v-card-text>
          </template>
          <template v-if="dataList.mentorMentoringReport != null">
            <template v-if="edit">
              <v-card-title primary-title v-if="dataList.mentorMentoringReport !== null">
                <v-spacer></v-spacer>
                <v-btn color="warning" small @click="edit = !edit">
                  <v-icon left small>close</v-icon>Cancel Edit
                </v-btn>
              </v-card-title>
            </template>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="edit">
        <render-form
          v-if="!tableLoad"
          :modeReload="isReload"
          :formTemplate="dataListTemp.mentoring.mentorMentoringFeedbackForm"
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
    </v-dialog>-->
    <v-overlay :value="loader">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      isReload: false,
      search: "",
      edit: true,
      dataListTemp: {},
      dataList: {
        id: "",
        mentoring: {
          id: "",
          name: "",
          mentorMentoringFeedbackForm: {
            id: "",
            name: "",
            description: "",
            stringFields: [],
            integerFields: [],
            textAreaFields: [],
            attachmentFields: [],
            singleSelectFields: [],
            multiSelectFields: []
          }
        },
        startTime: "",
        endTime: "",
        participant: {
          id: "",
          team: {
            name: ""
          }
        },
        mentorMentoringReport: null
      },
      tableLoad: false,
      loader: false,
      dialog: false,
      dialogForm: false,
      dialogApply: false,
      dialogDelete: false,
      dialogDetail: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      fields: []
    };
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "personnel");
  },
  components: {
    RenderForm,
    RenderRecord
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
          this.dataListTemp = JSON.parse(JSON.stringify(res.data.data));
          if (res.data.data.mentorMentoringReport !== null) {
            this.edit = false;
            this.isReload = true;
            this.refactorRecordJSON(res.data.data.mentorMentoringReport);
            this.pairFieldValueReport(this.dataListTemp.mentorMentoringReport);
          } else {
            this.edit = true;
            this.isReload = false;
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
      ] = this.dataList.mentoring.mentorMentoringFeedbackForm.id;

      this.axios
        .put(
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules/" +
            this.$route.params.scheduleId +
            "/mentor-mentoring-report",
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Report Data Uploaded");
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    editReport() {
      this.edit = true;
    },
    pairFieldValueReport(data) {
      //this code is only used in mentoring feedback report
      //https://stackoverflow.com/questions/56444006/how-to-merge-the-property-with-same-key-in-two-object-array?noredirect=1&lq=1
      //String
      var map = new Map(
        data.stringFieldRecords.map(o => [o.stringField.id, o])
      );
      var result = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.stringFields.map(
        o => Object.assign({}, o, map.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.stringFields = result;
      // eslint-disable-next-line no-console
      //textarea
      var mapt = new Map(
        data.textAreaFieldRecords.map(o => [o.textAreaField.id, o])
      );
      var resultt = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.textAreaFields.map(
        o => Object.assign({}, o, mapt.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.textAreaFields = resultt;
      //integer
      var mapi = new Map(
        data.integerFieldRecords.map(o => [o.integerField.id, o])
      );
      var resulti = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.integerFields.map(
        o => Object.assign({}, o, mapi.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.integerFields = resulti;
      //single select / radio
      var mapr = new Map(
        data.singleSelectFieldRecords.map(o => [o.singleSelectField.id, o])
      );
      var resultr = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.singleSelectFields.map(
        o => Object.assign({}, o, mapr.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.singleSelectFields = resultr;
      //multi select
      var mapm = new Map(
        data.multiSelectFieldRecords.map(o => [o.multiSelectField.id, o])
      );
      var resultm = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.multiSelectFields.map(
        o => Object.assign({}, o, mapm.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.multiSelectFields = resultm;
      //attachment
      var mapa = new Map(
        data.attachmentFieldRecords.map(o => [o.attachmentField.id, o])
      );
      var resulta = this.dataListTemp.mentoring.mentorMentoringFeedbackForm.attachmentFields.map(
        o => Object.assign({}, o, mapa.get(o.id))
      );
      this.dataListTemp.mentoring.mentorMentoringFeedbackForm.attachmentFields = resulta;
    }
  }
};
</script>