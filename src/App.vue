<template>
  <v-app>
    <v-main color="bgcolor">
      <!-- <v-main> -->
      <notification :message="err_msg" :stats="status" />
      <router-view />
      <v-snackbar
        v-model="snackWithButtons"
        :timeout="timeout"
        bottom
        left
        class="snack"
      >
        {{ snackWithBtnText }}
        <v-spacer />
        <v-btn dark text color="#00f500" @click.native="refreshApp">{{
          snackBtnText
        }}</v-btn>
        <v-btn icon @click="snackWithButtons = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import bus from "@/config/bus";

export default {
  name: "App",

  components: {},
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: "",
      snackWithBtnText: "",
      snackWithButtons: false,
      timeout: -1,
    };
  },
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
  }),
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
  background: #00667f;
  width: 75px;
  height: 9px;
  border-radius: 100px;
  margin-top: 9px;
}
.v-input__slot {
  /* background: #fff !important; */
}
.topaccent {
  background: #00667f;
  color: #fff;
  margin-bottom: 18px;
  width: 93%;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  bottom: 28px;
}
.v-dialog.vmember.v-dialog--active.v-dialog--persistent {
  overflow-y: inherit !important;
}
.v-dialog.vmember.v-dialog--active {
  overflow-y: inherit;
}

.v-avatar.v-list-item__avatar {
  position: relative;
  right: 11px;
}

@media (min-width: 1264px) {
  .container.extend {
    max-width: 1029px !important;
  }
}
@media (min-width: 1500px) {
  .container.extend {
    max-width: 1185px !important;
  }
}
html {
  font-size: 14px !important;
}
</style>
<style scoped>
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>
