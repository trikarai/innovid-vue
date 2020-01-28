<template>
  <v-container grid-list-xs>
    <v-row name="one">
      <!-- <v-col md="3">{{user}}</v-col> -->
      <!-- <v-col md="12">{{teamId}}</v-col> -->
      <v-col md="3">
        <v-card @click="$router.push({path: '/incubatee/profile'})">
          <v-card-title primary-title>
            <v-icon left x-large>folder_shared</v-icon>
            <div>
              <h3 class="headline mb-0">Profile</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card @click="$router.push({path: '/incubatee/membership'})">
          <v-card-title primary-title>
            <v-icon left x-large>groups</v-icon>
            <div>
              <h3 class="headline mb-0">Team</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="participationList.total > 0">
      <v-col>
        <v-data-iterator :items="participationList.list" hide-default-footer :loading="tableLoad">
          <template v-slot:header>
            <v-toolbar class="mb-2" color="indigo darken-5" dark flat dense>
              <v-toolbar-title>Participated Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ item.program.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <!-- <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.program.description }}</v-list-item-content>
                    </v-list-item>-->
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="primary"
                          router
                          :to="'/incubatee/team/' + teamId + '/participation/' + item.id + '/mission'"
                        >Mission</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="primary"
                          router
                          :to="'/incubatee/team/' + teamId + '/participation/' + item.id + '/schedule'"
                        >Mentoring</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="red"
                          router
                          :to="'/incubatee/team/' + teamId + '/participation'"
                        >Quit</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="registrationList.total > 0">
      <v-col>
        <v-data-iterator :items="registrationList.list" hide-default-footer>
          <template v-slot:header>
            <v-toolbar class="mb-2" color="indigo darken-5" dark flat dense>
              <v-toolbar-title>Registered Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ item.program.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <!-- <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.program.description }}</v-list-item-content>
                    </v-list-item>-->
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="red"
                          router
                          :to="'/incubatee/team/' + teamId + '/application'"
                        >Cancel</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="teamId != '' ">
      <v-col>
        <v-data-iterator :items="availableList.list" hide-default-footer :loading="tableLoad3">
          <template v-slot:header>
            <v-toolbar class="mb-2" color="indigo darken-5" dark flat dense>
              <v-toolbar-title>Available Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="primary"
                          router
                          :to="'/incubatee/team/' + teamId + '/application'"
                        >Apply</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
import bus from "@/config/bus";

export default {
  data() {
    return {
      user: "",
      teamId: "",
      participationList: { total: 0, list: [] },
      tableLoad: false,
      registrationList: { total: 0, list: [] },
      tableLoad2: false,
      availableList: { total: 0, list: [] },
      tableLoad3: false
    };
  },
  created() {
    bus.$on("changeDashboardTeam", teamId => {
      this.teamId = teamId;
    });
    this.teamId = localStorage.getItem("DashboardTeamId");
  },
  watch: {
    teamId() {
      this.getParticipant();
      this.getDataList();
      this.getDataList2();
    }
  },
  mounted() {
    // if (this.teamId) {
    //   this.getParticipant();
    // }
  },
  methods: {
    getParticipant() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/program-participations",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data.total != 0) {
            this.participationList = res.data.data;
          } else {
            this.participationList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getDataList() {
      this.tableLoad2 = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/programs",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.availableList = res.data.data;
          } else {
            this.availableList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad2 = false;
        });
    },
    getDataList2() {
      this.tableLoad3 = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/program-registrations",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.registrationList = res.data.data;
          } else {
            this.registrationList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad3 = false;
        });
    }
  }
};
</script>
<style scoped>
</style>