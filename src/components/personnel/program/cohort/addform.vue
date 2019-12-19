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
                  <v-textarea
                    :disabled="view"
                    label="Description"
                    v-model="params.description"
                    :counter="100"
                    maxlength="100"
                    required
                  ></v-textarea>

                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="params.startDate"
                        label="Start Date"
                        hint="Start Date"
                        prepend-icon="today"
                        readonly
                        v-on="on"
                        :rules="rulesRequired"
                      ></v-text-field>
                    </template>
                    <v-date-picker ref="picker" v-model="params.startDate" @input="menu1 = false"></v-date-picker>
                  </v-menu>
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="params.endDate"
                        label="End Date"
                        hint="End Date"
                        prepend-icon="today"
                        readonly
                        v-on="on"
                        :rules="rulesRequired"
                      ></v-text-field>
                    </template>
                    <v-date-picker ref="picker" v-model="params.endDate" @input="menu2 = false"></v-date-picker>
                  </v-menu>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      v-if="edit == false"
                      @click.once="submit"
                      :loading="loader"
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
      menu1: false,
      menu2: false,
      loader: false,
      show1: false,
      params: {
        name: "",
        description: "",
        startDate: "",
        endDate: ""
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
        .post(
          config.baseUri +
            "/personnel/as-admin/programmes/" +
            this.$route.params.programId +
            "/cohorts",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
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
@import "../../../../assets/css/modal.css";
</style>
