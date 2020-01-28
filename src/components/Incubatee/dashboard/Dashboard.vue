<template>
  <v-container extend grid-list-xs>
    <v-row name="one">
      <v-col md="3">
        <v-card>
          <v-card-title primary-title>
            <v-icon left x-large>folder_shared</v-icon>
            <div>
              <h3 class="headline mb-0">Profile</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card>
          <v-card-title primary-title>
            <v-icon left x-large>groups</v-icon>
            <div>
              <h3 class="headline mb-0">Team</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" hide-default-footer>
          <template v-slot:header>
            <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
              <v-toolbar-title>Participated Program</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn color="primary">Mission</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn color="primary">Mentoring</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-btn color="red">Quit</v-btn>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Program 1",
          description: "Lorem Ipsum 1"
        },
        {
          name: "Program 2",
          description: "Lorem Ipsum 2"
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>