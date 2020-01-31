<template>
  <!-- <v-container> -->
  <!-- <v-row>Reload : {{modeReload}}</v-row> -->

  <v-row>
    <v-col cols="12" md="6" lg="6" xs="12">
      <v-card class="pa-5 mt-6" :loading="loader">
        <v-card-title class="topaccentform" primary-title>
          <div>
            <h3 class="headline mb-0">{{formName}}</h3>
          </div>
        </v-card-title>
        <v-card-text class="subtitle pb-0" v-if="formDesc !==''">
          <b>Description</b>
        </v-card-text>
        <v-card-text class="subtitle grey--text">{{formDesc}}</v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <template v-for="(field, index) in fields">
              <v-row :key="index">
                <field-module :field="field" :index="index" :modeReload="modeReload" />
              </v-row>
            </template>
          </v-form>
        </v-card-text>
        <!-- <v-card-text>
        <pre>{{params}}</pre>
        </v-card-text>-->
        <!-- <v-card-text>
        <pre>{{test}}</pre>
        </v-card-text>-->

        <v-card-actions>
          <v-btn block color="primary" :disabled="!valid" @click="sendtoParent">Submit</v-btn>
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
  props: ["formTemplate", "modeReload"],
  data() {
    return {
      loader: false,
      valid: false,
      params: [],
      fields: [],
      formName: "",
      formDesc: "",
      test: {}
    };
  },
  components: {
    FieldModule
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
    // this.refactorJSON(this.formTemplate);
  },
  methods: {
    sendtoParent() {
      this.test = this.refactorParams(this.params);
      this.$emit("submit-form", this.test);
    }
  }
};
</script>

<style scoped>
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