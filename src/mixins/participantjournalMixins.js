import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export const participantjournalMixins = {
    data() {
        return {
            participantJournalList: { total: 0, list: [] }
        }
    },
    methods: {
        getParticipantJournal() {
            this.tableLoad = true;
            this.axios
                .get(
                    config.baseUri +
                    "/personnel/as-mentor/" +
                    this.selectedCohort.program.id +
                    "/participants/include-journals",
                    {
                        headers: auth.getAuthHeader()
                    }
                )
                .then(res => {
                    this.participantJournalList = res.data.data;
                      this.groupByMission(res.data.data);
                })
                .catch(res => {
                    bus.$emit("callNotif", "error", res);
                })
                .finally(() => {
                    this.tableLoad = false;
                });
        },
        gotoJournalDetail(participantId, journalId) {
            this.$router.push({
                path:
                    "/personnel/mentor/" +
                    this.selectedCohort.id +
                    "/" +
                    this.selectedCohort.program.id +
                    "/participant/" +
                    participantId +
                    "/journal/" +
                    journalId
            });
        },
        // eslint-disable-next-line no-unused-vars
        groupByMission(participantJournalList) {
            for (let index = 0; index < participantJournalList.list.length; index++) {
                // eslint-disable-next-line no-unused-vars
                let grouped = Vue._.groupBy(
                    participantJournalList.list[index].journals,
                    currrent => currrent.mission.name
                );
                participantJournalList.list[index].grouped = Object.entries(grouped);
            }
        },
    },
}