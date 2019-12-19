<template>
  <div>
    <nav>
      <v-app-bar color="primary">
        <router-link v-bind:to="'/'">
          <v-icon class="white--text mr-2">home</v-icon>
        </router-link>
        <v-toolbar-title class="white--text">Inovide</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="'/request-activation/' + incubatorIdentifier + '/' + email">
              <v-list-item-title>Request Activation Code</v-list-item-title>
            </v-list-item>
            <v-list-item :to="'/forgot-password/' + incubatorIdentifier + '/' + email">
              <v-list-item-title>Request Reset Password Code</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </nav>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-spacer></v-spacer>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      incubatorIdentifier: this.$route.params.incubatorIdentifier,
      email: this.$route.params.email
    };
  },
  components: { Footer }
};
</script>
<style scoped>
</style>