<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="10">
        <div id="meet"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from "@/config/auth";

export default {
  data() {
    return {
      api: null,
      user: "",
      username: "",
      room: this.$route.params.scheduleId,
    };
  },
  created() {
    this.username = JSON.parse(auth.getAuthData()).data.name;
  },
  mounted() {
    this.openRoom();
  },
  beforeDestroy() {
    this.api.dispose();
  },
  destroyed() {},
  methods: {
    openRoom() {
      // verify the JitsiMeetExternalAPI constructor is added to the global..
      if (window.JitsiMeetExternalAPI) {
        this.startConference();
      } else alert("Jitsi Meet API script not loaded");
    },
    startConference() {
      try {
        const domain = "meet.jit.si";
        const options = {
          roomName: this.room,
          height: 500,
          parentNode: document.getElementById("meet"),
          interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
          },
          configOverwrite: {
            disableSimulcast: false,
          },
        };

        this.api = new window.JitsiMeetExternalAPI(domain, options);
        this.addEventListener("videoConferenceJoined", () => {
          this.api.executeCommand("displayName", this.username);
        });
      } catch (error) {
        // console.error("Failed to load Jitsi API", error);
      }
    },
  },
};
</script>

<style scoped></style>
