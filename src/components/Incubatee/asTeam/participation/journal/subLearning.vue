<template>
  <v-row>
    <v-col md="12 mt-5" class="title">Learning Material</v-col>
    <v-col cols="12" md="12" lg="12" xs="12" v-if="learningLoad">
      <v-skeleton-loader :loading="true" class="mx-auto" type="list-item-two-line@2" v-></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" lg="6" xs="12" v-if="learningList.total == 0">
      <v-alert dense type="info" :value="true">No Learning Material Added</v-alert>
    </v-col>
    <v-col cols="12" md="12" lg="12" xs="12" v-else>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(learning,i) in learningList.list" :key="i">
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="10">
                <span style="line-height: 32px;">
                  <b>{{learning.name}}</b>
                </span>
              </v-col>

              <v-col cols="2" style="text-align: end;" class="text--secondary">
                <v-spacer></v-spacer>
                <v-fade-transition leave-absolute>
                  <span v-if="open">
                    <v-chip small class="mr-2 mt-1" color="#505050" dark>Collapse</v-chip>
                  </span>
                  <span v-else>
                    <v-chip small class="mr-2 mt-1" color="#505050" dark>Expand</v-chip>
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
            <!-- <template v-slot:actions>
              <v-chip color="#505050" dark>
                Expand
                <v-icon class="ml-3" color="white">keyboard_arrow_down</v-icon>
              </v-chip>
            </template>-->
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mt-10 ml-4" v-if="learning.content">
            <span v-html="$sanitize(learning.content)" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["learningList", "learningLoad"]
};
</script>