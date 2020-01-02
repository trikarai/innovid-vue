<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="12">
        <v-progress-circular v-if="loader" indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <render-form v-if="!loader" :formTemplate="formTemplate" @submit-form="submitForm" />
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import RenderForm from "@/components/buildform/incubatee/renderForm";

export default {
  data() {
    return {
      loader: false,
      formId: this.$route.params.formId,
      formTemplate: {
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
    };
  },
  components: {
    RenderForm
  },
  mounted() {
    this.getFormById();
  },
  methods: {
    getFormById() {
      this.loader = true;
      this.axios
        .get(config.baseUri + "/incubatee/profile-forms/" + this.formId, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.formTemplate = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    submitForm(params) {
      this.loader = true;
      this.axios
        .post(config.baseUri + "/incubatee/profiles", params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          bus.$emit("callNotif", "success", "Form Data Uploaded");
          this.$router.go(-2);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
</style>