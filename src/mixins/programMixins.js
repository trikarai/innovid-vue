import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export const programMixins = {
    methods: {
        filterRegistration(params) {
            return Vue._.filter(params, ["concluded", false]);
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