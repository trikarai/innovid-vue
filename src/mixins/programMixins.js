import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export const programMixins = {
    methods: {
        filterActiveParticipation(params) {
            return this._.filter(params, ["active", true]);
        },
        filterRegistration(params) {
            return this._.filter(params, ["concluded", false]);
        },
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