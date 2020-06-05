<template>
  <v-container extend grid-list-xs v-scroll:throttle="{fn: onScroll, throttle: 500 }">
    <!-- build form module-->
    <!-- {{position}} -->
    <buildform-module @postform="postform" :edit="edit" :formtype="formtype" />
    <!-- -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- {{position}} -->
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
      overlay: false,
      edit: false,
      formtype: "profile-forms",
      position: { scrollTop: 0, scrollLeft: 0 }
    };
  },
  components: {
    BuildformModule
  },
  created() {
    if (this.$route.params.formId) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  },
  methods: {
    onScroll: function(e, position) {
      this.position = position;
    },
    postformtest(params) {
      alert(params);
      this.overlay = true;
    },
    postform(params) {
      this.overlay = true;
      if (this.edit) {
        this.axios
          .patch(
            config.baseUri +
              "/personnel/as-admin/profile-forms/" +
              this.$route.params.formId,
            params,
            {
              headers: auth.getAuthHeader()
            }
          )
          .then(() => {
            bus.$emit("resetField");
            bus.$emit("callNotif", "success", "Form Updated");
          })
          .catch(res => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.overlay = false;
          });
      } else {
        this.axios
          .post(config.baseUri + "/personnel/as-admin/profile-forms", params, {
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
  }
};
</script>
<style scoped>
</style>