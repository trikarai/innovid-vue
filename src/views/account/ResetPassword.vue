<template>
  <v-app>
    <v-container fluid fill-height id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4" class="text-xs-center">
          <v-card style="padding:20px 30px 30px 30px;" class="text-center elevation-12">
            <!-- <v-card-text
              v-if="!loader"
              style="pa-4"
            >{{params.incubatorIdentifier}} - {{params.email}} - {{params.resetPasswordCode}}</v-card-text> -->
            <v-card-text v-if="!issuccess">
              <v-form v-model="valid" ref="form">
                <v-row>
                  <v-col>
                    <v-text-field
                      autocomplete="new-password"
                      label="Password"
                      prepend-icon="lock"
                      v-model="signup.password"
                      :rules="rulesPassword"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :type="e1 ? 'password' : 'text'"
                      counter
                      required
                      @click:append="e1 = !e1"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      autocomplete="confirm-password"
                      label="Confirm Password"
                      prepend-icon="lock"
                      v-model="cpassword"
                      :rules="rulesPasswordConfirmation"
                      min="8"
                      :append-icon="e2 ? 'visibility' : 'visibility_off'"
                      :type="e2 ? 'password' : 'text'"
                      counter
                      required
                      @click:append="e2 = !e2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify-end class="mt-2">
                  <v-col class="mt-2"></v-col>
                  <v-btn
                    @click="submit"
                    block
                    :loading="loader"
                    :class=" { 'primary white--text' : valid}"
                    :disabled="!valid"
                    color="primary"
                    style="color:#fff"
                  >Sign Up</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-text v-if="issuccess">
              <v-row>
                <v-col md="12">
                  <v-icon color="primary" size="150">check</v-icon>
                </v-col>
                <v-col md="12">Your password has been change successfully. You can now login.</v-col>
                <v-col>
                  <v-btn
                    block
                    color="primary"
                    router
                    :to="'/login/' + signup.incubatorIdentifier "
                  >Login</v-btn>
                </v-col>
              </v-row>
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
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      menu: false,
      e1: true,
      e2: true,
      valid: false,
      signup: {
        incubatorIdentifier: this.$route.params.incubatorIdentifier,
        email: this.$route.params.email,
        resetPasswordCode: this.$route.params.token,
        password: ""
      },
      cpassword: "",
      err_msg: "error",
      loader: false,
      issuccess: false,
      iserror: false
    };
  },
  mounted() {},
  methods: {
    resetPassword() {
      this.loader = true;
      this.axios
        .patch(
          config.baseUri + "/incubatee-account/reset-password",
          this.signup
        )
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
