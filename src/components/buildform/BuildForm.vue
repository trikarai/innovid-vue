<template>
  <div>
    <v-row>
      <v-col md="4" v-show="leftmenu">
        <v-card min-height="100%">
          <v-card-title primary-title>Field Properties</v-card-title>
          <v-card-text>{{ field }}</v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="leftmenu = !leftmenu">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4" v-show="!leftmenu">
        <v-card min-height="100%">
          <v-card-title primary-title>
            Element
            <v-spacer></v-spacer>
            <v-icon>forward</v-icon>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="my-0 py-0" md="9">
                <v-text-field
                  disabled
                  dense
                  label="String"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="3" v-if="field">
                <v-btn
                  class="mt-1"
                  x-small
                  fab
                  color="primary"
                  @click="addString"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <!-- <v-divider></v-divider> -->
              <v-col class="my-0 py-0" md="9">
                <v-textarea
                  class="my-0 py-0"
                  disabled
                  dense
                  rows="2"
                  label="Textarea"
                  outlined
                  clearable
                ></v-textarea>
              </v-col>
              <v-col class="my-0 py-0" md="3">
                <v-btn
                  class="mt-1"
                  x-small
                  fab
                  color="primary"
                  @click="addTextarea"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <!-- <v-divider></v-divider> -->
              <v-col class="my-0 py-0" md="9">
                <v-text-field
                  disabled
                  dense
                  label="Integer"
                  type="number"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="3">
                <v-btn
                  class="mt-1"
                  x-small
                  fab
                  color="primary"
                  @click="addInteger"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col class="my-0 py-0" md="9">
                <v-radio-group>
                  <v-radio
                    disabled
                    v-for="n in 2"
                    :key="n"
                    :label="`Radio ${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col class="my-0 py-0" md="3">
                <v-btn
                  class="mt-5"
                  x-small
                  fab
                  color="primary"
                  @click="addRadio"
                  :disabled="desc.renderAs"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col class="my-0 py-0" md="9">
                <v-select
                  disabled
                  dense
                  multiple
                  :items="items"
                  label="Select Multiple"
                  clearable
                  outlined
                ></v-select>
              </v-col>
              <v-col class="my-0 py-0" md="3">
                <v-btn
                  class="mt-1"
                  x-small
                  fab
                  color="primary"
                  @click="addSelectMulti"
                  :disabled="desc.renderAs"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
              <v-col class="my-0 py-0" md="9">
                <v-file-input
                  disabled
                  dense
                  label="File input"
                  clearable
                  outlined
                ></v-file-input>
              </v-col>
              <v-col class="my-0 py-0" md="3">
                <v-btn
                  class="mt-1"
                  x-small
                  fab
                  color="primary"
                  @click="addAttachment"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-actions>
            <v-btn @click="resetField" color="error">reset</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card min-height="550px" :loading="loader">
          <!-- <v-card-title v-intersect="onIntersectJudul"> -->
          <v-card-title>
            Form Builder
            <v-spacer></v-spacer>
            <v-btn
              v-if="desc.renderAs"
              class="ml-5"
              color="primary"
              @click="dialogPreview = true"
              :disabled="fields.length == 0"
            >
              <v-icon left>view_quilt</v-icon>Canvas Preview
            </v-btn>
            <v-btn
              v-else
              class="ml-5"
              color="primary"
              @click="dialogPreview = true"
              :disabled="fields.length == 0"
            >
              <v-icon left>zoom_in</v-icon>Form Preview
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="12">
                <v-text-field
                  counter="25"
                  maxlength="25"
                  label="name"
                  v-model="params.name"
                  filled
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-textarea
                  counter="500"
                  maxlength="500"
                  rows="3"
                  label="Description"
                  v-model="desc.description"
                  filled
                ></v-textarea>
              </v-col>
              <v-col v-if="canvasMode">
                <template v-if="fields.length == 0">
                  <v-radio-group
                    v-model="desc.renderAs"
                    row
                    :disabled="desc.renderAs"
                  >
                    <v-radio color="primary" :value="false">
                      <template v-slot:label>
                        <div>
                          Render as
                          <strong class="primary--text">Form</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio color="primary" :value="true">
                      <template v-slot:label>
                        <div>
                          Render as
                          <strong class="accent--text">Canvas</strong>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </template>
                <template v-else>
                  <v-radio-group v-model="desc.renderAs" row disabled>
                    <v-radio color="primary" :value="false">
                      <template v-slot:label>
                        <div>
                          Render as
                          <strong class="primary--text">Form</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio color="primary" :value="true">
                      <template v-slot:label>
                        <div>
                          Render as
                          <strong class="accent--text">Canvas</strong>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </template>
              </v-col>
              <v-col md="12" v-if="desc.renderAs">
                <v-alert text prominent type="error" icon="warning" dismissible
                  >Canvas is Experimental Feature, please use with
                  cautious</v-alert
                >
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-text>
            <v-card-text style="text-align:center;">
              <template v-if="fields.length == 0">
                <v-chip color="warning">
                  <v-avatar left>
                    <v-icon>post_add</v-icon> </v-avatar
                  >No Fields Added
                </v-chip>
              </template>
              <template v-else>
                <v-divider></v-divider>
              </template>
            </v-card-text>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loader"
            ></v-progress-circular>
            <transition-group name="slide-fade">
              <template v-for="(field, index) in fields">
                <v-row :key="index" class="my-0 py-0">
                  <v-col class="my-0 py-0" md="8">
                    <v-row>
                      <v-col class="mt-4" md="2">
                        <v-btn
                          fab
                          x-small
                          color="primary"
                          @click="openProperties(index, field)"
                        >
                          <v-icon small>build</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col md="10">
                        <!-- Order : {{field.position}} -->
                        <field-module
                          :field="field"
                          :index="index"
                          :build="buildmode"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md="4">
                    <template v-if="!desc.renderAs">
                      <v-btn
                        class="mt-3"
                        :disabled="index === 0"
                        icon
                        small
                        fab
                        color="primary"
                        @click="swapUp(fields, index)"
                      >
                        <v-icon>keyboard_arrow_up</v-icon>
                      </v-btn>
                      <v-btn
                        class="mt-3"
                        :disabled="index === fields.length - 1"
                        icon
                        small
                        fab
                        color="primary"
                        @click="swapDown(fields, index)"
                      >
                        <v-icon>keyboard_arrow_down</v-icon>
                      </v-btn>
                    </template>
                    <v-btn
                      class="ml-2 mt-4"
                      x-small
                      fab
                      color="accent"
                      @click="duplicateEvent(index, field)"
                    >
                      <v-icon small>control_point_duplicate</v-icon>
                    </v-btn>
                    <v-btn
                      class="ml-2 mt-4"
                      x-small
                      fab
                      color="warning"
                      @click="deleteEvent(index)"
                    >
                      <v-icon small>delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </transition-group>
          </v-card-text>
          <v-card-actions v-show="fields.length !== 0">
            <v-spacer></v-spacer>
            <v-btn
              v-if="desc.renderAs"
              color="accent"
              @click="dialogPreview = true"
              :disabled="fields.length == 0"
            >
              <v-icon left>view_quilt</v-icon>Canvas Preview
            </v-btn>
            <v-btn
              color="primary"
              @click="buildFormJSON()"
              :loading="loadBuild"
            >
              <v-icon left>save</v-icon>Save
            </v-btn>
            <v-btn @click="resetField" color="warning">reset</v-btn>
          </v-card-actions>
          <v-card-text v-show="devmode">
            <v-row>
              <v-col md="6">
                <!-- <pre>{{params}}</pre> -->
                <pre>{{ fields }}</pre>
              </v-col>
              <v-col md="6">
                <!-- <pre>{{fields}}</pre> -->
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
        </v-card>
        <!-- <v-chip v-intersect.quiet="onIntersect"></v-chip>    -->
      </v-col>
      <!-- <v-vol cols="1"></v-vol> -->
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="desc.renderAs">
      <v-col md="6" lg="6">Instant Preview</v-col>
      <v-col md="12" lg="12">
        <v-icon color="red" small>help</v-icon>
        <b>grid-area :</b>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">grid-row-start</span>
          </template>
          <span
            >Specifies on which row to start displaying the item.</span
          > </v-tooltip
        >/
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">grid-column-start</span>
          </template>
          <span
            >Specifies on which column to start displaying the item.</span
          > </v-tooltip
        >/
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">grid-row-end</span>
          </template>
          <span
            >Specifies on which row-line to stop displaying the item, or how
            many rows to span.</span
          > </v-tooltip
        >/
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <span v-on="on">grid-column-end</span>
          </template>
          <span
            >Specifies on which column-line to stop displaying the item, or how
            many columns to span.</span
          >
        </v-tooltip>
      </v-col>
      <v-col md="12" lg="12">
        <div class="grid-container">
          <template v-for="field in fields">
            <v-card
              class="ma-1"
              :style="'grid-area:' + field.position"
              :key="field.id"
              elevation="2"
              outlined
            >
              <v-card-title>{{ field.name }}</v-card-title>
              <v-card-text>{{ field.position }}</v-card-text>
            </v-card>
          </template>
        </div>
      </v-col>
    </v-row>

    <v-layout row justify-center>
      <v-dialog v-model="dialogPreview" :width="desc.renderAs ? '1000' : '500'">
        <v-card class="pa-5">
          <v-card-title>
            <span class="headline"
              >{{ params.name }}
              {{ desc.renderAs ? "Canvas" : "From" }} Preview</span
            >
          </v-card-title>
          <v-card-text v-if="!desc.renderAs">
            <template v-for="(field, index) in reOrderField(fields)">
              <v-row :key="index">
                <field-module
                  :field="field"
                  :index="index"
                  :build="buildmode"
                />
              </v-row>
            </template>
          </v-card-text>
          <v-card-text v-else>
            <div class="grid-container">
              <template v-for="field in fields">
                <v-card
                  class="ma-1"
                  :style="'grid-area:' + field.position"
                  :key="field.id"
                  elevation="2"
                  shaped
                  outlined
                >
                  <v-card-text>
                    <field-module :field="field" />
                  </v-card-text>
                </v-card>
              </template>
            </div>
          </v-card-text>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="red darken-1" text @click="dialogPreview = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>-->
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogPropesties" width="500px">
        <v-card>
          <v-card-text>
            <props-module
              :index="indexPropesties"
              :field="field"
              :canvasMode="desc.renderAs"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-5"
              color="primary"
              text
              @click="dialogPropesties = false"
              >Done</v-btn
            >
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
  props: ["edit", "formtype", "canvasMode"],
  mixins: [formDynamicMixins],
  data() {
    return {
      buildmode: true,
      isIntersecting: false,
      devmode: false,
      snackbar: false,
      timeout: 700,
      text: "",
      leftmenu: false,
      dialogPreview: false,
      dialogPropesties: false,
      indexPropesties: false,
      params: {
        name: "",
        description: "",
        stringFields: [],
        textAreaFields: [],
        integerFields: [],
        attachmentFields: [],
        singleSelectFields: [],
        multiSelectFields: [],
      },
      fields: [],
      fieldsOrdered: [],
      field: {},
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      loader: false,
      loadBuild: false,
      dataSingle: "",
      position: { scrollTop: 0, scrollLeft: 0 },
      desc: { renderAs: false, description: "" },
    };
  },
  components: {
    FieldModule,
    PropsModule,
  },

  watch: {
    desc: {
      immediate: true,
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        this.params.description = JSON.stringify(this.desc);
      },
    },
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
    setDesc() {
      this.params.description = JSON.stringify(this.desc);
    },
    postformtoParent() {
      this.$emit("postform", this.params);
    },
    getLastOrder() {
      var lastPost;
      if (this.fields.length == 0) {
        lastPost = 1;
      } else {
        lastPost = this.fields.slice(-1)[0].position + 1;
      }
      return lastPost;
    },
    getLastOrderGrid() {
      var lastPost;
      if (this.fields.length == 0) {
        lastPost = '{"order": 1, "grid": ""}';
      } else {
        // lastPost = this.fields.slice(-1)[0].position + 1;
        lastPost = '{"order": 2, "grid": ""}';
      }
      return lastPost;
    },
    addString() {
      var field = new Object({
        name: "String",
        description: "",
        position: "",
        required: true,
        defaultValue: null,
        minValue: 3,
        maxValue: 150,
        placeholder: "",
        type: "string",
      });
      field.position = this.getLastOrder();
      this.fields.push(field);
      this.snackbar = true;
      this.text = "string Field Added";
    },
    addTextarea() {
      var field = new Object({
        name: "Text Area",
        description: "",
        position: "",
        required: true,
        defaultValue: null,
        minValue: 10,
        maxValue: 350,
        placeholder: "",
        type: "textarea",
      });

      this.desc.renderAs
        ? (field.position = "")
        : (field.position = this.getLastOrder());
      // field.position = this.getLastOrderGrid();

      this.fields.push(field);
      this.snackbar = true;
      this.text = "textarea Field Added";
    },
    addInteger() {
      var field = new Object({
        name: "Integer",
        description: "",
        position: "",
        required: true,
        defaultValue: 0,
        minValue: 0,
        maxValue: 20,
        placeholder: "",
        type: "integer",
      });
      field.position = this.getLastOrder();
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
            position: 1,
          },
          {
            id: "",
            name: "selection 2",
            description: "",
            position: 2,
          },
        ],
        type: "radio",
      });
      field.position = this.getLastOrder();
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
        minValue: 1,
        maxValue: 4,
        options: [
          {
            id: "",
            name: "selection 1",
            description: "",
            position: 1,
          },
        ],
        type: "select",
      });
      field.position = this.getLastOrder();
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
        maxValue: 1,
        minSize: 0,
        maxSize: 10,
        type: "attachment",
      });
      this.desc.renderAs
        ? (field.position = "")
        : (field.position = this.getLastOrder());
      this.fields.push(field);
      this.snackbar = true;

      this.text = "attachment selection Field Added";
    },
    deleteEvent: function(index) {
      this.fields.splice(index, 1);
    },
    duplicateEvent(index, field) {
      var item = JSON.parse(JSON.stringify(field));
      item.position = this.getLastOrder();
      this.fields.push(item);
      this.snackbar = true;
      this.text = "Field Duplicated";
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
    openProperties(index, field) {
      this.field = field;
      this.indexPropesties = index;
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
            // this.$route.params.formType +
            this.formtype +
            "/" +
            this.$route.params.formId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.dataSingle = res.data.data;
          this.params.name = this.dataSingle.name;
          this.desc.renderAs = false;
          this.desc.description = this.dataSingle.description;
          this.refactorJSON(res.data.data);

          let tempObj = JSON.parse(this.dataSingle.description);
          if (tempObj.hasOwnProperty("renderAs")) {
            this.desc.renderAs = JSON.parse(
              this.dataSingle.description
            ).renderAs;
            this.desc.description = JSON.parse(
              this.dataSingle.description
            ).description;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    onIntersect(entries) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
    },
    onIntersectJudul() {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = false;
    },
  },
};
</script>
<style scoped>
.grid-container {
  display: grid;
}
.elementextend {
  position: fixed;
  width: 371px;
  top: 71px;
}
</style>
