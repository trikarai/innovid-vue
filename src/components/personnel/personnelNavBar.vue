<template>
  <nav>
    <v-app-bar dense dark text app color="black">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text"> </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--- notification start-->
      <personnel-notification />
      <!-- notification end-->
      <v-btn text @click="rightDrawer = !rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-btn
      class="ml-3 mt-5"
      icon
      v-if="$route.meta.level !== 0"
      @click="$router.go(-1)"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <div class="container extend mt-4">
      <h2 class="mb-2">{{ $route.meta.text }}</h2>
      <div class="garis"></div>
    </div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      color="sidebar"
    >
      <!-- list head-->
      <v-list class="pa-1">
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
            <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg" /> -->
            <img src="/img/personnel-ico.png" />
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
      <v-list v-if="user.data.hasAdminRole">
        <!-- <v-list> -->
        <!--admin menu-->
        <v-list-item
          v-for="link in admins"
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
      <v-divider></v-divider>
      <v-list>
        <!--coordinator menu-->
        <v-list-item router to="/personnel/account">
          <v-list-item-action>
            <v-icon color="#676767">account_circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">My Account</v-list-item-title>
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
            <v-icon color="#676767">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!--mentor menu-->
      <v-list>
        <v-list-item>
          <v-select
            label="Mentorship"
            :items="mentorships.list"
            item-text="program.name"
            :loading="mentorshipLoading"
            v-model="mentorship"
            return-object
            :readonly="$route.meta.level > 1"
          ></v-select>
        </v-list-item>
      </v-list>
      <v-list-group
        :value="haveMentorship"
        no-action
        :disabled="mentorships.list.length == 0"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon color="#676767">dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">as Mentor</v-list-item-title>
          </v-list-item-content>
        </template>
        <!-- <v-list-item router :to="'/personnel/mentor/participant'">
          <v-list-item-title class="grey--text">Participant</v-list-item-title>
          <v-list-item-icon>
            <v-icon>group_work</v-icon>
          </v-list-item-icon>
        </v-list-item> -->
        <v-list-item router :to="'/personnel/mentor/participant-journal'">
          <v-list-item-title class="grey--text">Journal</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group_work</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
        <v-list-item router :to="'/personnel/mentor/mentoring-schedule'">
          <v-list-item-title class="grey--text">Schedule</v-list-item-title>
          <v-list-item-icon>
            <!-- <v-icon>group_work</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
        <v-list-item router :to="'/personnel/mentor/introduction'">
          <v-list-item-title class="grey--text"
            >Self Introduction</v-list-item-title
          >
          <v-list-item-icon>
            <!-- <v-icon>group_work</v-icon> -->
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
            <v-btn small dark color="red" @click="logout">
              <span>Sign Out</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-icon>language</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <LocaleSwitcher />
          </v-list-item-action>
        </v-list-item>-->
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
import * as config from "@/config/config";
import auth from "@/config/auth";

import PersonnelNotification from "./personnelNotification";

export default {
  components: {
    PersonnelNotification,
  },
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      admins: [
        // {
        //   icon: "dashboard",
        //   text: "Dashboard",
        //   route: "/personnel/dashboard",
        //   disabled: true
        // },
        {
          icon: "supervised_user_circle",
          text: "Personnel",
          route: "/personnel/personnel",
          disabled: false,
        },
        {
          icon: "local_library",
          text: "Program",
          route: "/personnel/program",
          disabled: false,
        },
        {
          icon: "assignment",
          text: "Worksheet",
          route: "/personnel/worksheet-forms",
          disabled: false,
        },
        {
          icon: "contacts",
          text: "Profile Form",
          route: "/personnel/profile-forms",
          disabled: false,
        },
        {
          icon: "group_work",
          text: "Team Profile Form",
          route: "/personnel/team-profile-forms",
          disabled: false,
        },
        {
          icon: "question_answer",
          text: "Mentoring Form",
          route: "/personnel/mentoring-feedback-forms",
          disabled: false,
        },
        {
          icon: "how_to_reg",
          text: "Registrant",
          route: "/personnel/founder",
          disabled: false,
        },
      ],
      coordinators: [
        {
          icon: "dashboard",
          text: "as Coordinator",
          route: "/personnel/coordinator/dashboard",
          disabled: false,
        },
        // {
        //   icon: "group",
        //   text: "Participant",
        //   route: "/personnel/coordinator/participant",
        //   disabled: true
        // },
        // {
        //   icon: "how_to_reg",
        //   text: "Applicant",
        //   route: "/personnel/coordinator/applicant",
        //   disabled: true
        // }
      ],
      mentorshipLoading: false,
      mentorships: { total: 0, list: [] },
      mentorship: {},
      haveMentorship: false,
    };
  },

  watch: {
    mentorship() {
      this.$store.commit("setMentorship", this.mentorship);
    },
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
  },
  mounted() {
    this.getMentorship();
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    switchTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout: function() {
      this.$vuetify.theme.dark = false;
      localStorage.clear();
      this.$router.replace({ path: "/" });
    },
    getMentorship() {
      this.mentorshipLoading = true;
      this.axios
        .get(config.baseUri + "/personnel/mentorships", {
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.mentorships = res.data.data;
          this.mentorship = res.data.data.list[0];
          if (this.mentorships.list.length > 0) {
            this.haveMentorship = true;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.mentorshipLoading = false;
        });
    },
  },
};
</script>
<style scoped></style>
