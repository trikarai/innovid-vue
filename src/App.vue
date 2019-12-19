<template>
  <v-app>
    <v-content color="bgcolor">
      <notification :message="err_msg" :stats="status" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import bus from "@/config/bus";

export default {
  name: "App",

  components: {},
  created() {
    bus.$on("callNotif", (type, res) => {
      switch (type) {
        case "error":
          this.err_msg = res.response.data.meta;
          this.status.error = true;
          break;
        case "success":
          this.err_msg = res;
          this.status.success = true;
          break;
        case "info":
          this.err_msg = res;
          this.status.info = true;
          break;
        case "warning":
          this.err_msg = res.response.data.meta;
          this.status.warning = true;
          break;
      }
    });
  },

  data: () => ({
    //
  })
};
</script>
