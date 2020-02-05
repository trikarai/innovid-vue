<template>
  <v-container extend grid-list-xs>
    <v-row v-if="loader">
      <v-col>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-0 pb-0" md="8">
        <!-- Edit mode : {{edit}} -->
        <v-row>
          <v-col>
            <v-text-field filled label="Learning Material Name" v-model="dataSingle.name"></v-text-field>
          </v-col>
          <v-col>
            <v-btn style="margin-top: 3px;" :disabled="loader" :loading="loader" color="primary" @click="submitContent()" x-large>save</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col  class="my-0 py-0" md="12">
        <v-alert
        dense
          type="info"
          border="left"
          dismissible
        >Allowed Iframe: www.youtube.com, docs.google.com, www.dailymotion.com</v-alert>
      </v-col>
      <v-col class="mt-0 pt-0" md="12">
        <editor
          apiKey="qwl0dmwea6620culdxb0sbj63braksrehy48ynig0btowjqd"
          v-model="dataSingle.content"
          :disabled="loader"
          :init="{
      height: 500,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap',
        'searchreplace visualblocks code fullscreen',
        'print preview anchor insertdatetime media',
        'paste code help wordcount table'
      ],
      toolbar:
        'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | code | help'
    }"
        ></editor>
      </v-col>
      
      <v-col md="12">
        <v-btn :disabled="loader" :loading="loader" color="primary" @click="submitContent()" x-large>save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import Editor from "@tinymce/tinymce-vue";

export default {
  data() {
    return {
      loader: false,
      edit: false,
      dataSingle: {
        name: "",
        content: ""
      }
    };
  },
  components: { editor: Editor },
  created() {
    if (this.$route.params.learningId) {
      this.edit = true;
      this.getDataSingle();
    } else {
      this.edit = false;
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getDataSingle() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials/" +
            this.$route.params.learningId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    submitContent() {
      this.loader = true;
      if (this.edit) {
        this.axios
          .patch(
            config.baseUri +
              "/personnel/as-admin/programs/" +
              this.$route.params.programId +
              "/missions/" +
              this.$route.params.missionId +
              "/learning-materials/" +
              this.$route.params.learningId,
            this.dataSingle,
            {
              headers: auth.getAuthHeader()
            }
          )
          .then(() => {
            bus.$emit("callNotif", "success", "Content Uploaded");
            this.$router.go(-1);
          })
          .catch(res => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loader = false;
          });
      } else {
        this.axios
          .post(
            config.baseUri +
              "/personnel/as-admin/programs/" +
              this.$route.params.programId +
              "/missions/" +
              this.$route.params.missionId +
              "/learning-materials",
            this.dataSingle,
            {
              headers: auth.getAuthHeader()
            }
          )
          .then(() => {
            bus.$emit("callNotif", "success", "Content Uploaded");
            this.$router.go(-1);
          })
          .catch(res => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loader = false;
          });
      }
    }
  }
};
</script>
