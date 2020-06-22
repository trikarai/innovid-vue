<template>
  <nav>
    <v-app-bar dense text app color="primary" class="elevation-0" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <!-- <span class="font-weight-light">Inovide</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--- notification start-->
      <founder-notification />
      <!-- notification end-->
      <v-btn text @click="rightDrawer = !rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn text depressed small @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-btn class="ml-3 mt-2 bm-2" text @click="goback()">
      <v-icon left>keyboard_backspace</v-icon>Back
    </v-btn>-->

    <v-btn
      style="position: fixed;"
      class="ml-3 mt-5"
      icon
      v-if="$route.meta.level !== 0"
      @click="$router.go(-1)"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <div style="margin-left: 49px;" class="container extend mt-2">
      <h2 class="mb-2">{{ $route.meta.text }}</h2>
      <div class="garis"></div>
    </div>

    <v-navigation-drawer
      height="100%"
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      color="sidebar"
    >
      <!-- list head-->
      <v-list class="pa-1">
        <template v-if="!failed_image">
          <v-img
            class="logoinc"
            max-width="180"
            v-if="!miniVariant"
            :src="cPicture"
            contain
            v-on:error="onImgError"
          />
        </template>
        <v-list-item
          v-if="miniVariant"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-action>
            <v-icon>chevron_right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <img src="/img/profile2.png" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.data.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list v-if="teamMemberships.total != 0">
        <v-list-item>
          <v-select
            v-if="!miniVariant"
            :loading="teamLoad"
            label="Team"
            :items="teamMemberships.list"
            item-text="team.name"
            return-object
            v-model="selectedMembership"
            @change="getParticipations()"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-select
            v-if="!miniVariant"
            label="Program"
            :loading="participationLoad"
            :items="filterActiveParticipation(participationList.list)"
            item-text="program.name"
            item-value="id"
            v-model="participationId"
            @change="changeParticipant()"
            append-outer-icon="refresh"
            @click:append-outer="getParticipations"
          >
          </v-select>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-select
            :loading="teamLoad"
            disabled
            label="No Team"
            :items="[]"
          ></v-select>
        </v-list-item>
      </v-list>

      <v-list>
        <!--sub list other-->
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          :disabled="link.disabled"
        >
          <v-list-item-action>
            <v-icon color="#676767">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="participationId != ''">
        <v-list-item
          router
          :to="
            '/incubatee/team/' +
              teamId +
              '/participation/' +
              participationId +
              '/mission'
          "
        >
          <v-list-item-action>
            <v-icon>emoji_objects</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text"
              >Program Mission</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          :to="
            '/incubatee/team/' +
              teamId +
              '/participation/' +
              participationId +
              '/schedule'
          "
        >
          <v-list-item-action>
            <v-icon>today</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">Mentoring</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          :to="
            '/incubatee/team/' +
              teamId +
              '/participation/' +
              participationId +
              '/journal'
          "
        >
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">Journal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--disabled menu-->
      <v-list v-else>
        <v-tooltip right color="warning">
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-action>
                <v-icon>emoji_objects</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text"
                  >Program Mission</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>You must join a program to access program mission</span>
        </v-tooltip>
        <v-tooltip right color="warning">
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-action>
                <v-icon>today</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text"
                  >Mentoring</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>You must join a program to access mentoring</span>
        </v-tooltip>
        <v-tooltip right color="warning">
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text"
                  >Journal</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>You must join a program to access journal</span>
        </v-tooltip>
      </v-list>

      <v-list-group :value="false" no-action v-if="teamId != ''">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon color="#676767">group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text"
              >Team Management</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId + '/profile'"
        >
          <v-list-item-title class="grey--text">Team Profile</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group_work</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId + '/member'"
        >
          <v-list-item-title class="grey--text">Members</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId + '/worksheet'"
        >
          <v-list-item-title class="grey--text">Worksheet</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>assignments</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId + '/participation'"
        >
          <v-list-item-title class="grey--text"
            >Participation</v-list-item-title
          >
          <v-list-item-icon>
            <!-- <v-icon>how_to_vote</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list v-else>
        <v-tooltip right color="warning">
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on">
              <v-list-item-action>
                <v-icon>group</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text"
                  >Team Management</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>You must join/create a team to access team management</span>
        </v-tooltip>
      </v-list>

      <v-list-group :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon color="#676767">account_circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">My Profile</v-list-item-title>
          </v-list-item-content>
        </template>

        <!--sub list other-->
        <v-list-item
          class="ml-5"
          v-for="link in links2"
          :key="link.text"
          router
          :to="link.route"
          :disabled="link.disabled"
        >
          <!-- <v-list-item-action>
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-item-action>-->
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-icon>exit_to_app</v-icon> -->
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn dark small color="red" @click="logout">
              <span>Sign Out</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>contact_support</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn dark small color="primary" @click="dialogHelp = !dialogHelp">
              <span>Support</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>brightness_4</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>Dark Theme</v-list-item-content>
          <v-list-item-action>
            <v-switch color="black" @change="switchTheme"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-icon>language</v-icon> -->
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <!-- <LocaleSwitcher /> -->
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog
      v-model="dialogHelp"
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="transparent"
            ><v-icon class="pl-3" right>mail</v-icon></v-list-item-avatar
          >
          <v-list-item-content>
            <v-list-item-subtitle>Technical Support</v-list-item-subtitle>
            <v-list-item-title class="title"
              ><a style="text-decoration: none" href="mailto:support@innov.id"
                >support@innov.id</a
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>
  </nav>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
import bus from "@/config/bus";

import FounderNotification from "./founderNotification";
import { programMixins } from "@/mixins/programMixins";

export default {
  mixins: [programMixins],
  components: {
    FounderNotification,
  },
  data() {
    return {
      failed_image: false,
      incubatorIdentifier: "",
      dialogHelp: false,
      drawer: true,
      tableLoad: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      // teamMemberships: {},
      teamMemberships: { total: 0, list: [] },
      selectedMembership: { id: "", team: { id: "", name: "" } },
      teamLoad: false,
      teamId: "",
      notificationList: { total: 0, list: [] },
      participationList: { total: 0, list: [] },
      participationLoad: false,
      participationId: "",
      links: [
        {
          icon: "dashboard",
          text: "Home",
          route: "/incubatee/dashboard",
          disabled: false,
        },
      ],
      links2: [
        {
          icon: "account_circle",
          text: "My Account",
          route: "/incubatee/account",
          disabled: false,
        },
        {
          icon: "folder_shared",
          text: "Biodata",
          route: "/incubatee/profile",
          disabled: false,
        },
        {
          icon: "group_work",
          text: "My Team",
          route: "/incubatee/membership",
          disabled: false,
        },
        // {
        //   icon: "inbox",
        //   text: "Candidateship",
        //   route: "/incubatee/candidateship",
        //   disabled: false
        // }
      ],
      teams: [
        {
          icon: "folder_shared",
          text: "Team Profile",
          route: "/incubatee/profile",
          disabled: true,
        },
        {
          icon: "folder_shared",
          text: "Participation",
          route: "/incubatee/profile",
          disabled: true,
        },
        {
          icon: "folder_shared",
          text: "Application",
          route: "/incubatee/profile",
          disabled: true,
        },
        {
          icon: "folder_shared",
          text: "Worksheet",
          route: "/incubatee/profile",
          disabled: true,
        },
        {
          icon: "folder_shared",
          text: "Mentoring",
          route: "/incubatee/profile",
          disabled: true,
        },
      ],
    };
  },
  created() {
    this.incubatorIdentifier = localStorage.getItem("incubator");
    this.user = JSON.parse(auth.getAuthData());
    // this.teamMemberships = this.user.data.lastTeamMembership[0];
    // this.teamId = this.user.data.teamMemberships[0].team.id;
    // localStorage.setItem("DashboardTeamId", this.teamId);
    // var membershipId = this.user.data.teamMemberships[0].id;
    // localStorage.setItem("MembershipTeamId", membershipId);

    bus.$on("reloadNavTeamMembership", () => {
      this.getTeamMembership();
    });
    bus.$on("reloadNavParticipation", () => {
      this.getParticipations();
    });
    bus.$on("changeNavbarParticipant", (id) => {
      this.participationId = id;
    });
  },
  watch: {
    selectedMembership() {
      this.getParticipations();
    },
  },
  mounted() {
    this.getTeamMembership();
    // if (this.teamId !== "") {
    //   this.getParticipations();
    // }
  },
  computed: {
    cPicture() {
      return this.failed_image
        ? "/img/incubator-logo/bara.png"
        : "/img/incubator-logo/" + this.incubatorIdentifier + ".png";
    },
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    onImgError() {
      this.failed_image = true;
    },
    switchTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout: function() {
      this.$vuetify.theme.dark = false;
      localStorage.clear();
      this.$router.replace({ path: "/" });
    },
    changeParticipant() {
      localStorage.setItem("ParticipantTeamId", this.participationId);
      bus.$emit("changeDashboardParticipant", this.participationId);
    },
    getTeamMembership() {
      this.teamLoad = true;
      this.axios
        .get(config.baseUri + "/founder/team-memberships", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.teamMemberships = res.data.data;
          if (this.teamMemberships.total !== 0) {
            this.selectedMembership = this.teamMemberships.list[0];
            this.teamId = this.teamMemberships.list[0].team.id;
            localStorage.setItem("DashboardTeamId", this.teamId);
          } else {
            this.teamId = "";
            this.selectedMembership = { id: "", team: { id: "" } };
            localStorage.removeItem("DashboardTeamId");
          }
        })
        .finally(() => {
          this.teamLoad = false;
        });
    },
    getParticipations() {
      this.teamId = this.selectedMembership.team.id;
      localStorage.setItem("MembershipTeamId", this.selectedMembership.id);
      localStorage.setItem("DashboardTeamId", this.selectedMembership.team.id);
      bus.$emit("changeDashboardTeam", this.selectedMembership.team.id);
      this.participationLoad = true;
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
            this.participationList.total = res.data.data.total;
            this.participationList.list = this.filterActiveParticipation(
              res.data.data.list
            );
            this.participationId = this.participationList.list[0].id;
            localStorage.setItem(
              "DashboardParticipantId",
              this.participationId
            );
          } else {
            this.participationList = { total: 0, list: [] };
            this.participationId = "";
          }
        })
        .catch(() => {})
        .finally(() => {
          this.participationLoad = false;
        });
    },
  },
};
</script>
<style scoped>
.logoinc {
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;

  filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
}
/* Disable grayscale on hover */
.logoinc:hover {
  -webkit-filter: grayscale(0);
  filter: none;
}
</style>
