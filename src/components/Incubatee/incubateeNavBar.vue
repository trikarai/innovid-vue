<template>
  <nav>
    <v-app-bar dense text app color="primary" class="elevation-0" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <!-- <span class="font-weight-light">Inovide</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-btn class="ml-3 mt-2 bm-2" text @click="goback()">
      <v-icon left>keyboard_backspace</v-icon>Back
    </v-btn>-->

  
    <v-btn class="ml-3 mt-5" icon v-if="$route.meta.level !== 0" @click="$router.go(-1) ">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn class="ml-3 mt-5" icon v-if="$route.meta.level == 0" @click="$router.go(-1) ">
      <v-icon></v-icon>
    </v-btn>
  <div class="container mt-2">
    <h2 class="mb-2">{{$route.name}}</h2>
    <div class="garis"></div>
  </div>

    <v-navigation-drawer app v-model="drawer" :mini-variant="miniVariant" color="sidebar">
      <!-- list head-->
      <v-list class="pa-1">
        <v-list-item v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>chevron_right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg" /> -->
            <img src="/img/profile2.png" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.data.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list v-if="user.data.teamMemberships.length != 0">
        <v-list-item>
          <v-select
            :loading="tableLoad"
            label="Team"
            :items="user.data.teamMemberships"
            item-text="team.name"
            item-value="team.id"
            v-model="teamId"
            @change="getParticipations()"
          ></v-select>
          <!-- {{teamId}} -->
        </v-list-item>
        <v-list-item>
          <v-select
            label="Program"
            :items="participationList.list"
            item-text="program.name"
            item-value="id"
            v-model="participationId"
          ></v-select>
          <!-- {{participationId}} -->
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
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-group  value="true" no-action v-if="teamId != ''">
        <template v-slot:activator>
           <v-list-item-action>
            <v-icon color="#676767">group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
          <v-list-item-title class="grey--text">Team</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item class="ml-5" router :to="'/incubatee/team/' + teamId +'/member' ">
          <v-list-item-title class="grey--text">Members</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item class="ml-5" router :to="'/incubatee/team/' + teamId +'/profile' ">
          <v-list-item-title class="grey--text">Team Profile</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group_work</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item class="ml-5" router :to="'/incubatee/team/' + teamId +'/application' ">
          <v-list-item-title class="grey--text">Program</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>how_to_vote</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item class="ml-5" router :to="'/incubatee/team/' + teamId +'/worksheet' ">
          <v-list-item-title class="grey--text">Worksheet</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>assignments</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
 
      </v-list-group>

      <v-list-group
        value="true"
        no-action
        v-if="participationId != ''"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon color="#676767">how_to_reg</v-icon>
          </v-list-item-action>
          <v-list-item-content>
          <v-list-item-title class="grey--text">Participation</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId +'/participation/' + participationId + '/schedule' "
        >
          <v-list-item-title class="grey--text">Mentoring</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>today</v-icon> -->
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId +'/participation/' + participationId + '/mission' "
        >
          <v-list-item-title class="grey--text">Mission</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>emoji_objects</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
        <v-list-item
          class="ml-5"
          router
          :to="'/incubatee/team/' + teamId +'/participation/' + participationId + '/journal' "
        >
          <v-list-item-title class="grey--text">Journal</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>emoji_objects</v-icon> -->
          </v-list-item-icon>
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
  </nav>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      drawer: true,
      tableLoad: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      teamId: "",
      participationList: { total: 0, list: [] },
      participationId: "",
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/incubatee/dashboard",
          disabled: false
        },
        {
          icon: "account_circle",
          text: "My Account",
          route: "/incubatee/account",
          disabled: false
        },
        {
          icon: "folder_shared",
          text: "Profile",
          route: "/incubatee/profile",
          disabled: false
        },
        {
          icon: "group_work",
          text: "Membership",
          route: "/incubatee/membership",
          disabled: false
        }
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
          disabled: true
        },
        {
          icon: "folder_shared",
          text: "Participation",
          route: "/incubatee/profile",
          disabled: true
        },
        {
          icon: "folder_shared",
          text: "Application",
          route: "/incubatee/profile",
          disabled: true
        },
        {
          icon: "folder_shared",
          text: "Worksheet",
          route: "/incubatee/profile",
          disabled: true
        },
        {
          icon: "folder_shared",
          text: "Mentoring",
          route: "/incubatee/profile",
          disabled: true
        }
      ]
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
    this.teamId = this.user.data.teamMemberships[0].team.id;
  },
  mounted() {
    if (this.teamId != "") {
      this.getParticipations();
    }
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    switchTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout: function() {
      localStorage.removeItem("lbUser");
      this.$router.replace({ path: "/" });
    },
    getParticipations() {
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
            this.participationId = this.participationList.list[0].id;
          } else {
            this.participationList = { total: 0, list: [] };
            this.participationId = "";
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>
