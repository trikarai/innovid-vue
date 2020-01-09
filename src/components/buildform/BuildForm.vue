<template>
  <div>
    <v-row>
      <v-col md="4" v-show="leftmenu">
        <v-card min-height="100%">
          <v-card-title primary-title>Field Properties</v-card-title>
          <v-card-text>{{field}}</v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="leftmenu = !leftmenu ">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4" v-show="!leftmenu">
        <v-card min-height="100%">
          <v-card-title primary-title>Element</v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="9">
                <v-text-field label="String" outlined clearable></v-text-field>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addString">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-divider></v-divider>
              <v-col md="9">
                <v-textarea rows="2" label="Textarea" outlined clearable></v-textarea>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addTextarea">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-divider></v-divider>
              <v-col md="9">
                <v-text-field label="Integer" type="number" outlined clearable></v-text-field>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addInteger">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col md="9">
                <v-radio-group>
                  <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addRadio">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col md="9">
                <v-select multiple :items="items" label="Select Multiple" clearable outlined></v-select>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addSelectMulti">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col md="9">
                <v-file-input label="File input" clearable outlined></v-file-input>
              </v-col>
              <v-col md="3">
                <v-btn x-small fab color="accent" @click="addAttachment">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="resetField" color="error">reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card min-height="100%" elevation="5" :loading="loader">
          <v-card-title>
            Form Builder
            <v-spacer></v-spacer>
            <v-btn
              class="ml-5"
              color="accent"
              @click="dialogPreview = true"
              :disabled="fields.length == 0"
            >
              <v-icon>zoom_in</v-icon>Form Preview
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">
                <v-text-field label="name" v-model="params.name" outlined></v-text-field>
              </v-col>
              <v-col md="12">
                <v-textarea rows="3" label="Description" v-model="params.description" outlined></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <template v-if="fields.length == 0">No Fields Added</template>
            <v-progress-circular indeterminate color="primary" v-if="loader"></v-progress-circular>
            <transition-group name="slide-fade">
              <template v-for="(field, index) in fields">
                <v-row :key="index">
                  <v-col md="9">
                    <v-row>
                      <v-col md="2">
                        <v-btn fab x-small color="primary" @click="openProperties(field)">
                          <v-icon small>build</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col md="10">
                        <field-module :field="field" :index="index" :build="buildmode"/>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md="3">
                    <v-btn
                      :disabled="index === 0"
                      icon
                      small
                      fab
                      color="accent"
                      @click="swapUp(fields, index)"
                    >
                      <v-icon>keyboard_arrow_up</v-icon>
                    </v-btn>
                    <v-btn
                      :disabled="index === fields.length - 1"
                      icon
                      small
                      fab
                      color="accent"
                      @click="swapDown(fields, index)"
                    >
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <v-btn class="ml-3" x-small fab color="warning" @click="deleteEvent(index)">
                      <v-icon small>delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </transition-group>
          </v-card-text>
          <v-card-actions v-show="fields.length !== 0">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="buildFormJSON()" :loading="loadBuild">
              <v-icon left>save</v-icon>Save
            </v-btn>
          </v-card-actions>
          <v-card-text v-show="devmode">
            <v-row>
              <v-col md="6">
                <pre>{{params}}</pre>
              </v-col>
              <v-col md="6">
                <pre>{{fields}}</pre>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>

    <v-layout row justify-center>
      <v-dialog v-model="dialogPreview" width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{params.name}} Form Preview</span>
          </v-card-title>
          <v-card-text>
            <template v-for="(field, index) in fields">
              <v-row :key="index">
                <field-module :field="field" :index="index" :build="buildmode"/>
              </v-row>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="red darken-1" text @click="dialogPreview = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogPropesties" width="500px">
        <v-card>
          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <props-module :field="field" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="red darken-1" text @click="dialogPropesties = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- <v-btn @click="postformtoParent"> post</v-btn> -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import * as config from "@/config/config";
import FieldModule from "@/components/fields/field";
import PropsModule from "@/components/fields/props";

import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  props: ["edit"],
  mixins: [formDynamicMixins],
  data() {
    return {
      buildmode: true,
      devmode: false,
      snackbar: false,
      timeout: 700,
      text: "",
      leftmenu: false,
      dialogPreview: false,
      dialogPropesties: false,
      params: {
        name: "",
        description: "",
        stringFields: [],
        textAreaFields: [],
        integerFields: [],
        attachmentFields: [],
        singleSelectFields: [],
        multiSelectFields: []
      },
      fields: [],
      field: {},
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      loader: false,
      loadBuild: false,
      dataSingle: ""
    };
  },
  components: {
    FieldModule,
    PropsModule
  },
  created() {
    bus.$on("resetField", () => {
      this.resetField();
    });

    if (this.edit) {
      this.getDataSingle();
    }
  },
  methods: {
    postformtoParent() {
      this.$emit("postform", this.params);
    },
    addString() {
      var field = new Object({
        name: "String",
        description: "description",
        position: "",
        required: true,
        defaultValue: null,
        minValue: 0,
        maxValue: 0,
        placeholder: "",
        type: "string"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;
      this.text = "string Field Added";
    },
    addTextarea() {
      var field = new Object({
        name: "Text Area",
        description: "description",
        position: "",
        required: true,
        defaultValue: null,
        minValue: 0,
        maxValue: 0,
        placeholder: "",
        type: "textarea"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;
      this.text = "textarea Field Added";
    },
    addInteger() {
      var field = new Object({
        name: "Integer",
        description: "description",
        position: "",
        required: true,
        defaultValue: 0,
        minValue: 0,
        maxValue: 0,
        placeholder: "",
        type: "integer"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;

      this.text = "integer Field Added";
    },
    addRadio() {
      var field = new Object({
        name: "Single Selection",
        description: "",
        position: "",
        required: true,
        defaultValue: "",
        options: [
          {
            id: "",
            name: "selection 1",
            description: "",
            position: 1
          },
          {
            id: "",
            name: "selection 2",
            description: "",
            position: 2
          }
        ],
        type: "radio"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;

      this.text = "single selection Field Added";
    },
    addSelectMulti() {
      var field = new Object({
        name: "Multi Selection",
        description: "",
        position: "",
        required: true,
        defaultValue: "",
        minValue: 2,
        maxValue: 4,
        options: [
          {
            id: "",
            name: "selection 1",
            description: "",
            position: 1
          }
        ],
        type: "select"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;

      this.text = "multi selection Field Added";
    },
    addAttachment() {
      var field = new Object({
        name: "File Input",
        description: "",
        position: "",
        required: true,
        minValue: 1,
        maxValue: 2,
        minSize: 1000,
        maxSize: 4000,
        type: "attachment"
      });
      field.position = this.fields.length + 1;
      this.fields.push(field);
      this.snackbar = true;

      this.text = "attachment selection Field Added";
    },
    deleteEvent: function(index) {
      this.fields.splice(index, 1);
    },
    swapUp(arr, index) {
      var temp = this.fields[index];
      var pos = this.fields[index].position;
      temp.position = this.fields[index - 1].position;
      var temp2 = this.fields[index - 1];
      temp2.position = pos;

      arr.splice(index - 1, 2, temp, temp2);
      this.fields = arr;
    },
    swapDown(arr, index) {
      var temp = this.fields[index];
      var pos = this.fields[index].position;
      temp.position = this.fields[index + 1].position;
      var temp2 = this.fields[index + 1];
      temp2.position = pos;

      arr.splice(index, 2, temp2, temp);
      this.fields = arr;
    },
    openProperties(field) {
      this.field = field;
      this.dialogPropesties = true;
    },
    resetField() {
      this.fields = [];
      this.resetField2();
    },
    resetField2() {
      this.params.stringFields = [];
      this.params.textAreaFields = [];
      this.params.integerFields = [];
      this.params.singleSelectFields = [];
      this.params.multiSelectFields = [];
      this.params.attachmentFields = [];
    },
    buildFormJSON() {
      this.resetField2();
      this.loadBuild = true;
      var i;
      for (i = 0; i < this.fields.length; i++) {
        if (this.fields[i].type == "string") {
          this.params.stringFields.push(this.fields[i]);
        } else if (this.fields[i].type == "integer") {
          this.params.integerFields.push(this.fields[i]);
        } else if (this.fields[i].type == "textarea") {
          this.params.textAreaFields.push(this.fields[i]);
        } else if (this.fields[i].type == "radio") {
          this.params.singleSelectFields.push(this.fields[i]);
        } else if (this.fields[i].type == "select") {
          this.params.multiSelectFields.push(this.fields[i]);
        } else if (this.fields[i].type == "attachment") {
          this.params.attachmentFields.push(this.fields[i]);
        }
      }
      this.loadBuild = false;
      this.postformtoParent();
    },
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
          this.params.name = this.dataSingle.name;
          this.params.description = this.dataSingle.description;
          this.refactorJSON(res.data.data);
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
</style>