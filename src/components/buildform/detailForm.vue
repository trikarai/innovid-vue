<template>
  <v-container grid-list-xs>
    <!-- {{dataSingle}}
    <v-divider></v-divider>
    {{fields}}-->
    <v-card>
      <v-card-title v-if="!loader">
        <span class="headline">{{dataSingle.name}} Form Preview</span>
      </v-card-title>
      <v-card-text v-if="loader">
        <v-skeleton-loader ref="skeleton1" type="card-heading"></v-skeleton-loader>
      </v-card-text>
      <v-card-text>
        <span class="sub-title" v-if="!loader">{{dataSingle.description}}</span>
      </v-card-text>
      <v-card-text v-if="!loader">
        <template v-for="(field, index) in fields">
          <v-row :key="index">
            <field-module :field="field" :index="index" />
          </v-row>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn icon color="red darken-1" text @click="dialogPreview = false">
          <v-icon>close</v-icon>
        </v-btn>-->
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

import FieldModule from "@/components/fields/field";

export default {
  data() {
    return {
      dataSingle: {
        name: "",
        description: "",
        stringFields: [],
        integerFields: [],
        textAreaFields: [],
        attachmentFields: [],
        singleSelectFields: [],
        multiSelectFields: []
      },
      fields: [],
      loader: false
    };
  },
  components: {
    FieldModule
  },
  mounted() {
    this.getDataSingle();
  },
  methods: {
    getDataSingle() {
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/" +
            this.$route.params.formType +
            "/" +
            this.$route.params.formId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
          this.refactorJSON(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    refactorJSON(data) {
      data.stringFields.forEach(element => {
        element.type = "string";
        this.fields.push(element);
      });
      data.integerFields.forEach(element => {
        element.type = "integer";
        this.fields.push(element);
      });
      data.textAreaFields.forEach(element => {
        element.type = "textarea";
        this.fields.push(element);
      });
      data.singleSelectFields.forEach(element => {
        element.type = "radio";
        this.fields.push(element);
      });
      data.multiSelectFields.forEach(element => {
        element.type = "select";
        this.fields.push(element);
      });
      data.attachmentFields.forEach(element => {
        element.type = "attachment";
        this.fields.push(element);
      });
    }
  }
};
</script>
<style scoped>
</style>