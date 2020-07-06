<template>
  <v-container extend grid-list-xs>
    <v-row>
      <h5 class="container">
        *Ask your partners to sign up first, then add them to this startup using
        this form
      </h5>
    </v-row>
    <v-row>
      <v-col md="4" xs="12">
        <v-text-field
          autocomplete="email"
          v-model="search"
          append-icon="search"
          label="Search by email"
          outlined
          :rules="rulesEmail"
        ></v-text-field>
        <br />
        <v-btn small @click="getTalent">search</v-btn>
      </v-col>
      <v-col md="12" xs="12" v-if="!async">
        <v-chip
          v-show="incubatee === null"
          class="caption"
          color="warning"
          dark
          small
          >No talent found</v-chip
        >
        <v-chip
          v-show="incubatee != null"
          class="caption"
          color="accent"
          dark
          small
          >Talent found</v-chip
        >
      </v-col>
    </v-row>
    <v-row v-if="async">
      <v-col>
        <v-progress-circular
          indeterminate
          color="primary"
          size="100"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="incubatee !== null">
      <v-col md="4" v-if="!async">
        <v-card class="pa-5">
          <v-card-text>
            <p>
              <b>Name</b>
              <br />
              {{ incubatee.name }}
            </p>
            <p>
              <b>Email</b>
              <br />
              {{ incubatee.email }}
            </p>
          </v-card-text>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="position"
                :rules="rulesRequired"
                :counter="10"
                label="Position"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              @click="validate"
              :class="{ 'primary white--text': valid }"
              :disabled="!valid"
              max-width="350"
            >
              <v-icon left>how_to_reg</v-icon>Invite to Team
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import bus from "@/config/bus";

import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      valid: false,
      isTyping: false,
      position: "",
      search: "",
      async: false,
      incubatee: null,
      loader: false,
      dialog: false,
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      user: {},
    };
  },
  watch: {
    // search: this._.debounce(function() {
    //   this.isTyping = false;
    // }, 1000),
    // isTyping: function(value) {
    //   if (!value) {
    //     this.getTalent();
    //   }
    // }
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
  },
  mounted() {},
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        this.inviteTalent();
      }
    },
    getTalent() {
      this.async = true;
      this.axios
        .get(
          config.baseUri + "/founder/founders?email=" + encodeURI(this.search),
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data) {
            this.incubatee = res.data.data;
          } else {
            this.incubatee = null;
          }
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.async = false;
        });
    },
    inviteTalent() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/member-candidates",
          { founderId: this.incubatee.id, position: this.position },
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.$mixpanel.track("invite_member", {
            founder_id: this.user.data.id,
            invited_id: this.incubatee.id,
          });
          this.$analytics.logEvent("invite_member", {
            founder_id: this.user.data.id,
            invited_id: this.incubatee.id,
          });
          bus.$emit("callNotif", "info", "Invitation Sent");
          this.$router.got(-1);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
};
</script>
<style scoped></style>
