<template>
  <div class="home">
    <Navbar />
    <transition name="slide" mode="out-in">
      <router-view style="margin-left:50px;"></router-view>
    </transition>
    <v-spacer></v-spacer>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Incubatee/incubateeNavBar";
import Footer from "@/components/Footer";
export default {
  name: "Root",
  components: { Navbar, Footer },
  data: function() {
    return {
      //sasa
    };
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

