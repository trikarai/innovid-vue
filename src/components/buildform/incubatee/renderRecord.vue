<template>
  <div>
    <!-- <v-switch label="label" v-model="jancux"></v-switch> -->
    <!-- start kiri kanan-->
    <template v-if="!canvasMode">
      <v-row v-if="fields.length != 0" class="tabel-row"></v-row>
      <template v-for="(data, index) in reOrderRecord(fields)">
        <v-row :key="index">
          <v-col
            style="word-break: break-word;background:#ecfbff"
            class="tabel-left"
            md="4"
            lg="4"
            xs="12"
          >
            <span class="subtitle-2 font-weight-black">
              <span class="left-accent2"></span>
              {{ data.field.name }}
            </span>
          </v-col>
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
            :key="data.id"
            v-if="data.type == 'string'"
            >{{ data.value }}</v-col
          >
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
            :key="data.id"
            v-if="data.type == 'integer'"
            >{{ data.value }}</v-col
          >
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
            :key="data.id"
            v-if="data.type == 'textarea'"
            >{{ data.value }}</v-col
          >
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
            :key="data.id"
            v-if="data.type == 'radio'"
          >
            <template v-if="data.selectedOption != null">{{
              data.selectedOption.name
            }}</template>
            <template v-else>-</template>
          </v-col>
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
            :key="data.id"
            v-if="data.type == 'select'"
          >
            <template v-if="data.selectedOptions.length == 0">-</template>
            <template v-for="opt in data.selectedOptions"
              >{{ opt.option.name }} ,</template
            >
          </v-col>
          <v-col
            style="background:#fff;"
            class="tabel-right"
            md="8"
            lg="8"
            xs="12"
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
                    max-width="300"
                    :name="file.id"
                    :src="base_uri + file.fileInfo.path"
                    :key="file.id"
                    @click="viewImage(file)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary lighten-5"
                        ></v-progress-circular>
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

    <template v-if="canvasMode">
      <div class="grid-container">
        <template v-for="data in fields">
          <v-card
            class="ma-1"
            :style="'grid-area:' + data.field.position"
            :key="data.id"
            elevation="2"
            outlined
          >
            <v-card-title>
              <span class="left-accent"></span>
              <span class="subtitle">{{ data.field.name }}</span>
            </v-card-title>
            <v-card-text v-if="data.type == 'textarea'">{{
              data.value
            }}</v-card-text>
            <v-card-text v-if="data.type == 'string'">{{
              data.value
            }}</v-card-text>
            <v-card-text v-if="data.type == 'integer'">{{
              data.value
            }}</v-card-text>
            <v-card-text v-if="data.type == 'attachment'">
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
                      max-width="300"
                      :name="file.id"
                      :src="base_uri + file.fileInfo.path"
                      :key="file.id"
                      @click="viewImage(file)"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="primary lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </template>
                </template>
              </template>
            </v-card-text>
          </v-card>
        </template>
      </div>
    </template>

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
    <v-dialog
      v-model="dialogZoom"
      scrollable
      :overlay="true"
      transition="dialog-transition"
    >
      <v-card>
        <v-img
          class="ZoomOutImg"
          :name="fileDetail.id"
          :src="base_uri + fileDetail.fileInfo.path"
          :key="fileDetail.id"
          @click="dialogZoom = false"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogPdf"
      :fullscreen="isFullscreen"
      scrollable
      :overlay="true"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-actions>
          <v-btn icon color="red" @click="dialogPdf = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn icon @click="isFullscreen = !isFullscreen">
            <v-icon v-if="!isFullscreen">fullscreen</v-icon>
            <v-icon v-else>fullscreen_exit</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            small
            color="accent"
            :href="base_uri + fileDetail.fileInfo.path"
            target="_blank"
          >
            <v-icon>pageview</v-icon>
          </v-btn>
          <v-btn text icon small @click="$refs.pdf.print()">
            <v-icon>print</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col md="12" v-if="loadedRatio > 0 && loadedRatio < 1">
              <div
                style="background-color: green; color: white; text-align: center"
                :style="{ width: loadedRatio * 100 + '%' }"
              >
                {{ Math.floor(loadedRatio * 100) }}%
              </div>
            </v-col>
            <v-col md="12">
              <v-btn
                color="primary"
                :disabled="page == 1"
                icon
                @click="page = page - 1"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
              {{ page }} / {{ numPages }}
              <v-btn
                color="primary"
                :disabled="page == numPages"
                icon
                @click="page = page + 1"
              >
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <pdf
                ref="pdf"
                style="border: 1px solid red"
                :src="base_uri + fileDetail.fileInfo.path"
                :page="page"
                @progress="loadedRatio = $event"
                @num-pages="numPages = $event"
                @link-clicked="page = $event"
              ></pdf>
            </v-col>
            <v-col md="12">
              <v-btn
                color="primary"
                :disabled="page == 1"
                icon
                @click="page = page - 1"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
              {{ page }} / {{ numPages }}
              <v-btn
                color="primary"
                :disabled="page == numPages"
                icon
                @click="page = page + 1"
              >
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
  props: ["fields", "canvasMode"],
  data() {
    return {
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      base_uri: "",
      jancux: false,
      dialogZoom: false,
      dialogPdf: false,
      fileDetail: { id: "", fileInfo: { path: "" } },
      isFullscreen: false,
      keyState: null,
      basedomain: "",
    };
  },
  components: {
    pdf,
  },

  mounted() {},
  destroyed() {
    window.removeEventListener("keypress", this.doCommand);
  },
  created() {
    window.addEventListener("keypress", this.doCommand);
    this.basedomain = location.protocol + "//" + location.hostname;
    if (process.env.NODE_ENV === "production") {
      this.base_uri = this.basedomain + "/bara-inovasi/storage/app";
    } else {
      // this.base_uri = "http://localhost:8001/bara-inovasi/storage/app";
      this.base_uri = this.basedomain + "/bara-inovasi/storage/app";
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
    },
    doCommand(e) {
      // eslint-disable-next-line no-unused-vars
      let cmd = e.keyCode;
      if (cmd == 46 || cmd == 34 || cmd == 40 || cmd == 39) {
        if (this.page < this.numPages) {
          this.page = this.page + 1;
          this.keyState = cmd;
        }
      } else if (cmd == 44 || cmd == 33 || cmd == 38 || cmd == 37) {
        if (this.page > 1) {
          this.page = this.page - 1;
        }
        this.keyState = cmd;
      } else {
        this.keyState = null;
      }
      /*
			How we respond depends on our state. If keyState is null,
			it meand we aren't doing anything, so BSM are valid.
			*/
    },
  },
};
</script>
<style scoped>
.grid-container {
  display: grid;
}
.v-responsive,
.v-image:hover {
  cursor: zoom-in;
}
/* .v-responsive, .v-image, .ZoomOutImg {
  cursor: zoom-out;
} */

.tabel-right {
  border: solid 2px #d2d2d2;
  border-top: none;
}
.tabel-left {
  border: solid 2px #d2d2d2;
  border-top: none;
  border-right: none;
}
.tabel-row {
  border-bottom: solid 2px #d2d2d2;
}
.left-accent {
  background: #00667f;
  width: 4px;
  height: 20px;
  display: inline-block;
  margin-right: 6px;
  /* top: 2px; */
  position: relative;
}
.left-accent2 {
  background: #00667f;
  width: 4px;
  height: 16px;
  display: inline-block;
  margin-right: 6px;
  top: 3px;
  position: relative;
}
.taitel {
  background: #8b8b8b;
  color: #fff;
  padding: 19px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
  border-left-style: solid;
  border-left-color: black;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
