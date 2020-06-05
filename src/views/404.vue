<template>
  <v-app
    style="background: rgb(238, 238, 238);">
    <v-container>
      <v-layout style="margin-top: 50px;" align-center justify-center wrap fill-height>
        <v-flex xs12 md6 class="text-md-right">
          <h1 class="ma-3">Oooppsss..!</h1>
          <div class="garis ml-md-auto ma-3"></div>
          <h4 class="font-weight-light ma-3">
            Looks like you're in uncharted territory. We don't know about this page yet.
            Luckily, we know the way back.
          </h4>
          <v-btn class="white--text mt-5" color="primary" @click="goback()">
            <v-icon left>history</v-icon>Go Back
          </v-btn>
        </v-flex>
        <v-flex xs12 md6>
          <v-img class="mt-5" src="/img/404.png" style="margin:0 auto" max-width="500"></v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
  methods: {
    goback: function() {
      this.$router.go(-1);
    }
  }
};
</script>
