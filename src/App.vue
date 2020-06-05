<template>
  <v-app>
    <!-- <v-content color="bgcolor"> -->
    <v-content>
      <notification :message="err_msg" :stats="status" />
      <router-view />
      <v-snackbar v-model="snackWithButtons" :timeout="timeout" bottom left class="snack">
        {{ snackWithBtnText }}
        <v-spacer />
        <v-btn dark flat color="#00f500" @click.native="refreshApp">{{ snackBtnText }}</v-btn>
        <v-btn icon @click="snackWithButtons = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-content>
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
      timeout: 0
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });

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
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
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
  /* background: #fff !important; */
}
.topaccent {
  background: #249c90;
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
</style>
<style scoped>
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>
