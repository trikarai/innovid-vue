<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="12">
        <v-progress-circular v-if="loader" indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="6">
        <render-form v-if="!loader" :formTemplate="formTemplate" @submit-form="submitForm" />
      </v-col>
    </v-row>

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
      teamId: this.$route.params.teamId,
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
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
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
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/team-profile-forms/" +
            this.formId,
          {
            headers: auth.getAuthHeader()
          }
        )
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
        .put(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/profiles/" +
            this.formId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
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