<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col xs="12" md="5">
        <v-form ref="form1" v-model="valid1">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{$vuetify.lang.t('$vuetify.profile.profile')}}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="profiles.name"
                :rules="rulesName"
                counter
              ></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="profiles.email"
                :rules="rulesEmail"
              >
                <template v-slot:append-outer>
                  <v-fade-transition leave-absolute>
                    <!-- <v-progress-circular v-if="loaderEmail" size="24" color="info" indeterminate></v-progress-circular> -->
                    <v-btn icon @click="getSingleDetail">
                      <v-icon :class="{rotating : loaderEmail}">sync</v-icon>
                    </v-btn>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="validateProfile"
                :loading="loaderProfile"
                :class=" { 'primary white--text' : valid1}"
                :disabled="!valid1"
                block
              >{{$vuetify.lang.t('$vuetify.action.update')}} {{$vuetify.lang.t('$vuetify.profile.profile')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col xs="12" md="5">
        <v-form v-model="valid2" ref="form2">
          <v-card :loading="loaderPass">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{$vuetify.lang.t('$vuetify.profile.password')}}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="password.previousPassword"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :type="show1 ? 'text' : 'password'"
                name="Previous Password"
                :rules="rulesPassword"
                autocomplete="current-password"
                :label="$vuetify.lang.t('$vuetify.profile.previousPassword')"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="password.newPassword"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :type="show2 ? 'text' : 'password'"
                name="New Password"
                :rules="rulesPassword"
                autocomplete="new-password"
                :label="$vuetify.lang.t('$vuetify.profile.newPassword')"
                hint="At least 8 characters"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
              <v-text-field
                label="Confirm New Password"
                v-model="cpassword"
                min="8"
                :append-icon="e2 ? 'visibility' : 'visibility_off'"
                @click:append="e2 = !e2"
                :type="e2 ? 'text' : 'password'"
                :rules="rulesChangePasswordConfirmation"
                autocomplete="new-password"
                counter
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="validatePassword"
                :loading="loaderPass"
                :class=" { 'primary white--text' : valid2}"
                :disabled="!valid2"
                block
              >{{$vuetify.lang.t('$vuetify.action.update')}} {{$vuetify.lang.t('$vuetify.profile.password')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import { validationMixins } from "@/mixins/validationMixins";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  mixins: [validationMixins],
  data() {
    return {
      show1: false,
      show2: false,
      e2: false,
      valid1: false,
      valid2: false,
      password: {
        previousPassword: "",
        newPassword: ""
      },
      profiles: {
        name: "",
        email: ""
      },
      cpassword: "",
      loaderPass: false,
      loaderProfile: false,
      loaderEmail: false
    };
  },
  mounted() {
    var authData = JSON.parse(auth.getAuthData());
    this.profiles.name = authData.data.name;
  },
  methods: {
    validatePassword() {
      if (this.$refs.form2.validate()) {
        this.updatePassword();
      }
    },
    updatePassword() {
      this.loaderPass = true;
      this.axios
        .patch(config.baseUri + "/sys-admin/change-password", this.password, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          bus.$emit("callNotif", "success", "Password Updated");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.$refs.form2.reset();
          this.loaderPass = false;
        });
    },
    validateProfile() {
      if (this.$refs.form1.validate()) {
        this.updateProfile();
      }
    },
    updateProfile() {
      this.loaderProfile = true;
      this.axios
        .patch(config.baseUri + "/sys-admin/update-profile", this.profiles, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          bus.$emit("callNotif", "success", "Profile Updated");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.$refs.form1.reset();
          this.loaderProfile = false;
        });
    },
    getSingleDetail() {
      this.loaderEmail = true;
      var authData = JSON.parse(auth.getAuthData());
      this.axios
        .get(config.baseUri + "/sys-admin/sys-admins/" + authData.data.id, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.profiles = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderEmail = false;
        });
    }
  }
};
</script>
<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}
</style>