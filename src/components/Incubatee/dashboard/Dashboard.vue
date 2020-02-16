<template>
  <v-container extend grid-list-xs>
    <v-row name="one">
      <!-- <v-col md="3">{{user}}</v-col> -->
      <!-- <v-col md="12">{{teamId}}</v-col> -->
      <v-col cols="12" sm="4" md="4" xs="12">
        <v-card @click="$router.push({path: '/incubatee/profile'})">
          <v-card-title style="word-break: break-word;" primary-title>
            <v-col style="max-width:100% !important" md="5">
            <v-card color="primary" class="pa-9 elevation-7">
              <v-icon color="#fff" x-large>folder_shared</v-icon>
            </v-card>
            </v-col>
            <v-col md="6" sm="12">
              <h3 class="headline mb-0">Profile</h3>
              <h4 class="subtitle-2 grey--text" style="word-break: normal !important;">fill in the profile form based on your experience</h4>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="4" xs="12">
        <v-card @click="$router.push({path: '/incubatee/membership'})">
          <v-card-title style="word-break: break-word;" primary-title>
            <v-col style="max-width:100% !important" md="5">
            <v-card color="primary" class="pa-9 elevation-7">
              <v-icon color="#fff" style="width:40px;position: relative;left: 23px;" x-large>groups</v-icon>
            </v-card>
            </v-col>
            <v-col md="6" sm="12">
              <h3 class="headline mb-0">Team</h3>
              <h4 class="subtitle-2 grey--text" style="word-break: normal !important;">Create your team before register the program</h4>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
      
    </v-row>

    <v-row v-if="participationList.total > 0">
      <v-col>
        <v-data-iterator :items="participationList.list" hide-default-footer :loading="tableLoad">
          <template v-slot:header>
            <v-toolbar class="kastemtoolbar mb-2" color="grey darken-5" dark flat dense>
              <v-toolbar-title>Participated Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
                <v-card hover class="elevation-10">
                  <v-img src="/img/part-program.png"></v-img>
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
                          dark
                          color="warning"
                          router
                          :to="'/incubatee/team/' + teamId + '/participation'"
                        >Quit Program</v-btn>
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

    <v-row v-if="registrationList.total > 0">
      <v-col>
        <v-data-iterator :items="registrationList.list" hide-default-footer>
          <template v-slot:header>
            <v-toolbar class="kastemtoolbar mb-2" color="grey darken-5" dark flat dense>
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
                          dark
                          color="warning"
                          router
                          :to="'/incubatee/team/' + teamId + '/application'"
                        >Cancel registration</v-btn>
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

    <v-row v-if="teamId != '' ">
      <v-col>
        <v-data-iterator :items="availableList.list" hide-default-footer :loading="tableLoad3">
          <template v-slot:header>
            <v-toolbar class="kastemtoolbar mb-2" color="grey darken-5" dark flat dense>
              <v-toolbar-title>Available Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <v-row class="mt-5">
              <v-col md="2"></v-col>
              <v-col md="4">
                <v-img width="300" src="/img/no-data-program.png"></v-img>
              </v-col>
              <v-col md="4">
                <v-card v-if="teamId == '' " style="margin-top:27px;" flat>
                  <v-card-title>
                    Create team first
                  </v-card-title>
                  <v-card-subtitle>
                    You can join a program if you have a team, minimum with 2 members
                  </v-card-subtitle>
                </v-card>
                <v-card v-else style="margin-top:27px;" flat>
                  <v-card-title>
                    No Program Available
                  </v-card-title>
                  <v-card-subtitle class="grey--text">
                    You have already join all available program or you haven't join at all, create team first before join a program
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn v-if="teamId != '' " router to="/incubatee/membership">create Team</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="2"></v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="4">
                <v-card>
                  <v-img src="/img/hero-program.jpg"></v-img>
                  <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Description: </v-list-item-content>
                    </v-list-item>
                     <v-list-item>
                      <v-list-item-content class="grey--text">{{ item.description }}</v-list-item-content>
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
      participationId: "",
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
    bus.$on("changeDashboardParticipant", participationId => {
      this.participationId = participationId;
    });
    this.teamId = localStorage.getItem("DashboardTeamId");
    this.participationId = localStorage.getItem("DashboardParticipantId");
  },
  watch: {
    teamId() {
      this.getParticipant();
      this.getDataList();
      this.getDataList2();
    }
  },
  mounted() {
    // if (this.teamId != "" && this.participationId != "") {
    //   this.$router.push({
    //     path:
    //       "/incubatee/team/" +
    //       this.teamId +
    //       "/participation/" +
    //       this.participationId +
    //       "/mission"
    //   });
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
.minicard {
  position: relative;
  right: 30px;
}
.kastemtoolbar:before {
  content: '';
  position: absolute;
  /* top: 0; */
  right: 0;
  border-top: 40px solid var(--v-kastemkolor-base);
  border-left: 40px solid rgb(158, 158, 158);
  width: 54%;
}
</style>