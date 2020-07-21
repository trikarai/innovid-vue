<template>
  <v-container fluid="">
    <v-row>
      <v-col cols="12" md="6" lg="12" xs="12">
        <v-card class="pa-3">
          <v-skeleton-loader type="heading" v-if="loadWorksheet" />
          <v-card-title v-else primary-title>
            <template>
              <b>{{ worksheet.name }}</b>
            </template>
          </v-card-title>
          <v-card-text class="subtitle-1">
            <b>Mission</b>
            <br />
            <v-skeleton-loader type="heading" v-if="loadMission" />
            <template v-else>
              {{ mission.name }}
              <br />
              <b>Description</b>
              <br />
              {{ mission.description }}
            </template>
            <br />
          </v-card-text>
          <v-card-text class="subtitle-1">
            <b>Worksheet</b>
            <br />
            <v-skeleton-loader type="heading" v-if="loadMission" />
            <template v-else>
              {{ mission.worksheetForm.name }}
            </template>
          </v-card-text>
          <v-card-actions>
            <template v-if="!updateJ">
              <v-btn
                color="primary"
                small
                v-if="!editWS"
                @click="editWorksheet"
              >
                <v-icon small left>edit</v-icon>Edit Worksheet Record
              </v-btn>
              <v-btn color="warning" small @click="editWS = !editWS" v-else>
                <v-icon small left>cancel</v-icon>Cancel Edit
              </v-btn>
            </template>
          </v-card-actions>
          <v-card-text class="pt-0 mt-2">
            <template v-if="!editWS">
              <render-record :fields="fields" :canvasMode="desc.renderAs" />
            </template>
            <template v-else>
              <render-form
                :modeReload="true"
                :formTemplate="dataList.worksheetForm"
                @submit-form="submitForm"
              />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12">
        <comment-module
          :highlight="$route.params.commentId"
          @gotoHighlight="gotoHighlight"
        ></comment-module>
      </v-col>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
        <div id="comment-module"></div>
      </v-col>
    </v-row>
    <v-overlay :value="worksheetDataLoad">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
// import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  name: "journal-commented",
  mixins: [formDynamicMixins],
  components: {
    RenderRecord,
    RenderForm,
    CommentModule,
  },
  data() {
    return {
      journal: { id: "" },
      loadJournal: false,
      worksheet: { id: "", name: "" },
      worksheetData: { id: "", name: "" },
      loadWorksheet: false,
      mission: {
        id: "",
        name: "",
        description: "",
        worksheetForm: { name: "" },
      },
      dataList: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" },
        worksheetForm: {
          name: "",
        },
      },
      dataListTemp: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" },
      },
      loadMission: false,
      fields: [],
      highlight: null,
      editWS: false,
      updateJ: false,
      worksheetDataLoad: false,
      user: {},
      desc: {
        renderAs: false,
        description: "",
      },
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
    window.sessionStorage.setItem("uploadMode", "team");
    this.getJournal();
  },
  watch: {
    journal() {
      this.getMission();
      this.getWorksheet();
    },
    highlight() {
      this.$vuetify.goTo("#comment-module", {
        offset: 100,
      });
    },
  },
  mounted() {},
  methods: {
    checkRenderMode() {
      let tempObj = JSON.parse(this.missionTemp.worksheetForm.description);
      if (tempObj.hasOwnProperty("renderAs")) {
        this.desc = JSON.parse(this.missionTemp.worksheetForm.description);
      } else {
        this.desc.renderAs = false;
      }
    },
    getJournal() {
      this.loadJournal = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.$route.params.journalId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journal = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loadJournal = false;
        });
    },
    getWorksheet() {
      this.loadWorksheet = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.journal.worksheet.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.worksheet = res.data.data;
          this.worksheetData = JSON.parse(JSON.stringify(res.data.data));
          this.refactorRecordJSON(res.data.data);
          // this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.loadWorksheet = false;
        });
    },
    getMission() {
      this.loadMission = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/by-id/" +
            this.journal.mission.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.mission = res.data.data;
          this.missionTemp = JSON.parse(JSON.stringify(res.data.data));
          this.dataList = JSON.parse(JSON.stringify(res.data.data));
          this.checkRenderMode();
        })
        .catch(() => {})
        .finally(() => {
          this.loadMission = false;
        });
    },
    gotoHighlight(highlight) {
      this.highlight = highlight;
    },
    editWorksheet() {
      this.editWS = true;
      this.updateJ = false;
      this.pairFieldValue(this.worksheetData);
    },
    submitForm(params) {
      this.worksheetDataLoad = true;
      params["name"] = this.worksheet.name;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.worksheet.id,
          params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.$mixpanel.track("edit_worksheet", {
            founder_id: this.user.data.id,
            team_id: this.$route.params.teamId,
            worksheet_id: this.journal.worksheet.id,
            form_type: this.dataList.worksheetForm.name,
            page: "commment",
          });
          this.$analytics.logEvent("edit_worksheet", {
            founder_id: this.user.data.id,
            team_id: this.$route.params.teamId,
            worksheet_id: this.journal.worksheet.id,
            form_type: this.dataList.worksheetForm.name,
            page: "comment",
          });
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    refreshData() {
      this.fields = [];
      this.editWS = false;
      this.updateJ = false;
      this.getWorksheet();
    },
  },
};
</script>

<style></style>
