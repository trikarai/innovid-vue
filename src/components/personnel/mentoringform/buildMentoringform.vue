<template>
  <v-container grid-list-xs>
    <!-- build form module-->
    <buildform-module @postform="postform" />
    <!-- -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import bus from "@/config/bus";

import auth from "@/config/auth";
import * as config from "@/config/config";

import BuildformModule from "@/components/buildform/BuildForm";

export default {
  data() {
    return {
      key: "",
      loader: false,
      overlay: false
    };
  },
  components: {
    BuildformModule
  },
  methods: {
    postformtest(params) {
      alert(params);
      this.overlay = true;
    },
    postform(params) {
      this.overlay = true;
      this.axios
        .post(config.baseUri + "/personnel/as-admin/mentoring-feedback-forms", params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          bus.$emit("resetField");
          bus.$emit("callNotif", "success", "Form Created");
          // this.resetField();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.overlay = false;
        });
    }
  }
};
</script>
<style scoped>
</style>