<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card elevation="0" width="400" :loading="loader">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    :disabled="view"
                    label="Name"
                    v-model="params.name"
                    :rules="rulesName"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Identifier"
                    v-model="params.identifier"
                    :rules="rulesIncubatorIdentifier"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Personnel Name"
                    v-model="params.personnelName"
                    :rules="rulesName"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Personnel Email"
                    v-model="params.personnelEmail"
                    :rules="rulesEmail"
                    maxlength="100"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Personnel Phone"
                    v-model="params.personnelPhone"
                    :rules="rulesPhone"
                    maxlength="100"
                    required
                  ></v-text-field>
                  <template v-if="!edit">
                    <v-text-field
                      v-if="!view"
                      v-model="params.personnelPassword"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="rulesPassword"
                      :type="show1 ? 'text' : 'password'"
                      name="Password"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </template>
                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      :loading="loader"
                      v-if="edit == false"
                      @click.once="submit"
                      color="primary"
                      :disabled="!valid"
                    >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      show1: false,
      params: {
        name: "",
        identifier: "",
        personnelName: "",
        personnelEmail: "",
        personnelPhone: "",
        personnelPassword: ""
      }
    };
  },
  components: {},
  created: function() {},
  mounted: function() {
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    addData: function() {
      this.loader = true;
      this.axios
        .post(config.baseUri + "/sys-admin/incubators", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          this.$emit("refresh");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateData: function() {},
    getSingleData: function() {}
  }
};
</script>
<style scoped>
@import "../../../assets/css/modal.css";
</style>
