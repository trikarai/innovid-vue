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
              <v-col md="12">
                <b>Mentor Name</b>
                <br />
                {{dataList.mentor.personnel.name}}
              </v-col>
              <v-col>
                <b>Start time</b>
                <br />
                <v-icon left color="primary">calendar_today</v-icon>
                {{ dataList.startTime | moment("MMMM Do YYYY") }}
                <br />
                <v-icon left color="primary">access_time</v-icon>
                {{ dataList.startTime | moment("h:mm a") }}
              </v-col>
              <v-col>
                <b>End time</b>
                <br />
                <v-icon left color="primary">calendar_today</v-icon>
                {{ dataList.endTime | moment("MMMM Do YYYY") }}
                <br />
                <v-icon left color="primary">access_time</v-icon>
                {{ dataList.endTime | moment("h:mm a") }}
              </v-col>
            </v-row>
          </v-card-text>
          <template v-if="!edit">
            <v-card-title primary-title>
              <h3 class="headline mb-0">Report</h3>
              <v-spacer></v-spacer>
              <v-btn color="primary" small @click="editReport">
                <v-icon left small>edit</v-icon>Edit
              </v-btn>
            </v-card-title>
            <v-card-text class="pt-0 mt-2 ml-3">
              <render-record :fields="fields" />
            </v-card-text>
          </template>
          <template v-if="dataList.participantMentoringReport != null">
            <template v-if="edit">
              <v-card-title primary-title>
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
        <pre> {{dataList.participantMentoringReport}} </pre>
        <v-divider></v-divider>
        <pre> {{dataList.mentoring.participantMentoringFeedbackForm}} </pre>
        <render-form
          v-if="!tableLoad"
          :modeReload="isReload"
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
          <v-btn text color="red" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      dataList: {
        id: "",
        mentoring: {
          id: "",
          name: "",
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
          }
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
    RenderForm,
    RenderRecord
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
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
            this.edit = false;
            this.isReload = true;
            this.refactorRecordJSON(res.data.data.participantMentoringReport);
            // this.pairFieldValueReport(res.data.data.participantMentoringReport);
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
    editReport() {
      this.edit = true;
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      //   this.leftName = item.mentoring.name;
      this.leftAction = action;
    },
    pairFieldValueReport(data) {
      //https://stackoverflow.com/questions/56444006/how-to-merge-the-property-with-same-key-in-two-object-array?noredirect=1&lq=1
      //String
      var map = new Map(
        data.stringFieldRecords.map(o => [o.stringField.id, o])
      );
      var result = this.dataList.mentoring.participantMentoringFeedbackForm.stringFields.map(
        o => Object.assign({}, o, map.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.stringFields = result;
      // eslint-disable-next-line no-console
      //textarea
      var mapt = new Map(
        data.textAreaFieldRecords.map(o => [o.textAreaField.id, o])
      );
      var resultt = this.dataList.mentoring.participantMentoringFeedbackForm.textAreaFields.map(
        o => Object.assign({}, o, mapt.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.textAreaFields = resultt;
      //integer
      var mapi = new Map(
        data.integerFieldRecords.map(o => [o.integerField.id, o])
      );
      var resulti = this.dataList.mentoring.participantMentoringFeedbackForm.integerFields.map(
        o => Object.assign({}, o, mapi.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.integerFields = resulti;
      //single select / radio
      var mapr = new Map(
        data.singleSelectFieldRecords.map(o => [o.singleSelectField.id, o])
      );
      var resultr = this.dataList.mentoring.participantMentoringFeedbackForm.singleSelectFields.map(
        o => Object.assign({}, o, mapr.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.singleSelectFields = resultr;
      //multi select
      var mapm = new Map(
        data.multiSelectFieldRecords.map(o => [o.multiSelectField.id, o])
      );
      var resultm = this.dataList.mentoring.participantMentoringFeedbackForm.multiSelectFields.map(
        o => Object.assign({}, o, mapm.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.multiSelectFields = resultm;
      //attachment
      var mapa = new Map(
        data.attachmentFieldRecords.map(o => [o.attachmentField.id, o])
      );
      var resulta = this.dataList.mentoring.participantMentoringFeedbackForm.attachmentFields.map(
        o => Object.assign({}, o, mapa.get(o.id))
      );
      this.dataList.mentoring.participantMentoringFeedbackForm.attachmentFields = resulta;
    }
  }
};
</script>