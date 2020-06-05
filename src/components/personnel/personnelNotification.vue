<template>
  <v-menu left absolute :close-on-content-click="false" max-height="70%">
    <template v-slot:activator="{ on }">
      <v-btn :disabled="notificationList.total == 0" icon v-on="on">
        <v-badge :value="notificationList.total !=0" color="red" :content="notificationList.total" overlap>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="(notif, index) in notificationList.list" :key="index" three-line>
        <v-list-item-avatar>
          <v-btn
            depressed
            color="primary"
            x-small
            fab
            @click="gotoSchedule(notif.negotiateSchedule)"
            v-if="notif.negotiateSchedule != null"
          >
            <v-icon small>zoom_in</v-icon>
          </v-btn>
          <v-btn
            depressed
            color="primary"
            x-small
            fab
            @click="gotoSchedule(notif.schedule)"
            v-if="notif.schedule != null"
          >
            <v-icon small>zoom_in</v-icon>
          </v-btn>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{notif.notifiedTime | moment("dddd, Do MMM YYYY")}}</v-list-item-title>

          <v-list-item-subtitle>{{notif.message}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon color="grey" v-if="notif.read">drafts</v-icon>
          <v-btn icon small @click="markAsRead(notif.id)" v-else>
            <v-icon color="primary">markunread</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
// import bus from "@/config/bus";
export default {
  data() {
    return {
      notificationList: { total: 0, list: [] }
    };
  },
  mounted() {
    this.getPersonnelNotification();
  },
  methods: {
    getPersonnelNotification() {
      this.axios
        .get(config.baseUri + "/personnel/personnel-notifications", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.notificationList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    markAsRead(id) {
      this.axios
        .patch(
          config.baseUri + "/personnel/personnel-notifications/" + id + "/read",
          {},
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.getPersonnelNotification();
        })
        .catch(() => {})
        .finally(() => {});
    },
    gotoSchedule(item) {
      this.$router.replace({
        path: "/personnel/mentor/" + item.mentor.id + "/" + item.mentor.program.id + "/schedule"
      });
    },
    gotoNegotiate(item) {
      this.$router.replace({
        path: "/personnel/mentor/" + item.mentor.id + "/" + item.mentor.program.id + "/negotiate-schedule"
      });
    }
  }
};
</script>