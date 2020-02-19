<template>
  <v-container extend grid-list-xs>
    <!-- <v-row>
      <v-col md="8" xs="12">{{dataSingle}}</v-col>
    </v-row>-->
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12" v-if="loader">
        <v-card class="pa-3">
          <v-skeleton-loader max-width="300" type="heading, list-item-two-line@4"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12" v-else>
        <v-card>
          <v-card-title primary-title>
            {{dataSingle.profileForm.name}}
            <v-spacer></v-spacer>
            <v-btn
              small
              color="primary"
              :to="'/incubatee/profile-form/'+ dataSingle.profileForm.id +'/add'"
            >Edit</v-btn>
          </v-card-title>
          <v-card-text class="pt-0 mt-2 ml-3">
            <render-record :fields="fields" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { profileForm: { name: "" } },
      fields: [],
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: ""
    };
  },
  components: { RenderRecord },
  created: function() {},
  mounted: function() {
    this.getDataSingle();
  },
  methods: {
    getDataSingle() {
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(
          config.baseUri + "/founder/profiles/" + this.$route.params.profileId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
          this.refactorRecordJSON(res.data.data);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>