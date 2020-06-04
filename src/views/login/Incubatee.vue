<template>
  <v-app>
    <v-container fluid fill-height id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4" class="text-xs-center">
          <v-toolbar class="pt-2" color="primary">
            <v-toolbar-title class="white--text ml-2">
              <h4>
                Inov
                <v-chip color="accent">ide</v-chip>
              </h4>
            </v-toolbar-title>
            <v-toolbar-title class="ml-auto">
              <router-link v-bind:to="'/'">
                <v-icon class="white--text mb-2 ml-3">home</v-icon>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>
          <v-card style="padding:20px 30px 30px 30px;" class="text-center elevation-12">
            <v-card-text style="pa-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col>
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
                      @click="submit"
                      :loading="loader"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      color="#e4e4e4"
                      style="color:#fff"
                    >Login</v-btn>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn
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
        .post(config.baseUri + "/incubatee-login", this.params)
        .then(res => {
          this.$store.state.isLoggedIn = true;
          this.response = res.data.data;
          authUser.role = "INCUBATEE";
          authUser.data = res.data.data;
          authUser.token = res.data.credentials.token;
          authUser.valid_until = res.data.credentials.valid_until;
          window.localStorage.setItem("lbUser", JSON.stringify(authUser));

          this.$router.replace("/incubatee/main");
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
  background-image: url("https://picsum.photos/1080/720?grayscale");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
<<<<<<< Updated upstream
=======
#accentlg {
  position: relative;
}

#accentlg:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 20px solid #00667f;
  border-left: 20px solid #fff;
  width: 50%;
}
</style>

<style>
span.v-chip__content {
  margin: 0 auto;
}
.pertikal {
  /* position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%) */
  margin-top: calc(3% + 5px) !important;
}
>>>>>>> Stashed changes
</style>
