<template>
  <v-app>
    <v-container fluid id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="10" sm="8" md="4" lg="4" style="width:80%" class="text-xs-center ma-12 pa-0 elevation-6">
          <v-toolbar class="pt-0" color="primary">
            <v-toolbar-title class="white--text ml-2">
              <h4>
                login
                <!-- <v-chip style="width:45px;" color="#e4e4e4"><span style="color:#777777;">id</span></v-chip> -->
              </h4>
            </v-toolbar-title>
            <v-toolbar-title class="ml-auto">
              <router-link v-bind:to="'/'">
                <v-icon class="white--text mb-2 ml-3">home</v-icon>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>
          <v-card id="accentlg" style="padding:20px 30px 0px 30px;" class="text-center elevation-0">
            <v-card-text class="pa-8">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>                  
                      <v-text-field
                        outlined
                        label="Incubator Identifier"
                        v-model="params.incubatorIdentifier"
                        :rules="rulesName"
                        required
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        outlined
                        label="Email"
                        v-model="params.email"
                        autocomplete="email"
                        :rules="rulesEmail"
                        required
                      ></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field
                        autocomplete="current-password"
                        label="Password"
                        outlined
                        v-model="params.password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :type="e1 ? 'password' : 'text'"
                        :rules="rulesPassword"
                        counter
                        required
                        @click:append="e1 = !e1"
                        v-on:keyup.enter="submit"
                      ></v-text-field>
                  </v-row>
                  <v-row justify-end class="mt-2">
                    <v-col class="mt-2"></v-col>
                    <v-btn
                      block
                      @click="submit"
                      :loading="loader"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      color="#e4e4e4"
                      style="color:#fff"
                      large
                    >Login</v-btn>
                  </v-row>
                  <v-row class="mt-3">
                    <v-col>
                      <v-btn
                        class="grey--text"
                        text
                        x-small
                        router
                        :to="'/forgot-password/' + params.incubatorIdentifier"
                      >forgot password?</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
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
  name: "Login Incubatee",
  data: function() {
    return {
      loader: false,
      response: "",
      valid: true,
      alert: false,
      e1: true,
      params: {
        incubatorIdentifier: this.$route.params.identifier,
        email: "",
        password: ""
      },
      activate: false
    };
  },
  created: function() {},
  mounted: function() {},
  components: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login: function() {
      this.loader = true;
      var authUser = {};
      this.axios
        .post(config.baseUri + "/founder-login", this.params)
        .then(res => {
          this.$store.state.isLoggedIn = true;
          this.response = res.data.data;
          authUser.role = "INCUBATEE";
          authUser.data = res.data.data;
          authUser.token = res.data.credentials.token;
          authUser.valid_until = res.data.credentials.valid_until;
          window.localStorage.setItem("lbUser", JSON.stringify(authUser));

          this.$router.replace("/incubatee/dashboard");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
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

<style>
span.v-chip__content {
    margin: 0 auto;
}
</style>
