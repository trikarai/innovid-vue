<template>
  <v-container extend grid-list-xs>
    <v-row>
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
    </v-row>
    <v-row>
      <!-- <v-col>
        <pre>
         {{ journalTree }}
        </pre>
      </v-col> -->
      <v-col cols="12" xl="12" lg="12">
        <v-treeview
          :active.sync="active"
          :items="journalTree.list"
          item-key="id"
          item-text="worksheet.name"
        ></v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      active: [],
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
      items: [
        {
          id: 1,
          name: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: "material2 :",
              children: [
                {
                  id: 11,
                  name: "src :",
                  children: [
                    { id: 12, name: "v-btn : ts" },
                    { id: 13, name: "v-card : ts" },
                    { id: 14, name: "v-window : ts" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: "Downloads :",
          children: [
            { id: 16, name: "October : pdf" },
            { id: 17, name: "November : pdf" },
            { id: 18, name: "Tutorial : html" },
          ],
        },
        {
          id: 19,
          name: "Videos :",
          children: [
            {
              id: 20,
              name: "Tutorials :",
              children: [
                { id: 21, name: "Basic layouts : mp4" },
                { id: 22, name: "Advanced techniques : mp4" },
                { id: 23, name: "All about app : dir" },
              ],
            },
            { id: 24, name: "Intro : mov" },
            { id: 25, name: "Conference introduction : avi" },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getParticipantJournal();
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
            element.children = [
              {
                id: "f54b0adf-9861-4cbf-86a2-daf5f5900e47",
                mission: {
                  id: "b482357d-8348-471a-a404-e84362ab98c3",
                  name: "Mission UAT",
                },
                worksheet: {
                  id: "16a6abd6-83a2-44b1-8b65-10942d9fd5b7",
                  name: "test children",
                },
              },
            ];
          });
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {});
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
