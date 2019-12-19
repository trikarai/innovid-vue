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
      <v-list v-if="user.data.hasAdminRole">
        <!--admin menu-->
        <v-list-item
          v-for="link in admins"
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
      <v-divider></v-divider>
      <v-list>
        <!--coordinator menu-->
        <v-list-item
          v-for="link in coordinators"
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
      <v-divider></v-divider>
      <v-list>
        <!--mentor menu-->
        <v-list-item
          v-for="link in mentors"
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
      admins: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/personnel/dashboard",
          disabled: true
        },
        {
          icon: "supervised_user_circle",
          text: "Personnel",
          route: "/personnel/personnel",
          disabled: false
        },
        {
          icon: "local_library",
          text: "Program",
          route: "/personnel/program",
          disabled: false
        },
        {
          icon: "contacts",
          text: "Profile Form",
          route: "/personnel/profile-forms",
          disabled: false
        },
        {
          icon: "assignment",
          text: "Worksheet",
          route: "/personnel/worksheet-forms",
          disabled: false
        },
        {
          icon: "question_answer",
          text: "Mentoring Form",
          route: "/personnel/mentoring-feedback-forms",
          disabled: false
        }
      ],
      coordinators: [
        {
          icon: "group",
          text: "Participant",
          route: "/personnel/coordinator/participant",
          disabled: true
        },
        {
          icon: "how_to_reg",
          text: "Applicant",
          route: "/personnel/coordinator/applicant",
          disabled: true
        }
      ],
      mentors: [
        {
          icon: "schedule",
          text: "Schedules",
          route: "/personnel/mentor/schedules",
          disabled: true
        },
        {
          icon: "event_available",
          text: " Negotiate Schedules ",
          route: "/personnel/mentor/negotiate-schedules",
          disabled: true
        }
      ]
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
