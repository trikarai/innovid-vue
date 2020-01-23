<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-card>
          <v-card-title primary-title>{{dataSingle.name}}</v-card-title>
          <v-card-text class="pt-0 mt-2 ml-3">
            <template v-for="data in fields">

                <!-- {{data}} -->
                <v-row :key="data.id">
                  <b>{{data.field.name}}</b>
                </v-row>
                <v-row class="mb-4 grey--text" :key="data.id">
                  {{data.value}}
                </v-row>

            </template>
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

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      teamId: this.$route.params.teamId,
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: {},
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
  components: {},
  created: function() {},
  mounted: function() {
    this.getDataSingle();
  },
  methods: {
    getDataSingle() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.$route.params.worksheetId,
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
          this.tableLoad = false;
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