<template>
  <v-row>
    <v-col md="12">
      <v-skeleton-loader class="mx-auto" type="card" v-if="tableLoad"></v-skeleton-loader>
      <v-card class="pa-3" v-else>
        <v-card-title primary-title>
          {{dataList.name}}
          <v-spacer></v-spacer>
          <span class="dot2"></span>
          <span class="dot1 ml-1"></span>
        </v-card-title>
        <v-card-text v-if="dataList.previousMission != null">
          <v-chip small>
            <v-avatar left>
              <v-icon small color="primary">account_tree</v-icon>
            </v-avatar>
            <span style="color:#999">Branch Mission</span>
          </v-chip>
        </v-card-text>
        <v-card-text v-else>
          <v-chip small>
            <v-avatar left>
              <v-icon small color="primary">assignment_turned_in</v-icon>
            </v-avatar>
            <span style="color:#999">Main Mission</span>
          </v-chip>
        </v-card-text>
        <v-card-text>
          <div class="subtitle">{{dataList.description}}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["dataList", "tableLoad"]
};
</script>
<style scoped>
</style>