<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
        class="modal-wrapper"
        style="padding-top:6px !important"
        @click="$emit('close')"
      >
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
                {{ rootname }}
              </p>
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row no-gutters>
                    <v-col cols="12" lg="12">
                      <v-text-field
                        :disabled="view"
                        label="Name"
                        v-model="params.name"
                        :rules="rulesName"
                        :counter="25"
                        maxlength="25"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12">
                      <v-text-field
                        :disabled="edit"
                        label="Position"
                        v-model="params.position"
                        :counter="25"
                        maxlength="25"
                        type="number"
                        :rules="rulesRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="12">
                      <v-textarea
                        class="mt-8"
                        :disabled="view"
                        label="Description"
                        v-model="params.description"
                        :counter="500"
                        maxlength="500"
                        height="150"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" lg="12">
                      <v-select
                        v-if="!edit"
                        :rules="rulesRequired"
                        v-model="params.worksheetFormId"
                        label="Worksheet"
                        :items="dataList.list"
                        item-value="id"
                        item-text="name"
                        autocomplete
                        :loading="tableLoad"
                        class="mb-4"
                        no-data-text="No Worksheet Found"
                      >
                        <template v-slot:append-outer>
                          <v-btn icon small @click="getDataList">
                            <v-icon>refresh</v-icon>
                          </v-btn>
                        </template>
                      </v-select>
                      <template v-if="!edit">
                        <template v-if="!tableLoad">
                          <v-btn
                            v-if="dataList.total === 0"
                            color="accent"
                            :to="{ name: 'personnel-worksheet-form' }"
                            target="_blank"
                            small
                            >Create Worksheet</v-btn
                          ></template
                        ></template
                      >
                    </v-col>
                  </v-row>
                  <v-row v-if="!view">
                    <v-col cols="12" lg="12">
                      <v-btn
                        block
                        v-if="edit == false"
                        @click.once="submit"
                        :loading="loader"
                        color="primary"
                        :disabled="!valid"
                        >{{ $vuetify.lang.t("$vuetify.action.add") }}</v-btn
                      >
                    </v-col>
                    <v-col cols="12" lg="12">
                      <v-btn
                        block
                        v-if="edit"
                        @click.once="update"
                        :loading="loader"
                        color="primary"
                        :disabled="!valid"
                        >{{ $vuetify.lang.t("$vuetify.action.edit") }}</v-btn
                      ></v-col
                    >
                  </v-row>
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
    "missionid",
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
        position: "",
      },
      tableLoad: false,
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
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
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
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.$emit("refresh");
        })
        .catch((res) => {
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
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.$emit("refresh");
        })
        .catch((res) => {
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
            "/missions/" +
            this.rootid,
          this.params,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.$emit("refresh");
        })
        .catch((res) => {
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
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.params = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
  },
};
</script>
<style scoped>
@import "../../../../../assets/css/modal.css";
</style>
