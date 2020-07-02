<template>
  <v-container fluid>
    <v-row v-if="loader">
      <v-col md="12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <render-form
          v-if="!loader"
          :modeReload="isEdit"
          :formTemplate="dataList.worksheetForm"
          @submit-form="submitForm"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      isEdit: false,
      loader: false,
      formId: this.$route.params.formId,
      dataList: {
        worksheetForm: {
          stringFields: [],
          integerFields: [],
          textAreaFields: [],
          attachmentFields: [],
          singleSelectFields: [],
          multiSelectFields: [],
        },
      },
      formTemplate: {
        id: "",
        name: "",
        description: "",
        stringFields: [],
        integerFields: [],
        textAreaFields: [],
        attachmentFields: [],
        singleSelectFields: [],
        multiSelectFields: [],
      },
      user: {},
    };
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "founder");
    if (this.$route.params.profileId) {
      this.isEdit = true;
    }
    this.user = JSON.parse(auth.getAuthData());
  },
  components: {
    RenderForm,
  },
  mounted() {
    this.getFormById();
  },
  methods: {
    getFormById() {
      this.loader = true;
      this.axios
        .get(config.baseUri + "/founder/profile-forms/" + this.formId, {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.formTemplate = res.data.data;
          this.dataList.worksheetForm = res.data.data;
          this.pairFieldValue(this.$store.getters.getProfileRecord);
        })
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    submitForm(params) {
      params["profileFormId"] = this.formTemplate.id;
      this.loader = true;
      this.axios
        .put(config.baseUri + "/founder/profiles/" + this.formId, params, {
          headers: auth.getAuthHeader(),
        })
        .then(() => {
          this.$analytics.logEvent("profile_form", {
            user_id: this.user.data.id,
            form_type: this.formTemplate.name,
          });
          bus.$emit("callNotif", "success", "Form Data Uploaded");
          this.$router.go(-2);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
};
</script>
<style scoped></style>
