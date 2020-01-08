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
                    v-model="params.sessionDuration"
                    label="Session Duration Name"
                    type="number"
                    :counter="50"
                    maxlength="50"
                    required
                  ></v-text-field>

                  <v-select
                    :rules="rulesRequired"
                    v-model="params.participantMentoringFeedbackFormId"
                    label="Participant Mentoring Feedback Form"
                    :items="dataList.list"
                    item-value="id"
                    item-text="name"
                    autocomplete
                    class="mb-4"
                  ></v-select>

                  <v-select
                    :rules="rulesRequired"
                    v-model="params.mentorMentoringFeedbackFormId"
                    label="Mentor Mentoring Feedback Form"
                    :items="dataList.list"
                    item-value="id"
                    item-text="name"
                    autocomplete
                    class="mb-4"
                  ></v-select>

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
  props: ["id", "edit", "view", "data", "isbranch", "rootid"],
  data: function() {
    return {
      valid: false,
      menu1: false,
      menu2: false,
      loader: false,
      show1: false,
      dataList: { total: 0, list: [] },
      params: {
        name: "",
        sessionDuration: 0,
        participantMentoringFeedbackFormId: "",
        mentorMentoringFeedbackFormId: ""
      }
    };
  },
  components: {},
  created: function() {},
  mounted: function() {
    this.getDataList();
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/as-admin/mentoring-feedback-forms", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
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
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/mentorings",
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
@import "../../../../../assets/css/modal.css";
</style>
