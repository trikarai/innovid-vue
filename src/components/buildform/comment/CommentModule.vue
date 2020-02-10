<template>
  <v-col cols="12" md="6" lg="6" xs="12">
    <v-row>
      <!-- {{membershipId}} -->
      <v-col md="12" v-if="loadComment">
        <v-skeleton-loader type="list-item-avatar-two-line@3"></v-skeleton-loader>
      </v-col>
      <v-col md="12" v-else>
        <v-switch v-model="switchMode" :label="`Comment Mode: ${textMode}`"></v-switch>
        <template v-if="comments.total == 0">
          <v-chip small color="warning">No Comment Yet</v-chip>
        </template>
        <v-list three-line>
          <template v-for="item in comments.list">
            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <v-icon>face</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{item.member.founder.name}}</v-list-item-title>
                <v-list-item-subtitle
                  v-if="item.parent !== null"
                  class="font-italic font-weight-light"
                >
                  <v-card>
                    <v-card-text>{{item.parent.message}}</v-card-text>
                  </v-card>
                </v-list-item-subtitle>
                <v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn
                  v-if="!switchMode"
                  color="primary"
                  small
                  icon
                  class="mr-2"
                  @click="openDialogReply(item.id)"
                >
                  <v-icon>chat_bubble</v-icon>
                </v-btn>
                <v-btn disabled color="success" small icon class="mr-2" v-else>
                  <v-icon>chat_bubble</v-icon>
                </v-btn>
                <v-btn color="warning" small icon @click="leftAct(item, 'Remove')">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-divider :key="item.id" inset></v-divider>
          </template>
        </v-list>
      </v-col>
      <v-col md="6" v-if="!switchMode">
        <v-btn color="primary" small class="mr-2" @click="openDialog()" v-if="!loadComment">
          <v-icon small left>chat_bubble</v-icon>Post Comment
        </v-btn>
      </v-col>
      <v-col md="12" v-else>
        <vue-simplemde v-model="params.message" ref="markdownEditor" />
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card :loading="loaderDelete">
          <v-card-title class="headline">
            <template v-if="isReply">Reply</template> Comment
          </v-card-title>
          <v-card-text>
            <vue-simplemde v-model="params.message" ref="markdownEditor" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="isEmpty"
              color="green"
              text
              @click="replyComment()"
              v-if="isReply"
            >Reply</v-btn>
            <v-btn :disabled="isEmpty" color="green" text @click="postComment()" v-else>Post</v-btn>
            <v-btn color="red" text @click.native="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" width="300" :persistent="true">
        <v-card :loading="loaderDelete">
          <v-card-title>
            <p class="text-capitalize">{{leftAction}}</p>
          </v-card-title>
          <v-card-text>{{leftName}}</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="red" @click="deleteComment(leftId)">Yes</v-btn>
            <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-col>
</template>
<script>
import VueSimplemde from "vue-simplemde";
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export default {
  data() {
    return {
      loadComment: false,
      dialog: false,
      switchMode: false,
      textMode: "Dialog Form",
      content: "",
      membershipId: "",
      parentId: "",
      comments: { total: 0, list: [] },
      dialogDelete: false,
      loaderDelete: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: {
        participantId: this.$route.params.cohortId,
        journalId: this.$route.params.journalId,
        message: ""
      },
      isReply: false,
      isEmpty: true
    };
  },
  watch: {
    switchMode() {
      if (this.switchMode) {
        this.textMode = "Inline Form";
      } else {
        this.textMode = "Dialog Form";
      }
    },
    "params.message"() {
      if (this.params.message == "") {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
  },
  created() {
    this.membershipId = localStorage.getItem("MembershipTeamId");
  },
  mounted() {
    this.getCommentList();
  },
  components: {
    VueSimplemde
  },
  methods: {
    getCommentList() {
      this.loadComment = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.$route.params.journalId +
            "/comments",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.comments = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadComment = false;
        });
    },
    postComment() {
      this.loaderDelete = true;
      this.axios
        .post(
          config.baseUri +
            "/founder/team-memberships/" +
            this.membershipId +
            "/comments",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {
          this.loaderDelete = false;
        });
    },
    replyComment() {
      this.axios
        .post(
          config.baseUri +
            "/founder/team-memberships/" +
            this.membershipId +
            "/comments/" +
            this.parentId,
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {});
    },
    openDialog() {
      this.parentId = "";
      this.dialog = true;
      this.isReply = false;
    },
    openDialogReply(id) {
      this.parentId = id;
      this.dialog = true;
      this.isReply = true;
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.message;
      this.leftAction = action;
    },
    deleteComment(id) {
      this.loaderDelete = true;
      this.axios
        .delete(
          config.baseUri +
            "/founder/team-memberships/" +
            this.membershipId +
            "/comments/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          bus.$emit("callNotif", "info", "Comment Deleted");
          this.refreshData();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderDelete = false;
        });
    },
    refreshData() {
      this.dialog = false;
      this.dialogDelete = false;
      this.getCommentList();
      this.params.message = "";
    }
  }
};
</script>
<style scoped>
@import "~simplemde/dist/simplemde.min.css";
</style>