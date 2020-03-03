<template>
  <v-row>
    <!--image reload start-->
    <!-- <v-col md="12">{{value}}</v-col> -->
    <template v-if="modeReload">
      <template v-if="field.required">
        <!-- <v-col md="12">
          <em>* Required field record only to be replaced</em>
        </v-col>-->
        <v-col md="12" v-if="!isReplace">
          <div :class="{required : field.required}">
            <b>{{field.name}}</b>
          </div>
          <template v-for="(file, index) in field.attachedFiles">
            <template v-if="getFileExt(file.fileInfo.path) == 'pdf'">
              <v-img
                src="/img/pdf-icon.png"
                @click="viewPdf(file)"
                max-width="150"
                :key="file.id"
              />
            </template>
            <template v-else>
              <v-img :key="file.id" :src="base_uri+file.fileInfo.path" max-width="350"></v-img>
            </template>
            <template v-if="field.required">
              <v-btn x-small :key="index" color="error" @click="replaceAttached(index)">
                <v-icon small left>autorenew</v-icon>Replace
              </v-btn>
            </template>
          </template>
        </v-col>
        <v-col md="8" v-else>
          <v-file-input
            dense
            :hint="field.description"
            :clearable="clearable"
            outlined
            max-width="100%"
            show-size
            counter
            :error="isError"
            accept="image/*"
            v-model="file"
            @change="onFilePicked"
          >
            <template v-slot:label>
              <div :class="{required : field.required}">{{field.name}}</div>
            </template>
          </v-file-input>
          <v-btn x-small color="accent" @click="cancelReplaceAttached" v-if="isReplaceBtn">
            <v-icon small left>replay</v-icon>cancel replace
          </v-btn>
        </v-col>
      </template>
      <template v-else>
        <v-col md="12" v-if="field.attachedFiles.length > 0">
          <div :class="{required : field.required}">
            <b>{{field.name}}</b>
          </div>
          <template v-for="(file, index) in field.attachedFiles">
            <v-img :key="file.id" :src="base_uri+file.fileInfo.path" max-width="350"></v-img>
            <v-btn x-small :key="index" color="error" @click="removeAttached(index)">
              <v-icon small left>delete</v-icon>remove
            </v-btn>
          </template>
        </v-col>
        <v-col md="8" v-else>
          <v-file-input
            dense
            :hint="field.description"
            :clearable="clearable"
            outlined
            max-width="100%"
            show-size
            counter
            :error="isError"
            accept="image/*"
            v-model="file"
            @change="onFilePicked"
          >
            <template v-slot:label>
              <div :class="{required : field.required}">{{field.name}}</div>
            </template>
          </v-file-input>
        </v-col>
      </template>
    </template>
    <!--image reload end-->

    <!-- image new start -->
    <v-col md="8" v-if="!modeReload">
      <v-file-input
        dense
        :hint="field.description"
        :clearable="clearable"
        outlined
        max-width="100%"
        show-size
        counter
        :error="isError"
        accept="image/png, image/jpeg, application/pdf"
        v-model="file"
        @change="onFilePicked"
      >
        <!-- :rules="[rules.maxSize, rules.minSize, checkRequired]" -->
        <template v-slot:label>
          <div :class="{required : field.required}">{{field.name}}</div>
        </template>
      </v-file-input>
      <span class="subtitle">Min: {{field.minSize}} - Max: {{field.maxSize}} Byte</span>
    </v-col>
    <!-- image new end -->
    <!--image preview new start-->
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
        <template v-if="ext == 'pdf'">
          <v-img src="/img/pdf-icon.png" contain max-height="150" />
        </template>
        <template v-else>
          <v-img class="ml-5" :src="imageUrl" contain max-width="250" v-if="imageUrl" />
        </template>
      </v-expand-transition>
    </v-col>
    <v-col md="5">
      <template v-if="!uploaded">
        <v-btn v-if="imageUrl" x-small color="primary" @click="uploadFile">
          <v-icon left small>cloud_upload</v-icon>upload
        </v-btn>
      </template>
      <v-btn dark depressed fab small color="green" v-if="uploaded">
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn icon small color="red" @click="removeFile" v-if="removeFileBtn">
        <v-icon small>close</v-icon>
      </v-btn>
    </v-col>
    <!--image preview new end-->
  </v-row>
</template>
<script>
import bus from "@/config/bus";
import auth from "@/config/auth";
import { validationMixins } from "@/mixins/validationMixins";
import { uuid } from "vue-uuid";
import * as config from "@/config/config";

export default {
  mixins: [validationMixins],
  props: ["field", "index", "modeReload"],
  components: {},
  data: function() {
    return {
      isReplace: false,
      isReplaceBtn: true,
      clearable: false,
      valueDeterminate: 0,
      value: [],
      imageName: "",
      imageUrl: null,
      file: null,
      headers: {},
      progressShow: false,
      uploaded: false,
      removeFileBtn: false,
      fileInfo: { id: "", path: "", size: "" },
      ext: "",
      uploadUri: "",
      base_uri: "",
      isError: true
    };
  },
  watch: {
    fileInfo: function() {
      var params = {
        fieldId: this.field.id,
        fileInfoIdList: this.value,
        type: this.field.type
      };
      bus.$emit("getValue", params, this.index);
    },
    value() {
      var params;
      if (this.modeReload) {
        params = {
          fieldId: this.field.id,
          value: this.value,
          type: this.field.type
        };
      }
      bus.$emit("getValue", params, this.index);
    }
  },
  mounted() {
    if (this.field.required) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  },
  created() {
    var mode = sessionStorage.getItem("uploadMode");
    if (process.env.NODE_ENV === "production") {
      this.base_uri = "https://innov.id/bara-inovasi/storage/app";
    } else {
      // this.base_uri = "http://localhost:8001/bara-inovasi/storage/app";
      this.base_uri = "http://localhost/bara-inovasi/storage/app";
    }
    if (this.modeReload) {
      for (var i = 0; i < this.field.attachedFiles.length; i++) {
        this.value[i] = this.field.attachedFiles[i].fileInfo.id;
      }
    }
    if (mode == "founder") {
      this.uploadUri = "/founder/file-upload";
    } else if (mode == "team") {
      this.uploadUri =
        "/founder/as-team-member/" + this.$route.params.teamId + "/file-upload";
    } else if (mode == "personnel") {
      this.uploadUri = "/personnel/file-upload";
    }
  },
  methods: {
    onFilePicked() {
      this.uploaded = false;
      this.progressShow = false;
      const files = this.file;
      const fr = new FileReader();

      var name = uuid.v4() + "_" + files.name;
      var str = name.replace(/(?:\.(?![^.]+$)|[^\w\d\n.])+/g, "");
      this.fileInfo.path = str;
      this.headers["fileName"] = str;

      fr.readAsDataURL(files);
      fr.addEventListener(
        "load",
        () => {
          this.imageUrl = fr.result;
        },
        false
      );
      this.ext = files.name.split(".").pop();
      this.removeFileBtn = true;
    },
    removeFile() {
      this.file = null;
      this.imageUrl = null;
      this.ext = "";
      this.removeFileBtn = false;
      this.uploaded = false;
      this.fileInfo = { id: "", path: "", size: "" };
      if (this.field.required) {
        this.isError = true;
      } else {
        this.isError = false;
      }
      if (!this.modeReload) {
        this.value = [];
      }
    },
    uploadFile() {
      this.headers["Content-Type"] = "image/*";
      this.headers["Authorization"] = auth.getToken();
      var app = this;
      this.progressShow = true;
      this.axios
        .post(config.baseUri + this.uploadUri, this.file, {
          headers: this.headers,
          onUploadProgress(e) {
            if (e.lengthComputable) {
              // console.log((e.loaded / e.total) * 100);
              app.valueDeterminate = Math.round((e.loaded / e.total) * 100);
            }
          }
        })
        .then(res => {
          this.uploaded = true;
          this.value[0] = res.data.data.id;
          this.fileInfo = res.data.data;
          this.isError = false;
          this.isReplaceBtn = false;
        })
        .catch(res => {
          this.uploaded = false;
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.progressShow = false;
        });
    },
    // eslint-disable-next-line no-unused-vars
    replaceAttached(index) {
      this.isReplace = true;
      if (this.field.required) {
        this.isError = true;
      } else {
        this.isError = false;
      }
    },
    // eslint-disable-next-line no-unused-vars
    removeAttached(index) {
      this.field.attachedFiles = [];
      this.value = [];
    },
    cancelReplaceAttached() {
      this.isReplace = false;
      this.removeFile();
    },
    getFileExt(path) {
      return path.split(".").pop();
    }
  }
};
</script>

<style scoped>
</style>

