<template>
  <!-- <v-container> -->
  <!-- <v-row>Reload : {{modeReload}}</v-row> -->

  <v-row>
    <v-col class="mt-0 pt-0">
      <v-card class="pa-5 mt-6" :loading="loader">
        <v-card-title class="topaccentform" primary-title>
          <div>
            <h3 class="headline mb-0">{{ formName }}</h3>
          </div>
        </v-card-title>
        <v-card-text class="subtitle pb-0" v-if="formDesc !== ''">
          <b>Description</b>
        </v-card-text>
        <v-card-text class="subtitle grey--text">{{
          desc.description
        }}</v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid" v-if="!desc.renderAs">
            <template v-for="(field, index) in reOrderField(fields)">
              <v-row :key="index">
                <field-module
                  :field="field"
                  :index="index"
                  :modeReload="modeReload"
                />
              </v-row>
            </template>
          </v-form>
          <v-form ref="form" v-model="valid" v-else>
            <div class="grid-container">
              <template v-for="(field, index) in fields">
                <v-card
                  class="ma-1 pa-2"
                  :style="'grid-area:' + field.position"
                  :key="field.id"
                  elevation="2"
                  outlined
                >
                  <field-module
                    :field="field"
                    :index="index"
                    :modeReload="modeReload"
                  />
                </v-card>
              </template>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <!--generic button-->
          <v-spacer></v-spacer>
          <v-btn
            v-if="!modeAtom"
            color="primary"
            :disabled="!valid"
            @click="sendtoParent"
            >Submit</v-btn
          >
          <!--atomic journal button-->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="modeAtom"
                v-on="on"
                color="primary"
                :disabled="!valid"
                @click="sendtoParent2"
                >Assign Worksheet</v-btn
              >
            </template>
            <span>Edited Worksheet record won't be saved</span>
          </v-tooltip>
          <v-btn
            v-if="modeAtom"
            color="primary"
            :disabled="!valid"
            @click="sendtoParent"
            >Save as New Journal</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>
<script>
import bus from "@/config/bus";
// import * as config from "@/config/config";
// import auth from "@/config/auth";
import FieldModule from "@/components/fields/field";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  props: ["formTemplate", "modeReload", "modeAtom"],
  data() {
    return {
      loader: false,
      valid: false,
      params: [],
      fields: [],
      formName: "",
      formDesc: "",
      test: {},
      desc: {
        renderAs: false,
        description: "",
      },
    };
  },
  components: {
    FieldModule,
  },
  created() {
    bus.$on("getValue", (params, index) => {
      this.params.splice(index, 1, params);
    });
  },
  mounted() {
    this.refactorJSON(this.formTemplate);
  },
  updated() {
    this.formName = this.formTemplate.name;
    this.formDesc = this.formTemplate.description;

    let tempObj = JSON.parse(this.formTemplate.description);
    if (tempObj.hasOwnProperty("renderAs")) {
      this.desc.renderAs = JSON.parse(this.formTemplate.description).renderAs;
      this.desc.description = JSON.parse(
        this.formTemplate.description
      ).description;
    }
    // this.refactorJSON(this.formTemplate);
  },
  methods: {
    sendtoParent() {
      this.test = this.refactorParams(this.params);
      this.$emit("submit-form", this.test);
    },
    sendtoParent2() {
      this.test = this.refactorParams(this.params);
      this.$emit("assignworksheet", this.test);
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
}
.topaccentform {
  background: #249c90;
  color: #fff;
  margin-bottom: 18px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  bottom: 49px;
}
</style>
