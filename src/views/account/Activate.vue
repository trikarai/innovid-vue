<template>
  <v-app>
    <v-container fluid fill-height id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4" class="text-xs-center">
          <v-card style="padding:20px 30px 30px 30px;" class="text-center elevation-12">
            <!-- <v-card-text v-if="!loader"
              style="pa-4"
            >{{params.incubatorIdentifier}} - {{params.email}} -  {{params.token}}
            </v-card-text> -->
            <v-card-text v-if="loader">
              <v-row>
                <v-col md="12">
                  <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
                </v-col>
                <v-col>Please Wait...</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="issuccess">
              <v-row>
                <v-col md="12">
                  <v-icon color="primary" size="150">check</v-icon>
                </v-col>
                <v-col md="12">Your account has been activated successfully. You can now login.</v-col>
                <v-col>
                  <v-btn
                    block
                    color="primary"
                    router
                    :to="'/login/' + params.incubatorIdentifier "
                  >Login</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="iserror">
              <v-col md="12">
                <v-icon color="red" size="150">mood_bad</v-icon>
              </v-col>
              <v-col md="12">there is something wrong happened</v-col>
              <v-col class="red--text text-darken-2">{{err_msg}}</v-col>
              <v-col class="red--text text-darken-2">{{err_msg.response.data.meta.error_detail}}</v-col>
              <v-col>
                <v-btn
                  block
                  color="accent"
                  router
                  :to="'/request-activation/' + params.incubatorIdentifier + '/' + params.email"
                >Request Re-Activation Code</v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";

export default {
  data() {
    return {
      params: {
        incubatorIdentifier: this.$route.params.incubatorIdentifier,
        email: this.$route.params.email,
        token: this.$route.params.token
      },
      err_msg: "error",
      loader: false,
      issuccess: false,
      iserror: false
    };
  },mounted () {
      this.activateAccount();
  },
  methods: {
    activateAccount() {
      this.loader = true;
      this.axios
        .patch(config.baseUri + "/incubatee-account/activate", this.params)
        .then(() => {
          this.issuccess = true;
          this.iserror = false;
        })
        .catch(res => {
          this.err_msg = res;
          bus.$emit("callNotif", "error", res);
          this.issuccess = false;
          this.iserror = true;
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
#loginpage {
  background-image: url("https://picsum.photos/1080/720?grayscale");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
</style>
