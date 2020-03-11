<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- col 1 record -->
      <v-col cols="12" md="6" lg="6" xs="12" v-if="dataLoad">
        <v-skeleton-loader type="card-heading, card-heading, list-item-avatar-two-line@3"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="!dataLoad">
        <v-card class="pa-3 pb-0">
          <v-card-title primary-title>
            <b>{{journalDetail.mission.name}}</b>
          </v-card-title>
          <v-card-text class="subtitle-1">
            <b>Worksheet Form</b><br>
            {{journalDetail.worksheet.worksheetForm.name}}
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-text class="pt-7 pt-0">
            <render-record :fields="fields" />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- col 2 comment -->
      <v-col md="6">
        <comment-module></comment-module>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      dataLoad: false,
      journalDetail: {},
      fields: []
    };
  },
  components: {
    RenderRecord,
    CommentModule
  },
  mounted() {
    this.getJournalDetail();
  },
  methods: {
    getJournalDetail() {
      this.dataLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.$route.params.journalId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.journalDetail = res.data.data;
          this.refactorRecordJSON(res.data.data.worksheet);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.dataLoad = false;
        });
    }
  }
};
</script>