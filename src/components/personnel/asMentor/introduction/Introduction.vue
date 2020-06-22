<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="6">
        <v-select
          :loading="loadingData"
          v-model="selectedCohort"
          label="Program"
          :items="dataMentorships.list"
          item-text="program.name"
          return-object
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <template v-if="!edit">
      <v-row v-if="selectedCohort.introduction === null">
        <v-col cols="12" lg="12" md="12">
          <v-btn color="primary" @click="openEditor">Add Introduction</v-btn>
        </v-col>
        <v-col cols="12" lg="12" md="12">
          <v-alert type="info"
            >You don't have self introduction on selected program</v-alert
          >
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" lg="12">
          <v-btn color="primary" small @click="edit = true">Edit</v-btn>
        </v-col>
        <v-col cols="12" lg="12">
          <v-card>
            <v-card-text>
              <!-- <span v-html="$sanitize(selectedCohort.introduction)" /> -->
              <div v-html="marked(selectedCohort.introduction)"></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <v-row v-if="edit">
      <v-col cols="12" lg="12" class="mt-0 pt-0" md="12">
        <v-btn color="warning" small @click="edit = false">Cancel</v-btn>
      </v-col>
      <v-col cols="12" lg="12" class="mt-0 pt-0" md="12">
        <vue-simplemde
          v-model="selectedCohort.introduction"
          ref="markdownEditor"
        />
        <!-- <editor
          apiKey="qwl0dmwea6620culdxb0sbj63braksrehy48ynig0btowjqd"
          v-model="selectedCohort.introduction"
          :disabled="loader"
          :init="{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap',
              'searchreplace visualblocks code fullscreen',
              'print preview anchor insertdatetime media',
              'paste code help wordcount table',
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | code | help',
          }"
        ></editor> -->
        <v-btn :loading="loader" class="mt-5" color="primary" @click="submit"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueSimplemde from "vue-simplemde";
// eslint-disable-next-line no-unused-vars
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
// import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    // editor: Editor,
    VueSimplemde,
  },
  data() {
    return {
      dataMentorships: { total: 0, list: [] },
      loadingData: false,
      loader: false,
      selectedCohort: {
        id: "",
        program: {
          id: "",
          name: "",
        },
        introduction: null,
      },
      edit: false,
    };
  },
  watch: {},
  mounted() {
    this.getMentorship();
  },
  methods: {
    getMentorship() {
      this.loadingData = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.dataMentorships = res.data.data;
          this.selectedCohort = res.data.data.list[0];
        })
        .catch(() => {})
        .finally(() => {
          this.loadingData = false;
        });
    },
    openEditor() {
      this.edit = true;
    },
    submit() {
      this.loader = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/mentorships/update-introduction/" +
            this.selectedCohort.id,
          { introduction: this.selectedCohort.introduction },
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then(() => {
          this.getMentorship();
        })
        .catch(() => {})
        .finally(() => {
          this.edit = false;
          this.loader = false;
        });
    },
  },
};
</script>
<style scoped></style>
