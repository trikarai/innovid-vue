<template>
  <div>
    <!-- {{fields}} -->
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
            <!-- {{file.fileInfo.path}} -->
            <v-img :name="file.id" :src="base_uri+file.fileInfo.path" :key="file.id" />
          </template>
          <!-- ajig teu kaluar wae sas
          <img
            src="https://i.picsum.photos/id/768/85/85.jpg"
            alt="Smiley face"
            height="42"
            width="42"
          />-->
        </template>
      </v-row>
    </template>
  </div>
</template>
<script>
// import * as config from "@/config/config";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  props: ["fields"],
  data() {
    return {
      base_uri: ""
    };
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      this.base_uri = "https://innov.id/bara-inovasi/bara-inovasi/storage/app";
    } else {
      this.base_uri = "http://localhost:8001/bara-inovasi/storage/app";
    }
  }
};
</script>
<style scoped>
</style>