<template>
  <div>
    <v-container grid-list-xs v-if="!isSuccess">
      <v-form ref="form1" v-model="valid">
        <v-row class="ma-3">
          <v-col md="12" class="title">Lost Activation Code?</v-col>
          <v-col class="subtitle-2">
            Please provide the email address that you used when you signed up for your account.
            We will send you an email that will allow you to activate your account.
          </v-col>
        </v-row>

        <v-row class="ma-3">
          <v-text-field
            v-model="params.incubatorIdentifier"
            name="incubator"
            label="Incubator Identifier"
            :rules="rulesName"
            id="incubator"
            outlined
          ></v-text-field>
        </v-row>
        <v-row class="ma-3">
          <v-text-field
            v-model="params.email"
            :rules="rulesEmail"
            name="email"
            label="Email Address"
            id="email"
            outlined
          ></v-text-field>
        </v-row>

        <v-row class="ma-3">
          <v-btn
            @click="requestResetToken"
            color="accent"
            :disabled="!valid"
            :loading="loader"
          >Request Activation Link</v-btn>
        </v-row>
      </v-form>
    </v-container>
    <v-container v-if="isSuccess">
      <v-row class="ma-3">
        <v-row xs="12" class="title">Activation Link Sent</v-row>
        <v-row
          class="subtitle-2"
        >Please check your email for a confirmation link that will activate your account</v-row>
        <v-row
          class="subtitle-2"
        >Important Note: The encrypted token in the activation link will only work for 1 hour after it's sent to you. If you miss the 1 hour window, simply request another and you'll receive a new one (that will last for 1 hour).</v-row>
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
          config.baseUri + "/incubatee-account/generate-activation-code",
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