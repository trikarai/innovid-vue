<template>
  <v-container extend grid-list-xs>
    <!-- {{ $route.params.participantId }} -->
    <!-- <v-row>
      <v-col md="12">
        <v-data-table
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="journalList.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              class="ml-2"
              small
              color="primary"
              @click="gotoJournal(item.id)"
            >
              <v-icon small left>assignment</v-icon>Journal
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" xl="12" lg="12">
        <v-treeview
          :active.sync="active"
          :load-children="fetchChildren"
          :open.sync="open"
          :items="journalTree.list"
          item-key="id"
          item-text="worksheet.name"
          transition
        >
          <template #label="{item}">
            <template v-if="item.id !== null">
              <v-btn color="primary" small icon @click="gotoJournal(item.id)">
                <v-icon>zoom_in</v-icon> </v-btn
              >{{ item.mission.worksheetForm.name }} -
              {{ item.worksheet.name }}
            </template>
            <template v-else>
              <span class="sub-title">
                No journal child found for selected node parent
              </span>
            </template>
          </template>
        </v-treeview>
      </v-col>
      <!-- <v-col>
        {{ parentNode }}
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import axios from "axios";

export default {
  name: "treeview-journal",
  data() {
    return {
      parentNode: "",
      active: [],
      open: [],
      tableLoad: false,
      journalList: { total: 0, list: [] },
      tableHeaders: [
        { text: "Mission", value: "mission.name", sortable: false },
        {
          text: "Worksheet",
          value: "worksheet.name",
          sortable: false,
        },
        { text: "", value: "action", sortable: false, align: "right" },
      ],
      journalTree: { list: [] },
    };
  },
  watch: {},
  mounted() {
    // this.getParticipantJournal();
    this.getParticipantJournalBranches();
  },
  methods: {
    getParticipantJournal() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.participantId +
            "/journals",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          if (res.data.data) {
            this.journalList = res.data.data;
          } else {
            this.journalList = { total: 0, list: [] };
          }
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getParticipantJournalBranches() {
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.participantId +
            "/journals/branches",
          {
            params: {
              parentId: null,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journalTree = res.data.data;
          this.journalTree.list.forEach((element) => {
            element.children = [];
          });
        })
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
        })
        .finally(() => {});
    },
    async fetchChildren(item) {
      // eslint-disable-next-line no-console
      // console.log(item.id);

      try {
        const response = await axios.get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.participantId +
            "/journals/branches",
          {
            params: {
              parentId: item.id,
            },
            headers: auth.getAuthHeader(),
          }
        );
        // eslint-disable-next-line no-console
        // console.log(response);
        this.parentNode = response.data.data.list;
        if (response.data.data.total === 0) {
          var nochildren = {
            id: null,
            mission: {
              name: "",
              worksheetForm: {
                name: "",
              },
            },
            worksheet: {
              id: null,
              name: "",
            },
          };
          item.children.push(nochildren);
        } else {
          response.data.data.list.forEach((element) => {
            element.children = [];
            item.children.push(element);
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    gotoJournal(id) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.mentorId +
          "/" +
          this.$route.params.programId +
          "/participant/" +
          this.$route.params.participantId +
          "/journal/" +
          id,
      });
    },
  },
};
</script>
