<template>
  <v-app>
    <v-container fluid fill-height id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4" class="text-xs-center">
          <v-toolbar class color="primary">
            <v-toolbar-title class="white--text ml-2">
              <h4>
                Login
                <v-chip color="#fafafa">personnel</v-chip>
              </h4>
            </v-toolbar-title>
            <v-toolbar-title class="ml-auto">
              <router-link v-bind:to="'/'">
                <v-icon class="white--text mb-2 ml-3">home</v-icon>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>
          <v-card
            style="padding:20px 30px 30px 30px;"
            class="text-center elevation-12"
          >
            <v-card-text style="pa-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col v-if="isProduction">
                      <v-text-field
                        label="Incubator Identifier"
                        prepend-icon="vpn_key"
                        v-model="params.incubatorIdentifier"
                        :rules="rulesName"
                        :disabled="!isMain"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col v-else>
                      <v-text-field
                        label="Incubator Identifier"
                        prepend-icon="vpn_key"
                        v-model="params.incubatorIdentifier"
                        :rules="rulesName"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Email"
                        prepend-icon="email"
                        v-model="params.email"
                        autocomplete="email"
                        :rules="rulesEmail"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        autocomplete="current-password"
                        label="Password"
                        prepend-icon="lock"
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
                    </v-col>
                  </v-row>
                  <v-row justify-end class="mt-2">
                    <v-col class="mt-2"></v-col>
                    <v-btn
                      block
                      @click="submit"
                      :loading="loader"
                      :class="{ 'primary white--text': valid }"
                      :disabled="!valid"
                      color="#e4e4e4"
                      style="color:#fff"
                      >Login</v-btn
                    >
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
import { checkDomainMixins } from "./checkDomainMixins";

export default {
  mixins: [validationMixins, checkDomainMixins],
  name: "Login-Personnel",
  data: function() {
    return {
      loader: false,
      response: "",
      valid: true,
      alert: false,
      e1: true,
      params: {
        incubatorIdentifier: "",
        email: "",
        password: "",
      },
      activate: false,
      isProduction: false,
    };
  },
  created: function() {
    if (process.env.NODE_ENV === "production") {
      this.isProduction = true;
    }
  },
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
        .post(config.baseUri + "/personnel-login", this.params)
        .then((res) => {
          this.$store.state.isLoggedIn = true;
          this.response = res.data.data;
          authUser.role = "PERSONNEL";
          authUser.data = res.data.data;
          authUser.token = res.data.credentials.token;
          authUser.valid_until = res.data.credentials.valid_until;
          window.localStorage.setItem("lbUser", JSON.stringify(authUser));
          window.sessionStorage.setItem("uploadMode", "personnel");
          this.$router.replace("/personnel/account");
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
#loginpage {
  /* background-image: url("https://picsum.photos/1080/720?grayscale"); */
  background-color: #fff;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
</style>
