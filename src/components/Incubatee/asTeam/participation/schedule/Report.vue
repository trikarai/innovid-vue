<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="8" xs="12"></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title primary-title>Mentoring Report</v-card-title>
          <v-card-text>
            <template v-for="data in fields">
              <v-row :key="data.id">
                <v-col md="2" class="sub-title">{{data.field.name}}</v-col>
                <v-col md="6" class="display-1">{{data.value}}</v-col>
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
// import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

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
  components: {},
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
          //   config.baseUri +
          "http://localhost:3004/api" +
            "/incubatee/as-team-member/" +
            this.$route.params.teamId +
            "/cohort-participations/" +
            this.$route.params.cohortId +
            "/schedules/" +
            this.$route.params.scheduleId +
            "/participant-mentoring-report",
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