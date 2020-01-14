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
<style>
.required::after {
  content: "*";
}

.imgkastem .v-image__image {
  background-attachment: fixed !important;
}
.backcu {
  background-image: url(/img/slider-bg.png);
  background-size: cover;
}
.garis {
  background: #249c90;
  width: 75px;
  height: 9px;
  border-radius: 100px;
  margin-top: 9px;
}
.v-input__slot {
    background: #fff !important;
}
</style>
