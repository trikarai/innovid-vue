<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      md="12"
      class="px-5"
      v-if="dataList.previousMission !== null"
    >
      <v-select
        label="Select Parent Journal"
        :items="parentJournals.list"
        item-text="worksheet.name"
        item-value="id"
        v-model="parentJournalId"
        outlined
      ></v-select>
    </v-col>
    <template>
      <v-col cols="12" md="12" class="px-5">
        <v-btn
          small
          class="ma-2 mt-4 ml-0"
          :color="setColor(!mode)"
          @click="createNewWorksheet"
          :text="mode"
        >
          <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
        </v-btn>
        <v-btn
          small
          class="mt-2"
          @click="createReloadWorksheet"
          :text="!mode"
          :color="setColor(mode)"
        >
          <v-icon left v-if="mode" small>star</v-icon>Reload Existing Worksheet
        </v-btn>
      </v-col>
      <v-col class="px-5 mt-3" md="6" v-if="selectWorksheet">
        <v-select
          class="ml-0"
          v-model="exworksheetId"
          :items="worksheetList.list"
          item-value="id"
          item-text="name"
          label="Existing Worksheet"
          :loading="worksheetListLoad"
          no-data-text="No worksheet available"
          @change="getWorksheetData"
          solo
        ></v-select>
      </v-col>
      <template v-if="!is_newWorksheet">
        <v-col class="my-0 py-0" md="12" v-if="is_reloadWorksheet">
          <v-row>
            <v-col md="6" lg="6" xs="12">
              <v-text-field
                class="mx-5"
                label="Worksheet Name"
                :rules="rulesRequired"
                v-model="worksheetName"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <render-form
            v-if="dataList.worksheetForm"
            :modeReload="reloadTrue"
            :modeAtom="true"
            :formTemplate="dataList.worksheetForm"
            @submit-form="submitForm"
            @assignworksheet="assignWorksheet"
          />
        </v-col>
      </template>

      <v-row class="my-0 py-0" v-if="is_newWorksheet">
        <v-col class="my-0 py-0" md="12">
          <v-row>
            <v-col md="6" lg="6" xs="12">
              <v-text-field
                class="mx-5"
                label="Worksheet Name"
                :rules="rulesRequired"
                v-model="worksheetName"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <render-form
            v-if="!tableLoad2"
            :modeAtom="false"
            :modeReload="reloadFalse"
            :formTemplate="dataList.worksheetForm"
            @submit-form="submitForm"
          />
        </v-col>
      </v-row>
    </template>
  </v-row>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [formDynamicMixins, validationMixins],
  props: {
    tableLoad2: {
      type: Boolean,
      required: true,
    },
    dataListTemp: {
      type: Object,
      required: true,
    },
    loader: {
      type: Boolean,
      required: false,
    },
    branchUri: {
      type: String,
      required: false,
    },
  },
  components: {
    RenderForm,
  },
  data() {
    return {
      dataList: {
        id: "",
        name: "",
        description: "",
        nextMission: { id: "" },
        previousMission: null,
      },
      mode: false,
      reloadFalse: false,
      reloadTrue: true,
      tableLoad: false,
      is_newWorksheet: true,
      is_reloadWorksheet: false,
      selectWorksheet: false,
      worksheetName: "",
      worksheetList: { total: 0, list: [] },
      exworksheetId: "",
      worksheetListLoad: false,
      loadingJournals: false,
      parentJournalId: "",
      parentJournals: { total: 0, list: [] },
      parentUri: "",
    };
  },
  created() {
    this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
    if (this.dataList.previousMission !== null) {
      this.parentUri = "/" + this.parentJournalId;
    } else {
      this.parentJournalId = "";
    }
  },
  watch: {
    parentJournalId() {
      this.parentUri = "/" + this.parentJournalId;
    },
  },
  mounted() {
    if (this.dataList.previousMission !== null) {
      this.getParentJournals();
    }
  },
  methods: {
    getParentJournals() {
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
            params: { missionId: this.dataList.previousMission.id },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.parentJournals = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loadingJournals = false;
        });
    },
    setColor(mode) {
      if (mode) {
        return "primary";
      } else {
        ("grey");
      }
    },
    createNewWorksheet() {
      this.mode = false;
      this.is_newWorksheet = true;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = false;
    },
    createReloadWorksheet() {
      this.mode = true;
      this.exworksheetId = "";
      this.is_newWorksheet = false;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = true;
      this.getWorksheetList();
    },
    getWorksheetList() {
      this.worksheetListLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets?worksheetFormIds[]=" +
            this.dataList.worksheetForm.id +
            // "&programParticipationId=" +
            // this.$route.params.cohortId +
            "&missionIds[]=" +
            this.dataList.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.worksheetList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetListLoad = false;
        });
    },
    getWorksheetData() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      this.is_reloadWorksheet = false;
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.exworksheetId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.worksheetData = res.data.data;
          this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
          this.is_reloadWorksheet = true;
        });
    },
    submitForm(params) {
      this.$emit("update:loader", true);
      params["missionId"] = this.dataList.id;
      params["worksheetFormId"] = this.dataList.worksheetForm.id;
      params["name"] = this.worksheetName;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals_atomic-worksheet" +
            // this.branchUri,
            this.parentUri,
          params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Data Uploaded");
          this.$router.go(-1);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.$emit("update:loader", false);
        });
    },
    assignWorksheet(params) {
      this.$emit("update:loader", true);
      params["missionId"] = this.dataList.id;
      params["worksheetId"] = this.exworksheetId;
      params["name"] = this.worksheetName;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals" +
            // this.branchUri,
            this.parentUri,
          params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          bus.$emit("callNotif", "success", "Worksheet Assigned");
          this.$router.go(-1);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.$emit("update:loader", false);
        });
    },
  },
};
</script>
