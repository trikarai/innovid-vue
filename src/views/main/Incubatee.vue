<template>
  <div class="home">
    <Navbar />
    <!-- {{todayUnix}} - {{tokenExp}} = {{text}} -->
    <transition name="slide" mode="out-in">
      <router-view style="margin-left:50px;"></router-view>
    </transition>
    <v-spacer></v-spacer>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/config/auth";

import Navbar from "@/components/Incubatee/incubateeNavBar";
import Footer from "@/components/Footer";
export default {
  name: "Root",
  components: { Navbar, Footer },
  data: function() {
    return {
      tokenExp: "",
      todayUnix: "",
      text: "",
      user: {}
    };
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
  },
  mounted() {
    this.cekTokenExp();
  },
  methods: {
    cekTokenExp() {
      this.tokenExp = this.user.valid_until;
      this.todayUnix = Math.round(new Date().getTime() / 1000);

      if (this.todayUnix > this.tokenExp) {
        this.text = "Force Logout";
        window.localStorage.clear();
        this.$router.replace({ path: "/" });
      } else {
        this.text = "Still Logged";
      }
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
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

