<template>
  <v-container grid-list-md>
    <v-row></v-row>
    <v-card :loading="loader">
      <v-card-title primary-title>{{formTemplate.name}}</v-card-title>
      <v-card-text class="subtitle">{{formTemplate.description}}</v-card-text>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <template v-for="(field, index) in fields">
            <v-row :key="index">
              <field-module :field="field" :index="index" />
            </v-row>
          </template>
        </v-form>
      </v-card-text>
      <v-card-text>
        <!-- <pre>{{params}}</pre> -->
      </v-card-text>
      <v-card-text>
        <pre>{{test}}</pre>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" @click="sendtoParent">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
// import * as config from "@/config/config";
// import auth from "@/config/auth";
import FieldModule from "@/components/fields/field";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  props: ["formTemplate"],
  data() {
    return {
      loader: false,
      valid: false,
      params: [],
      fields: [],
      test: {
        profileFormId: this.formTemplate.id,
        Form_id: this.formTemplate.id
      }
    };
  },
  components: {
    FieldModule
  },
  created() {
    bus.$on("getValue", (params, index) => {
      this.params.splice(index, 1, params);
    });
    this.refactorJSON(this.formTemplate);
  },
  methods: {
    sendtoParent() {
      this.test = this.refactorParams(this.params, this.formTemplate.id);
      this.$emit("submit-form", this.test);
    }
  }
};
</script>