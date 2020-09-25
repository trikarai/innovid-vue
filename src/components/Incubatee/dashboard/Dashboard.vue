<template>
  <v-container fluid>
    <v-row name="one">
      <v-col cols="12" sm="4" md="5" xs="12">
        <v-card @click="$router.push({ path: '/incubatee/profile' })">
          <v-card-title style="word-break: break-word;" primary-title>
            <v-col style="max-width:100% !important" md="5">
              <v-card color="primary" class="pa-9 elevation-7">
                <v-icon color="#fff" x-large>folder_shared</v-icon>
              </v-card>
            </v-col>
            <v-col md="6" sm="12">
              <h3 class="headline mb-0">Profile</h3>
              <h4
                class="subtitle-2 grey--text"
                style="word-break: normal !important;"
              >
                fill in the profile form based on your experience
              </h4>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="5" xs="12">
        <v-card @click="$router.push({ path: '/incubatee/membership' })">
          <v-card-title style="word-break: break-word;" primary-title>
            <v-col style="max-width:100% !important" md="5">
              <v-card color="primary" class="pa-9 elevation-7">
                <v-icon
                  color="#fff"
                  style="width:40px;position: relative;left: 23px;"
                  x-large
                  >groups</v-icon
                >
              </v-card>
            </v-col>
            <v-col md="6" sm="12">
              <h3 class="headline mb-0">Team</h3>
              <h4
                class="subtitle-2 grey--text"
                style="word-break: normal !important;"
              >
                Create your team before register the program
              </h4>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <!-- team participated program end-->
    <v-row v-if="participatedPrograms.total != 0">
      <v-col>
        <v-skeleton-loader
          max-width="230"
          type="card"
          v-if="participatedLoad"
        ></v-skeleton-loader>
        <v-data-iterator
          :items="participatedPrograms.list"
          hide-default-footer
          :loading="participatedLoad"
        >
          <template v-slot:header>
            <v-toolbar
              class="kastemtoolbar mb-2"
              color="grey lighten-1"
              dark
              flat
              dense
            >
              <v-toolbar-title>Participated Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card class="elevation-7">
                  <v-img
                    v-if="item.program.removed"
                    src="/img/part-program-off.png"
                  ></v-img>
                  <v-img v-else src="/img/part-program.png">
                    <!-- <div v-if="item.program.removed" class="fill-height bottom-gradient"></div> -->
                  </v-img>
                  <v-card-title class="subheading font-weight-bold">
                    <v-badge
                      left
                      color="primary"
                      icon="star"
                      inline
                      :value="item.id == participationId"
                      >{{ item.program.name }}</v-badge
                    >
                  </v-card-title>
                  <v-divider v-if="!item.program.removed"></v-divider>
                  <template v-if="item.program.removed">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-alert
                            class="mt-4"
                            dense
                            outlined
                            type="warning"
                            border="left"
                            >Program Removed</v-alert
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                  <template v-else>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-btn
                            @click="gotoMission(teamId, item, 'mission')"
                            color="primary"
                            >Mission</v-btn
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-btn
                            color="primary"
                            @click="gotoMission(teamId, item, 'schedule')"
                            >Mentoring</v-btn
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-btn
                            dark
                            color="warning"
                            router
                            :to="'/incubatee/team/' + teamId + '/participation'"
                            >Quit Program</v-btn
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <!-- team participated program end-->
    <!-- team registered program end-->
    <v-row v-if="filterRegistration(registeredPrograms.list).length !== 0">
      <v-col>
        <v-data-iterator
          hide-default-footer
          :items="filterRegistration(registeredPrograms.list)"
        >
          <template v-slot:header>
            <v-toolbar
              class="kastemtoolbar mb-2"
              color="grey lighten-1"
              dark
              flat
              dense
            >
              <v-toolbar-title>Registered Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{
                    item.program.name
                  }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        <v-row no-gutters>
                          <v-col cols="12" xl="12" lg="12">
                            <v-alert type="info" dense outlined>
                              waiting for approval from program coordinator
                            </v-alert> </v-col
                          ><v-col cols="12" xl="12" lg="12">
                            <v-btn
                              dark
                              color="warning"
                              router
                              :to="'/incubatee/team/' + teamId + '/application'"
                              >Cancel registration</v-btn
                            ></v-col
                          >
                        </v-row>
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
    <!-- team registered program end-->
    <!-- team available program start-->
    <v-row v-if="!showFounderProgram">
      <v-col>
        <v-skeleton-loader
          max-width="230"
          type="card"
          v-if="availLoader"
        ></v-skeleton-loader>
        <v-data-iterator
          :items="availablePrograms.list"
          hide-default-footer
          :loading="availLoader"
          v-else
        >
          <template v-slot:header>
            <v-toolbar
              class="kastemtoolbar mb-2"
              color="grey lighten-1"
              dark
              flat
              dense
            >
              <v-toolbar-title>Available Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <v-row class="mt-5">
              <v-col md="6" lg="6" xs="12" sm="12">
                <v-img
                  class="mx-auto"
                  width="300"
                  src="/img/no-data-program.png"
                ></v-img>
              </v-col>
              <v-col md="6" lg="6" xs="12" sm="12">
                <v-card v-if="teamId == ''" style="margin-top:27px;" flat>
                  <v-card-title>Create team first</v-card-title>
                  <v-card-subtitle
                    >You can join a program if you have a team</v-card-subtitle
                  >
                </v-card>
                <v-card class="mx-auto" v-else style="margin-top:57px;" flat>
                  <v-card-title>No Program Available</v-card-title>
                  <v-card-subtitle class="grey--text">
                    You have already join all available program
                    <br />or the coordinator hasn't made a program yet
                    <template v-if="user.data.teamMemberships.length == 0"
                      >, create team first before join a program</template
                    >
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn
                      v-if="user.data.teamMemberships.length == 0"
                      router
                      to="/incubatee/membership"
                      >create Team</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card>
                  <v-img src="/img/hero-program.jpg"></v-img>
                  <v-card-title class="subheading font-weight-bold">{{
                    item.name
                  }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content class="grey--text">{{
                        item.description
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn
                          color="primary"
                          router
                          :to="'/incubatee/team/' + teamId + '/application'"
                          >Apply</v-btn
                        >
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
    <!-- team available program end-->
    <!-- non team founder program start-->
    <v-row v-if="showFounderProgram">
      <v-col>
        <v-skeleton-loader
          max-width="230"
          type="card"
          v-if="founderprogramLoad"
        ></v-skeleton-loader>
        <v-data-iterator
          :items="founderprograms.list"
          hide-default-footer
          :loading="founderprogramLoad"
          v-else
        >
          <template v-slot:header>
            <v-toolbar
              class="kastemtoolbar mb-2"
              color="grey lighten-1"
              dark
              flat
              dense
            >
              <v-toolbar-title>Incubator Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <v-row class="mt-5">
              <v-col md="2"></v-col>
              <v-col md="4">
                <v-img width="300" src="/img/no-data-program.png"></v-img>
              </v-col>
              <v-col md="4">
                <v-card style="margin-top:27px;" flat>
                  <v-card-title>No Program Available</v-card-title>
                  <v-card-subtitle class="grey--text"
                    >The coordinator hasn't publish a program
                    yet</v-card-subtitle
                  >
                  <v-card-text></v-card-text>
                </v-card>
              </v-col>
              <v-col md="2"></v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card>
                  <v-img src="/img/hero-program.jpg"></v-img>
                  <v-card-title class="subheading font-weight-bold">{{
                    item.name
                  }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content class="grey--text">{{
                        item.description
                      }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <!-- non team founder program end-->
  </v-container>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
import bus from "@/config/bus";

import { programMixins } from "@/mixins/programMixins";

export default {
  mixins: [programMixins],
  data() {
    return {
      user: {
        data: {
          teamMemberships: [],
        },
      },
      teamId: "",
      participationId: "",
      participatedPrograms: { total: 0, list: [] },
      participatedLoad: false,
      tableLoad: false,
      registeredPrograms: { total: 0, list: [] },
      tableLoad2: false,
      availablePrograms: { total: 0, list: [] },
      tableLoad3: false,
      availLoader: false,
      founderprograms: { total: 0, list: [] },
      founderprogramLoad: false,
      showFounderProgram: true,
    };
  },
  created() {
    bus.$on("changeDashboardTeam", (teamId) => {
      this.teamId = teamId;
    });
    bus.$on("changeDashboardParticipant", (participationId) => {
      this.participationId = participationId;
    });
    bus.$on("getAvailProgram", (teamId) => {
      this.teamId = teamId;
      this.getAvailablePrograms();
    });
    if (localStorage.getItem("DashboardTeamId")) {
      this.teamId = localStorage.getItem("DashboardTeamId");
    }
    if (localStorage.getItem("DashboardParticipantId")) {
      this.participationId = localStorage.getItem("DashboardParticipantId");
    }
  },
  watch: {
    teamId() {
      this.getParticipant();
      this.getAvailablePrograms();
      this.getRegisteredPrograms();
    },
  },
  mounted() {
    // this.user = JSON.parse(auth.getAuthData());
    // if (!localStorage.getItem("DashboardTeamId")) {
    this.getFounderProgram();
    // } else {
    //   this.showFounderProgram = false;
    // }
  },
  methods: {
    getFounderProgram() {
      this.founderprogramLoad = true;
      this.axios
        .get(config.baseUri + "/founder/programs", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.founderprograms = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.founderprogramLoad = false;
        });
    },
    getParticipant() {
      this.participatedLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/program-participations",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data.total != 0) {
            this.participatedPrograms.total = this.filterActiveParticipation(
              res.data.data.list
            ).length;
            this.participatedPrograms.list = this.filterActiveParticipation(
              res.data.data.list
            );
          } else {
            this.participatedPrograms = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.participatedLoad = false;
        });
    },
    getAvailablePrograms() {
      this.tableLoad2 = true;
      this.availLoader = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/programs",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.availablePrograms = res.data.data;
            this.showFounderProgram = false;
          } else {
            this.availablePrograms = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad2 = false;
          this.availLoader = false;
        });
    },
    getRegisteredPrograms() {
      this.tableLoad3 = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.teamId +
            "/program-registrations",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.registeredPrograms = res.data.data;
          } else {
            this.registeredPrograms = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad3 = false;
        });
    },
    gotoMission(teamId, item, uri) {
      bus.$emit("changeNavbarParticipant", item.id);
      this.$router.push({
        path:
          "/incubatee/team/" + teamId + "/participation/" + item.id + "/" + uri,
      });
    },
  },
};
</script>
<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%);
}
.minicard {
  position: relative;
  right: 30px;
}
.kastemtoolbar:before {
  content: "";
  position: absolute;
  /* top: 0; */
  right: 0;
  border-top: 40px solid var(--v-kastemkolor-base);
  border-left: 40px solid #bdbdbd;
  width: 24%;
}
</style>
