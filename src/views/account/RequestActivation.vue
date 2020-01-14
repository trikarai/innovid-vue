<template>
  <div>
    <v-container v-if="!isSuccess">
      <v-form class="mt-5" ref="form1" v-model="valid">
        <v-row>
          <v-col cols="12" sm="4">
          
          </v-col>
          <v-col cols="12" sm="4">
          <v-row style="display:block" class="ma-5">
            <v-text class="title">Lost Activation Code?</v-text>
            <div class="garis mb-5"></div>
            <p style="text-align:justify;" class="subtitle-2 grey--text">
              Please provide the email address that you used when you signed up for your account.
              We will send you an email that will allow you to activate your account.
            </p>
          </v-row>

          <v-row class="mx-5 mt-12">
            <v-text-field
              v-model="params.incubatorIdentifier"
              name="incubator"
              label="Incubator Identifier"
              :rules="rulesName"
              id="incubator"
              outlined
            ></v-text-field>
          </v-row>
          <v-row class="mx-5 mt-0">
            <v-text-field
              v-model="params.email"
              :rules="rulesEmail"
              name="email"
              label="Email Address"
              id="email"
              outlined
            ></v-text-field>
          </v-row>

          <v-row class="ma-5">
            <v-btn
              block
              @click="requestResetToken"
              color="primary"
              :disabled="!valid"
              :loading="loader"
            >Request Activation Link</v-btn>
          </v-row>
          </v-col>
          <v-col cols="12" sm="4">
          
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container v-if="isSuccess">
      <v-row class="ma-5">
      <v-col cols="12" sm="3">

      </v-col>
      <v-col cols="12" sm="6">
        <v-row style="margin-top:138px;display:block;">
          <v-row class="title">Activation Link Sent</v-row>
          <v-row class="garis mb-5"></v-row>
          <v-row class="subtitle-1">
            Please check your email for a confirmation link that will activate your account</v-row>
          <v-row style="text-align:justify;" class="subtitle-2 grey--text mt-10">
            Important Note: The encrypted token in the activation link will only work for 1 hour after it's sent to you. If you miss the 1 hour window, simply request another and you'll receive a new one (that will last for 1 hour).</v-row>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">

      </v-col>
      </v-row>

    </v-container>
  </div>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      valid: false,
      params: {
        incubatorIdentifier: this.$route.params.incubatorIdentifier,
        email: this.$route.params.email
      },
      isSuccess: false,
      loader: false
    };
  },
  methods: {
    requestResetToken() {
      this.loader = false;
      this.axios
        .patch(
          config.baseUri + "/founder-account/generate-activation-code",
          this.params
        )
        .then(() => {
          this.isSuccess = true;
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