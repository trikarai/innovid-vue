<template>
  <v-row no-gutters>
    <v-col>
      <v-row>
        <v-col cols="12" md="6" lg="6" xs="12">
          <v-text-field
            label="Worksheet Name"
            :rules="rulesRequired"
            v-model="worksheetName"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <render-form
        :modeReload="true"
        :formTemplate.sync="worksheetForm"
        @submit-form="submitForm"
      />
      <!-- <pre>{{ worksheetForm }}</pre> -->
    </v-col>
  </v-row>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import RenderForm from "@/components/buildform/incubatee/renderForm";

import { validationMixins } from "@/mixins/validationMixins";

export default {
  components: { RenderForm },
  mixins: [validationMixins],
  props: {
    worksheetForm: {
      type: Object,
    },
    worksheetId: {
      type: String,
      required: true,
    },
    name: { type: String },
    // loader: {
    //   type: Boolean,
    // },
  },
  data() {
    return {
      worksheetName: "",
      user: {},
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
    this.worksheetName = this.name;
  },
  methods: {
    submitForm(params) {
      // this.$emit("update:loader", true);
      bus.$emit("UpdateWorksheet");
      params.missionId = this.$route.params.missionId;
      params.name = this.worksheetName;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.worksheetId,
          params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.$analytics.logEvent("edit_worksheet", {
            founder_id: this.user.data.id,
            team_id: this.$route.params.teamId,
            worksheet_id: this.worksheetId,
            form_type: this.worksheetForm.name,
            page: "mission"
          });
          bus.$emit("callNotif", "success", "Worksheet Data Updated");
          this.$router.go(-1);
        })
        .catch((err) => {
          bus.$emit("callNotif", "error", err);
        })
        .finally(() => {});
    },
  },
};
</script>

<style></style>
