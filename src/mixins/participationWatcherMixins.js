import bus from "@/config/bus";
export const participationWatcherMixins = {
    data() {
        return {
            participationId: "",
            teamId: ""
        }
    },
    watch: {
        teamId() {
            this.$router.replace({
                path: "/incubatee/dashboard"
            });
        }
    },
    created() {
        bus.$on("changeDashboardTeam", teamId => {
            this.teamId = teamId;
        });
        bus.$on("changeDashboardParticipant", participationId => {
            this.participationId = participationId;
        });
    },
}
