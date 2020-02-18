<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" style="padding-top:6px !important" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card class="pa-5 pt-0" elevation="0" width="400" :loading="loader">
            <v-card-title class="topaccent" primary-title>
              <div>
                <h3 v-if="!isbranch" class="headline mb-0">
                  <template v-if="!edit">Add</template>
                  <template v-else>Edit</template> Mission
                </h3>
                <h3 v-else class="headline mb-0">
                  <template v-if="!edit">Add</template>
                  <template v-else>Edit</template> Branch Mission
                </h3>
              </div>
            </v-card-title>
            <v-card-text>
              <p v-if="isbranch">
                <b>Parent Mission:</b>
                {{rootname}}
              </p>
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
                    label="Position"
                    v-model="params.position"
                    :counter="25"
                    maxlength="25"
                  ></v-text-field>
                  <v-textarea
                    class="mt-5"
                    :disabled="view"
                    label="Description"
                    v-model="params.description"
                    :counter="100"
                    maxlength="100"
                    height="100"
                    required
                  ></v-textarea>

                  <v-select
                    v-if="!edit"
                    :rules="rulesRequired"
                    v-model="params.worksheetFormId"
                    label="Worksheet"
                    :items="dataList.list"
                    item-value="id"
                    item-text="name"
                    autocomplete
                    class="mb-4"
                  ></v-select>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      block
                      v-if="edit == false"
                      @click.once="submit"
                      :loading="loader"
                      color="primary"
                      :disabled="!valid"
                    >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>
                    <v-btn
                      block
                      v-if="edit"
                      @click.once="update"
                      :loading="loader"
                      color="primary"
                      :disabled="!valid"
                    >{{$vuetify.lang.t('$vuetify.action.edit')}}</v-btn>
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
  props: [
    "id",
    "edit",
    "view",
    "data",
    "isbranch",
    "rootid",
    "rootname",
    "missionid"
  ],
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
        description: "",
        worksheetFormId: "",
        position: ""
      }
    };
  },
  components: {},
  created: function() {},
  mounted: function() {
    if (this.edit) {
      this.getSingleData(this.rootid);
    } else {
      this.getDataList();
    }
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/personnel/as-admin/worksheet-forms", {
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
        if (this.isbranch) {
          this.addDataBranch();
        } else {
          this.addData();
        }
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
            "/missions",
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
    addDataBranch: function() {
      this.loader = true;
      this.axios
        .post(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.rootid,
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
    updateData() {
      this.loader = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" + this.rootid,
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
    getSingleData() {
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.rootid,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.params = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../../../assets/css/modal.css";
</style>
