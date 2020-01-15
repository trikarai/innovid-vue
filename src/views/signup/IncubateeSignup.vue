<template>
  <v-app>
    <v-container fluid id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="6" lg="4" class="text-xs-center mt-3">
          <v-toolbar class="pt-0" color="primary">
            <v-toolbar-title class="white--text ml-2">
              <h4>
                Registration
                <!-- <v-chip style="width:45px;" color="#e4e4e4"><span style="color:#777777;">id</span></v-chip> -->
              </h4>
            </v-toolbar-title>
            <v-toolbar-title class="ml-auto">
              <router-link v-bind:to="'/'">
                <v-icon class="white--text mb-2 ml-3">home</v-icon>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>
          <v-card id="accentlg" style="padding:20px 30px 30px 30px;" class="text-center elevation-0">
            <v-card-text style="pa-4" v-if="!issuccess">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                      <v-text-field
                        outlined
                        label="Incubator Identifier"
                        v-model="signup.incubatorIdentifier"
                        :rules="rulesName"
                        required
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        outlined
                        label="Name"
                        autocomplete="name"
                        v-model="signup.name"
                        :rules="rulesName"
                        autofocus
                        required
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        outlined
                        autocomplete="new-password"
                        label="Password"
                        v-model="signup.password"
                        :rules="rulesPassword"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :type="e1 ? 'password' : 'text'"
                        counter
                        required
                        @click:append="e1 = !e1"
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        outlined
                        autocomplete="confirm-password"
                        label="Confirm Password"
                        v-model="cpassword"
                        :rules="rulesPasswordConfirmation"
                        min="8"
                        :append-icon="e2 ? 'visibility' : 'visibility_off'"
                        :type="e2 ? 'password' : 'text'"
                        counter
                        required
                        @click:append="e2 = !e2"
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        outlined
                        label="Email"
                        autocomplete="email"
                        v-model="signup.email"
                        :rules="rulesEmail"
                        required
                      ></v-text-field>
                  </v-row>

                  <v-row justify-end class="mt-2">
                    <v-col class="mt-2"></v-col>
                    <!-- <vue-recaptcha @verify="onVerify" @expired="onExpired" v-bind:sitekey="sitekey"> -->
                      <v-btn
                        @click="submit"
                        block
                        :loading="signupLoader"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="primary"
                        style="color:#fff"
                      >register</v-btn>
                    <!-- </vue-recaptcha> -->
                  </v-row>
                </v-form>
              </div>
            </v-card-text>
            <v-card-text v-else>
              <v-row>
                <v-col md="12">
                  <v-icon color="primary" size="150">mood</v-icon>
                </v-col>
                <v-col md="12" class="title">Registration Completed Successfully</v-col>
                <v-col md="12">
                  <p>
                    Before you can login, you must active your account with the code sent to your email address.
                    <i>(take a few minutes)</i>
                  </p>
                  <p>
                    If you did not receive this email, please check your junk/spam folder.
                    Click
                    <router-link
                      :to="{ path: '/request-activation/' + signup.incubatorIdentifier }"
                    >here</router-link> to resend the activation email.
                  </p>
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
// import VueRecaptcha from "vue-recaptcha";

export default {
  mixins: [validationMixins],
  name: "Incubatee Signup",
  data: function() {
    return {
      menu: false,
      e1: true,
      e2: true,
      valid: false,
      sitekey: "6Ld47ZMUAAAAAM26YnKZuHXc6jfWKnM6xRW2eY4b",
      signupLoader: false,
      regionLoader: false,
      regionList: { total: 0, list: [] },
      cpassword: "",
      signup: {
        password: "",
        incubatorIdentifier: this.$route.params.incubatorIdentifier,
        name: "",
        email: ""
      },
      issuccess: false
    };
  },
  watch: {
    // menu(val) {
    //   val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    // }
  },
  created: function() {},
  mounted: function() {},
  components: {
    // VueRecaptcha
  },
  methods: {
    onSubmit: function() {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify: function() {
      // console.log("Verify: " + response);
    },
    onExpired: function() {
      // console.log("Expired");
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset(); // Direct call reset method
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.signupAct();
      }
    },
    signupAct: function() {
      this.signupLoader = true;
      this.axios
        .post(config.baseUri + "/founder-signup", this.signup)
        .then(() => {
          // this.$router.push({ path: "/login", query: { activate: true } });
          this.issuccess = true;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.signupLoader = false;
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
#loginpage {
  /* background-image: url("https://picsum.photos/1080/720?grayscale"); */
  background-color: #e8e8e8;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
#accentlg {
  position: relative;
}

#accentlg:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-top: 20px solid #249c90 ;
  border-left: 20px solid #fff;
  width: 50%;
}
</style>
