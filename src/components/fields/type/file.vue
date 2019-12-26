<template>
  <v-row>
    <v-col md="6">
      <v-file-input
        :hint="field.description"
        :clearable="clearable"
        outlined
        max-width="100%"
        show-size
        counter
        accept="image/*"
        v-model="file"
        @change="onFilePicked"
      >
        <!-- :rules="[rules.maxSize, rules.minSize, checkRequired]" -->
        <template v-slot:label>
          <div :class="{required : field.required}">{{field.name}}</div>
        </template>
      </v-file-input>
    </v-col>
    <v-col md="3">
      <v-expand-x-transition>
        <v-progress-circular
          v-if="progressShow"
          rotate="90"
          size="55"
          width="5"
          :value="valueDeterminate"
          color="red"
        >{{ valueDeterminate }} %</v-progress-circular>
      </v-expand-x-transition>
    </v-col>
    <v-col md="4">
      <v-expand-transition>
        <template>
          <v-img :src="imageUrl" contain max-height="150" v-if="imageUrl" />
        </template>
      </v-expand-transition>
    </v-col>
    <v-col md="3">
      <v-btn v-if="imageUrl" small fab color="warning" @click="uploadFile">
        <v-icon>cloud_upload</v-icon>
      </v-btn>
      <v-btn depressed fab small color="green">
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn icon small color="red" @click="removeFile">
        <v-icon>close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";
import * as config from "@/config/config";

export default {
  mixins: [validationMixins],
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      valueDeterminate: 0,
      value: [],
      imageName: "",
      imageUrl: null,
      file: null,
      headers: {},
      progressShow: true,
      uploaded: false,
      fileInfo: { id: "", filePath: "" },
      ext: ""
    };
  },
  watch: {},
  methods: {
    onFilePicked() {
      const files = this.file;
      const fr = new FileReader();
      fr.readAsDataURL(files);
      fr.addEventListener("load", () => {
        this.imageUrl = fr.result;
        // this.file = files; // this is an image file that can be sent to server...
      });
      this.ext = files.name.split(".").pop();
    },
    removeFile() {
      this.file = null;
      this.imageUrl = null;
      this.ext = "";
    },
    uploadFile() {
      this.headers["Content-Type"] = "image/*";
      this.headers["Authorization"] = auth.getToken();
      var app = this;
      this.progressShow = true;
      this.axios
        .post(config.baseUri + "/incubatee/file-upload", this.file, {
          headers: this.headers,
          onUploadProgress(e) {
            if (e.lengthComputable) {
              // console.log((e.loaded / e.total) * 100);
              app.valueDeterminate = Math.round((e.loaded / e.total) * 100);
            }
          }
        })
        .then(() => {
          this.uploaded = true;
        })
        .catch(res => {
          this.uploaded = false;
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.progressShow = false;
        });
    }
  }
};
</script>

<style scoped>
</style>

