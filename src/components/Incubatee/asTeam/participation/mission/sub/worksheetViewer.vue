<template>
  <v-row>
    <v-col cols="12" lg="4">
      <v-select
        :loading="loadingJournals"
        :items="journals.list"
        item-text="worksheet.name"
        v-model="journal"
        label="Worksheet"
        outlined
        return-object
      ></v-select>
      <!-- {{ journal }} -->
    </v-col>
    <v-col cols="12" lg="2">
      <v-btn class="mt-4" small color="primary" @click="addNewWorksheet"
        >Add New</v-btn
      >
    </v-col>
    <v-col cols="12" lg="12" md="12">
      <v-card-text v-if="loadingSelectedWorksheet">
        <v-skeleton-loader type="card" />
      </v-card-text>
      <v-card-text v-if="!loadingSelectedWorksheet">
        <template v-if="!editWS">
          <span class="title mb-3">{{ worksheet.name }}</span>
          <render-record :fields="fields" :canvasMode="desc.renderAs" />
          <!-- <pre>{{ worksheet }}</pre> -->
        </template>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import auth from "@/config/auth";
import * as config from "@/config/config";

import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  components: {
    RenderRecord,
  },
  props: {
    isNewWorksheet: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingJournals: false,
      loadingSelectedWorksheet: false,
      journals: { total: 0, list: [] },
      journal: {},
      worksheet: "",
      editWS: false,
      fields: [],
      desc: {
        renderAs: false,
        description: "",
      },
    };
  },
  watch: {
    journal: "getSelectedWorksheet",
    // missionId: "getJournals"
  },
  mounted() {
    this.getJournals();
  },
  methods: {
    getJournals() {
      this.loadingJournals = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals",
          {
            params: { missionId: this.$route.params.missionId },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journals = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loadingJournals = false;
        });
    },
    addNewWorksheet() {
      this.$emit("update:isNewWorksheet", true);
    },
    getSelectedWorksheet() {
      this.fields = [];
      this.loadingSelectedWorksheet = true;
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
          this.loadingSelectedWorksheet = false;
        });
    },
    refresh() {
      this.getJournals();
    },
  },
};
</script>

<style></style>
