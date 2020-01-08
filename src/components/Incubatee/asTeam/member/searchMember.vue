<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="4" xs="12">
        <v-text-field
          autocomplete="email"
          v-model="search"
          append-icon="search"
          label="Search by email"
          outlined
          :rules="rulesEmail"
          @input="isTyping = true"
        ></v-text-field>
      </v-col>
      <v-col md="12" xs="12" v-if="!async">
        <v-chip
          v-show="incubatee === null"
          class="caption"
          color="warning"
          dark
          small
        >No talent found</v-chip>
        <v-chip v-show="incubatee != null" class="caption" color="accent" dark small>Talent found</v-chip>
      </v-col>
    </v-row>
    <v-row v-if="async">
      <v-col>
        <v-progress-circular indeterminate color="primary" size="100"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="incubatee !== null">
      <v-col md="4" v-if="!async">
        <v-card>
          <v-card-text>
            <p>{{incubatee.name}}</p>
            <p>{{incubatee.email}}</p>
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
              @click="validate"
              :class=" { 'primary white--text' : valid}"
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
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

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
      leftAction: ""
    };
  },
  watch: {
    search: Vue._.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.getTalent();
      }
    }
  },
  created() {},
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
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data) {
            this.incubatee = res.data.data;
          } else {
            this.incubatee = null;
          }
        })
        .catch(res => {
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
          bus.$emit("callNotif", "info", "Invitation Sent");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
</style>