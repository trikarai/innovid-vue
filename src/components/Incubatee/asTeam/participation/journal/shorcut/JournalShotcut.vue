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
          <v-card-text class="pt-0 mt-2">
            <render-record
              :fields="fields"
              :canvasMode="mission.worksheetForm.description"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              small
              color="primary"
              :to="{
                name: 'journal-detail-1',
                params: {
                  teamId: $route.params.teamId,
                  cohortId: $route.params.cohortId,
                  missionId: mission.id,
                  journalId: journal.id,
                  worksheetId: worksheet.id,
                },
              }"
            >
              <v-icon small left>edit</v-icon>Make change ?</v-btn
            >
          </v-card-actions>
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
  </v-container>
</template>

<script>
// import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  name: "journal-commented",
  mixins: [formDynamicMixins],
  components: {
    RenderRecord,
    CommentModule,
  },
  data() {
    return {
      journal: { id: ""},
      loadJournal: false,
      worksheet: { id: "", name: "" },
      loadWorksheet: false,
      mission: { id: "", name: "", worksheetForm: { name: "" } },
      loadMission: false,
      fields: [],
      highlight: null,
    };
  },
  created() {
    this.getJournal();
  },
  watch: {
    journal() {
      this.getWorksheet();
      this.getMission();
    },
    highlight() {
      this.$vuetify.goTo("#comment-module", {
        offset: 100,
      });
    },
  },
  mounted() {},
  methods: {
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
          this.refactorRecordJSON(res.data.data);
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
        })
        .catch(() => {})
        .finally(() => {
          this.loadMission = false;
        });
    },
    gotoHighlight(highlight) {
      this.highlight = highlight;
    },
  },
};
</script>

<style></style>
