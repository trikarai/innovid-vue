<template>
  <v-row>
    <v-col>
      <!-- {{fileInfo}} -->
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
        <v-img class="ml-5" :src="imageUrl" contain max-width="250" v-if="imageUrl" />
      </v-expand-transition>
    </v-col>
    <v-col md="3">
      <template v-if="!uploaded">
        <v-btn v-if="imageUrl" small fab color="warning" @click="uploadFile">
          <v-icon>cloud_upload</v-icon>
        </v-btn>
      </template>
      <v-btn depressed fab small color="green" v-if="uploaded">
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn icon small color="red" @click="removeFile" v-if="removeFileBtn">
        <v-icon>close</v-icon>
      </v-btn>
    </v-col>
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
      progressShow: false,
      uploaded: false,
      removeFileBtn: false,
      fileInfo: { id: "", path: "", size: "" },
      ext: "",
      uploadUri: ""
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
    }
  },
  created() {
    var mode = sessionStorage.getItem("uploadMode");
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

