<template>
  <v-container extend grid-list-xs>
    <v-row>
      <v-col md="8" xs="12"></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title primary-title>{{dataSingle.mentoring.name}}</v-card-title>
          <v-card-title subheader>{{dataSingle.participant.team.name}}</v-card-title>
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
import * as config from "@/config/config";
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
          config.baseUri +
            "/personnel/mentorships/" +
            this.$route.params.mentorshipId +
            "/schedules/" +
            this.$route.params.scheduleId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
          this.refactorRecordJSON(res.data.data.mentorMentoringReport);
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