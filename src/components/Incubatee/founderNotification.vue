<template>
  <v-menu left absolute :close-on-content-click="false" max-height="70%">
    <template v-slot:activator="{ on }">
      <v-btn :disabled="notificationList.total == 0" text v-on="on">
        <v-badge :value="unRead !=0" color="red" :content="unRead" overlap>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list class="pa-5" dense>
      <v-list-item v-for="(notif, index) in reOrderNotification(notificationList.list)" :key="index" three-line>
        <v-list-item-avatar>
          <v-btn
            depressed
            color="primary"
            x-small
            fab
            @click="gotoCandidate(notif.memberCandidate)"
            v-if="notif.memberCandidate != null"
          >
            <v-icon small>zoom_in</v-icon>
          </v-btn>
          <v-btn
            depressed
            color="primary"
            x-small
            fab
            @click="gotoJournal(notif.comment)"
            v-if="notif.comment != null"
          >
            <v-icon small>zoom_in</v-icon>
          </v-btn>
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
          <v-btn
            depressed
            color="primary"
            x-small
            fab
            @click="gotoParticipant(notif.participant)"
            v-if="notif.participant != null"
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
import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import * as config from "@/config/config";
import auth from "@/config/auth";
import bus from "@/config/bus";
export default {
  data() {
    return {
      notificationList: { total: 0, list: [] },
      unRead: 0
    };
  },
  mounted() {
    this.getFounderNotification();
  },
  methods: {
    reOrderNotification(params) {
      return this._.orderBy(
        params,
        function(o) {
          return new Date(o.notifiedTime);
        },
        ["desc"]
      );
    },
    countUnread(array) {
      this.unRead = 0;
      array.forEach(element => {
        if (element.read == false) {
          this.unRead += 1;
        }
      });
    },
    getFounderNotification() {
      this.axios
        .get(config.baseUri + "/founder/founder-notifications", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.notificationList = res.data.data;
          this.countUnread(res.data.data.list);
        })
        .catch(() => {})
        .finally(() => {});
    },
    markAsRead(id) {
      this.axios
        .patch(
          config.baseUri + "/founder/founder-notifications/" + id + "/read",
          {},
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.getFounderNotification();
        })
        .catch(() => {})
        .finally(() => {});
    },
    gotoParticipant(item) {
      bus.$emit("reloadNavParticipation");
      this.$router.push({
        path: "/incubatee/team/" + item.team.id + "/participation"
      });
    },
    gotoSchedule(item) {
      this.$router.push({
        path:
          "/incubatee/team/" +
          item.participant.team.id +
          "/participation/" +
          item.participant.id +
          "/schedule"
      });
    },
    gotoJournal(comment) {
      this.$router.push({
        path:
          "/incubatee/team/" +
          comment.journal.participant.team.id +
          "/participation/" +
          comment.journal.participant.id +
          "/mission/" +
          comment.journal.mission.id +
          "/journal/" +
          comment.journal.id +
          "/worksheet/" +
          comment.journal.worksheet.id
      });
    },
    gotoCandidate() {
      this.$router.push({
        path: "/incubatee/candidateship"
        // path: "/incubatee/membership"
      });
    }
  }
};
</script>