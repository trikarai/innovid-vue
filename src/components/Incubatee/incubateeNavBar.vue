<template>
  <nav>
    <v-app-bar text app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">Inovide</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-btn class="ml-3 mt-2 bm-2" text @click="goback()">
      <v-icon left>keyboard_backspace</v-icon>Back
    </v-btn>-->

    <v-btn icon v-if="$route.meta.level !== 0" @click="$router.go(-1) ">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <!-- <p class="ml-3 mb-2">{{$route.name}}</p> -->

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
            <img src="https://picsum.photos/id/768/85/85" />
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

      <v-list>
        <v-list-item>
          <v-select
            label="Team"
            solo
            :items="user.data.teamMemberships"
            item-text="team.name"
            item-value="team.id"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-select label="Program" solo></v-select>
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

      <!-- <v-list-group prepend-icon="account_circle" value="true" no-action>
        <template v-slot:activator>
          <v-list-item-title>Team</v-list-item-title>
        </template>

        <v-list-item v-for="(team, i) in teams" :key="i" link>
          <v-list-item-title v-text="team.text"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="team.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>-->
    </v-navigation-drawer>
    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn small color="red" @click="logout">
              <span>Sign Out</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>language</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <!-- <LocaleSwitcher /> -->
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
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import auth from "@/config/auth";

export default {
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/incubatee/profile",
          disabled: true
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
        },
        {
          icon: "inbox",
          text: "Candidateship",
          route: "/incubatee/candidateship",
          disabled: false
        }
      ],
      teams: [
        {
          icon: "folder_shared",
          text: "Candidate",
          route: "/incubatee/profile",
          disabled: true
        },
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
      ],
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
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
    }
  }
};
</script>
<style scoped>
</style>
