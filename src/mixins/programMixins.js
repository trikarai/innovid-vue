import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export const programMixins = {
    methods: {
        cancelProgram(id) {
            this.tableLoad = true;
            this.axios
                .delete(
                    config.baseUri +
                    "/founder/as-team-member/" +
                    this.$route.params.teamId +
                    "/program-registrations/" +
                    id,
                    {
                        headers: auth.getAuthHeader()
                    }
                )
                .then(() => {
                    bus.$emit("callNotif", "info", "Successfully Cancel Registration");
                    this.refresh();
                })
                .catch(res => {
                    bus.$emit("callNotif", "error", res);
                })
                .finally(() => {
                    this.tableLoad = false;
                });
        }
    }
}