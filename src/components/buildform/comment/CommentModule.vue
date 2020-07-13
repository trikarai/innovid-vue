<template>
  <v-col>
    <v-row>
      <v-col md="12">
        <v-row>
          <h3>Comment</h3>
        </v-row>
        <v-row>
          <v-col md="10">
            <v-switch
              class="font-weight-light"
              v-if="!hideComment"
              v-model="switchMode"
              :label="`Comment Mode: ${textMode}`"
            ></v-switch>
          </v-col>
          <v-col>
            <v-btn
              class="mt-4"
              v-if="!hideComment"
              icon
              @click="hideComment = true"
            >
              <v-icon>visibility</v-icon>
            </v-btn>
            <v-btn v-else icon @click="hideComment = false">
              <v-icon>visibility_off</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <template v-if="!hideComment">
        <v-col md="12" v-if="loadComment">
          <v-skeleton-loader
            type="list-item-avatar-two-line@3"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="12" v-else>
          <template v-if="comments.total == 0">
            <v-chip small color="warning">No Comment Yet</v-chip>
          </template>
          <v-list three-line="false" v-if="comments.total !== 0">
            <template v-for="(item, index) in comments.list">
              <v-list-item :key="item.id">
                <v-list-item-avatar>
                  <v-icon>face</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-if="item.member != null">{{
                    item.member.founder.name
                  }}</v-list-item-title>
                  <v-list-item-title v-if="item.mentor != null">{{
                    item.mentor.personnel.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    v-if="item.parent !== null"
                    class="font-italic font-weight-light"
                  >
                    <v-card>
                      <v-card-text>
                        <div
                          style="padding-bottom: 1px !important;"
                          class="panel"
                        >
                          <div
                            class="panel-heading"
                            v-html="marked(item.parent.message)"
                          ></div>
                        </div>

                        <!-- {{item.parent.message}} -->
                      </v-card-text>
                    </v-card>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <div v-html="marked(item.message)"></div>
                    <!-- {{item.message}} -->
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon style="display:inline-grid;">
                  <v-btn
                    v-if="!switchMode"
                    color="primary"
                    small
                    icon
                    class="mr-2 mb-2"
                    @click="openDialogReply(item.id)"
                  >
                    <v-icon>reply</v-icon>
                  </v-btn>
                  <v-btn
                    disabled
                    color="primary"
                    small
                    icon
                    class="mr-2 mb-2"
                    v-else
                  >
                    <v-icon>reply</v-icon>
                  </v-btn>
                  <template v-if="item.mentor !== null">
                    <v-btn
                      v-if="item.mentor.id == $route.params.mentorId"
                      color="warning"
                      small
                      icon
                      @click="leftAct(item, 'Remove')"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <template v-if="item.member !== null">
                    <v-btn
                      v-if="item.member.founder.id === user.data.id"
                      color="warning"
                      small
                      icon
                      @click="leftAct(item, 'Remove')"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item-icon>
              </v-list-item>
              <v-divider :key="index" inset></v-divider>
            </template>
          </v-list>
        </v-col>
      </template>
      <template v-if="!hideComment">
        <v-col md="6" v-if="!switchMode">
          <v-btn
            color="primary"
            small
            class="mr-2"
            @click="openDialog()"
            v-if="!loadComment"
          >
            <v-icon small left>add_comment</v-icon>Add Comment
          </v-btn>
        </v-col>
        <v-col md="12" v-else>
          <vue-simplemde v-model="params.message" ref="markdownEditor" />
          <v-btn :disabled="isEmpty" color="primary" @click="postComment()"
            >Post</v-btn
          >
          <!-- <v-btn color="red" text @click.native="dialog = false">Cancel</v-btn> -->
        </v-col>
      </template>
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
              color="primary"
              @click="replyComment()"
              v-if="isReply"
              >Reply</v-btn
            >
            <v-btn
              :disabled="isEmpty"
              color="primary"
              @click="postComment()"
              v-else
              >Post</v-btn
            >

            <v-btn color="grey" text @click.native="dialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" width="300" :persistent="true">
        <v-card :loading="loaderDelete">
          <v-card-title>
            <p class="text-capitalize">{{ leftAction }}</p>
          </v-card-title>
          <v-card-text>{{ leftName }}</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="red" @click="deleteComment(leftId)">Yes</v-btn>
            <v-btn text color="grey" @click="dialogDelete = false"
              >Cancel</v-btn
            >
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
  props: {
    journalId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hideComment: false,
      loadComment: false,
      dialog: false,
      switchMode: false,
      textMode: "Dialog Form",
      content: "",
      membershipId: "",
      mentorshipId: "",
      parentId: "",
      comments: { total: 0, list: [] },
      dialogDelete: false,
      loaderDelete: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      params: {
        participantId: this.$route.params.cohortId,
        journalId: "",
        message: "",
      },
      isReply: false,
      isEmpty: true,
      user: {
        role: "",
        data: { id: "" },
      },
      mdeConfig: {
        placeholder: "Type here...",
        spellChecker: false,
      },
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
    },
    journalId: "getComment",
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
    if (this.user.role != "PERSONNEL") {
      this.membershipId = localStorage.getItem("MembershipTeamId");
    }
    // if (this.$route.params.journalId) {
    //   this.params.journalId = this.$route.params.journalId;
    // } else {
    //   this.params.journalId = this.journalId;
    // }
  },
  mounted() {
    this.getComment();
  },
  components: {
    VueSimplemde,
  },
  methods: {
    getComment() {
      if (this.$route.params.journalId) {
        this.params.journalId = this.$route.params.journalId;
      } else {
        this.params.journalId = this.journalId;
      }

      this.comments = { total: 0, list: [] };
      if (this.user.role == "PERSONNEL") {
        this.getPersonnelCommentList();
      } else {
        this.getCommentList();
      }
    },
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
            this.params.journalId +
            "/comments",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.comments = res.data.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadComment = false;
        });
    },
    getPersonnelCommentList() {
      this.loadComment = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$route.params.programId +
            "/participants/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.params.journalId +
            "/comments",
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.comments = res.data.data;
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadComment = false;
        });
    },
    postComment() {
      this.loaderDelete = true;
      if (this.user.role !== "PERSONNEL") {
        this.axios
          .post(
            config.baseUri +
              "/founder/team-memberships/" +
              this.membershipId +
              "/comments",
            this.params,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            this.refreshData();
          })
          .catch(() => {})
          .finally(() => {
            this.loaderDelete = false;
          });
      } else {
        this.axios
          .post(
            config.baseUri +
              "/personnel/mentorships/" +
              this.$route.params.mentorId +
              "/comments",
            this.params,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            this.refreshData();
          })
          .catch(() => {})
          .finally(() => {
            this.loaderDelete = false;
          });
      }
    },
    replyComment() {
      this.loaderDelete = true;

      if (this.user.role !== "PERSONNEL") {
        this.axios
          .post(
            config.baseUri +
              "/founder/team-memberships/" +
              this.membershipId +
              "/comments/" +
              this.parentId,
            this.params,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            this.refreshData();
          })
          .catch(() => {})
          .finally(() => {
            this.loaderDelete = false;
          });
      } else {
        this.axios
          .post(
            config.baseUri +
              "/personnel/mentorships/" +
              this.$route.params.mentorId +
              "/comments/" +
              this.parentId,
            this.params,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            this.refreshData();
          })
          .catch(() => {})
          .finally(() => {
            this.loaderDelete = false;
          });
      }
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
      if (this.user.role !== "PERSONNEL") {
        this.axios
          .delete(
            config.baseUri +
              "/founder/team-memberships/" +
              this.membershipId +
              "/comments/" +
              id,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            bus.$emit("callNotif", "info", "Comment Deleted");
            this.refreshData();
          })
          .catch((res) => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loaderDelete = false;
          });
      } else {
        this.axios
          .delete(
            config.baseUri +
              "/personnel/mentorships/" +
              this.$route.params.mentorId +
              "/comments/" +
              id,
            {
              headers: auth.getAuthHeader(),
            }
          )
          .then(() => {
            bus.$emit("callNotif", "info", "Comment Deleted");
            this.refreshData();
          })
          .catch((res) => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loaderDelete = false;
          });
      }
    },
    refreshData() {
      if (this.user.role !== "PERSONNEL") {
        this.getCommentList();
      } else {
        this.getPersonnelCommentList();
      }
      this.dialog = false;
      this.dialogDelete = false;
      this.params.message = "";
    },
  },
};
</script>
<style scoped>
@import "~simplemde/dist/simplemde.min.css";
/* min height */
/* .markdown-editor .CodeMirror,
.markdown-editor .CodeMirror-scroll {
  min-height: 200px;
} */
/* static height */
.markdown-editor .CodeMirror {
  height: 100px;
}

.panel {
  position: relative;
  background: #aaa;
  color: #fff;
  padding: 13px;
  border-radius: 6px;
  margin-bottom: 0px !important;
}
.panel > .panel-heading:after,
.panel > .panel-heading:before {
  position: absolute;
  top: 11px;
  left: -16px;
  right: 100%;
  width: 0;
  height: 0;
  display: block;
  content: " ";
  border-color: transparent;
  border-style: solid solid outset;
  pointer-events: none;
}
.panel > .panel-heading:after {
  border-width: 7px;
  border-right-color: #aaa;
  margin-top: 1px;
  margin-left: 2px;
}
.panel > .panel-heading:before {
  border-right-color: #ddd;
  border-width: 8px;
}
.v-list-item__subtitle {
    -webkit-line-clamp: inherit !important;
}
</style>
