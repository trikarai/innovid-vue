<template>
  <div>
    <!-- {{fields}} -->
    <!-- <v-switch label="label" v-model="jancux"></v-switch> -->
    <!-- start kiri kanan-->
    <template>
      <!-- {{fields}} -->
      <template v-for="(data, index) in reOrderField(fields)">
        <v-row :key="index">
          <v-col md="4" lg="4" xs="12">
            <span class="subtitle-2 font-weight-black">{{data.field.name}}</span>
          </v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'string'"
          >{{data.value}}</v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'integer'"
          >{{data.value}}</v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'textarea'"
          >{{data.value}}</v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'radio'"
          >
            <template v-if="data.selectedOption != null">{{data.selectedOption.name}}</template>
            <template v-else>-</template>
          </v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'select'"
          >
            <template v-if="data.selectedOptions.length == 0">-</template>
            <template v-for="opt in data.selectedOptions">{{opt.option.name}} ,</template>
          </v-col>
          <v-col
            md="8"
            lg="8"
            xs="12"
            class="mb-4 grey--text"
            :key="data.id"
            v-if="data.type == 'attachment'"
          >
            <template v-if="data.attachedFiles.length == 0">-</template>
            <template v-else>
              <template v-for="file in data.attachedFiles">
                <template v-if="getFileExt(file.fileInfo.path) == 'pdf'">
                  <v-img
                    src="/img/pdf-icon.png"
                    @click="viewPdf(file)"
                    contain
                    max-height="150"
                    :key="file.id"
                  />
                </template>
                <template v-else>
                  <v-img
                    :name="file.id"
                    :src="base_uri+file.fileInfo.path"
                    :key="file.id"
                    @click="viewImage(file)"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </template>
              </template>
            </template>
          </v-col>
        </v-row>
      </template>
    </template>
    <!-- end kiri kanan-->

    <!-- start atas bawah-->
    <!-- <template v-if="!jancux">
      <template v-for="(data, index) in reOrderField(fields)">
        <v-row :key="index">
          <b>{{data.field.name}}</b>
        </v-row>
        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'string'">{{data.value}}</v-row>
        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'integer'">{{data.value}}</v-row>
        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'textarea'">{{data.value}}</v-row>

        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'radio'">
          <template v-if="data.selectedOption != null">{{data.selectedOption.name}}</template>
          <template v-else>-</template>
        </v-row>

        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'select'">
          <template v-if="data.selectedOptions.length == 0">-</template>
          <template v-for="opt in data.selectedOptions">{{opt.option.name}} ,</template>
        </v-row>

        <v-row class="mb-4 grey--text" :key="data.id" v-if="data.type == 'attachment'">
          <template v-if="data.attachedFiles.length == 0">-</template>
          <template v-else>
            <template v-for="file in data.attachedFiles">
              {{file.fileInfo.path}}
              <v-img :name="file.id" :src="base_uri+file.fileInfo.path" :key="file.id" />
            </template>
            ajig teu kaluar wae sas
          <img
            src="https://i.picsum.photos/id/768/85/85.jpg"
            alt="Smiley face"
            height="42"
            width="42"
            />
          </template>
        </v-row>
      </template>
    </template>-->
    <!-- end atas bawah-->
    <v-dialog v-model="dialogZoom" scrollable :overlay="true" transition="dialog-transition">
      <v-card>
        <v-img
          class="ZoomOutImg"
          :name="fileDetail.id"
          :src="base_uri+fileDetail.fileInfo.path"
          :key="fileDetail.id"
          @click="dialogZoom = false"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogPdf" scrollable :overlay="true" transition="dialog-transition">
      <v-card>
        <v-card-actions>
          <v-btn flat icon color="red" @click="dialogPdf = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            small
            color="accent"
            :href="base_uri + fileDetail.fileInfo.path"
            target="_blank"
          >
            <v-icon>pageview</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <pdf :src="base_uri+fileDetail.fileInfo.path"></pdf>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import * as config from "@/config/config";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";
import pdf from "vue-pdf";

export default {
  mixins: [formDynamicMixins],
  props: ["fields"],
  data() {
    return {
      base_uri: "",
      jancux: false,
      dialogZoom: false,
      dialogPdf: false,
      fileDetail: { id: "", fileInfo: { path: "" } }
    };
  },
  components: {
    pdf
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      this.base_uri = "https://innov.id/bara-inovasi/storage/app";
    } else {
      // this.base_uri = "http://localhost:8001/bara-inovasi/storage/app";
      this.base_uri = "http://localhost/bara-inovasi/storage/app";
    }
  },
  methods: {
    getFileExt(path) {
      return path.split(".").pop();
    },
    viewImage(file) {
      this.fileDetail = file;
      this.dialogZoom = true;
    },
    viewPdf(file) {
      this.fileDetail = file;
      this.dialogPdf = true;
    }
  }
};
</script>
<style scoped>
.v-responsive,
.v-image:hover {
  cursor: zoom-in;
}
/* .v-responsive, .v-image, .ZoomOutImg {
  cursor: zoom-out;
} */
</style>
