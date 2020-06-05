import bus from "@/config/bus";
export const teamWatcherMixins = {
    data() {
        return {
            teamId: ""
        }
    },
    watch: {
    },
    created() {
        bus.$on("changeDashboardTeam", teamId => {
            this.teamId = teamId;
        });
    }
}
