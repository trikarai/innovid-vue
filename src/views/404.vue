<template>
  <v-app
    style="background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(204,204,204,1) 0%, rgba(233,233,233,1) 100%);"
  >
    <v-container>
      <v-layout style="margin-top: 100px;" align-center justify-center wrap fill-height>
        <v-flex xs12 md6 class="text-md-right">
          <h1>Oooppsss..!</h1>
          <div class="garis404 ml-md-auto mb-3 mt-1"></div>
          <h4 class="font-weight-light">
            Looks like you're in uncharted territory. We don't know about this page yet.
            Luckily, we know the way back.
          </h4>
          <v-btn text style="float:right" class="blue white--text" @click="goback()">
            <v-icon left>history</v-icon>Go Back
          </v-btn>
        </v-flex>
        <v-flex xs12 md6>
          <v-img src="/img/404.png" style="margin:0 auto" max-width="300"></v-img>
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

<style scoped>
.garis404 {
  background: #fb7407;
  height: 5px;
  width: 74px;
}
</style>


