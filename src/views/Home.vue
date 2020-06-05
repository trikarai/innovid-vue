<template>
  <v-app light>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items class="d-none d-md-flex d-lg-flex">
        <v-btn text>Home</v-btn>
        <v-btn to="/signup" text>Registration</v-btn>
        <v-btn style=" border-radius: 28px !important;height: 34px !important;position: relative;top: 16px;" dark color="primary" to="/login">Login</v-btn>
      </v-toolbar-items>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <section style="max-height:590px">
        <v-img class="imgkastem" src="/img/mainbanner.jpg">
        <div class="container" style="margin-top:190px;">
          <v-row>
              <v-col cols="12" xs="6" sm="6">
              <v-card style="opacity:0.9" elevation="0" class="pa-5">
                <h1>New Normal = New Opportunities</h1>
                <div class="garis"></div>
                <div style="margin-top:40px;"></div>
                <p style="text-align: justify !important;">
                  Pandemi telah mengubah pola pikir, perilaku dan budaya masyarakat dan organisasi yang akhirnya memunculkan kebutuhan dan permasalahan baru untuk menyesuaikan dengan standar normal yang baru.
Melalui inovasi, permasalahan dan kebutuhan tersebut dapat menjadi peluang yang membawa manfaat bagi seluruh pihak.

                </p>
                <!-- <v-btn to="/signup" large>
                  Registration
                </v-btn> -->
              </v-card>  
              </v-col>
              <v-col cols="12" xs="6" sm="6">
                
              </v-col>
          </v-row>
        </div>
        </v-img>
      </section>

      <section>
        <v-layout wrap class="py-12" align-center>
          <v-flex xs12 md12>
            <v-container grid-list-xl>
            <v-card dark elevation="5" class="pa-5" shaped="20" color="#00667f" style="padding-top:50px !important;padding-bottom:50px !important;">
              <v-layout row wrap align-center>
                <v-flex xs12 md6 style="text-align:center">
                  <h1>Daftarkan diri anda segera !</h1>
                </v-flex>
                <v-flex xs12 md6 style="text-align:center">
                  <v-btn to="/signup" x-large color="#fd4010">
                  Registration <v-icon class="ml-3">mdi-arrow-right-bold-circle</v-icon>
                </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id="accent2" style="background:#e8e8e8 !important;">
        <v-layout column wrap class="py-12" align-center>
          <!-- <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="headline">The best way to start developing</h2>
              <span class="subheading">Cras facilisis mi vitae nunc</span>
            </div>
          </v-flex> -->
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="primary--text text--darken-2">mdi-flash</v-icon>
                    </v-card-text> -->
                    <v-card-title style="display: block" primary-title>
                      <div class="headline">Program Inkubasi Virtual</div>
                      <div class="garis"></div>
                    </v-card-title>
                    
                    <v-card-text style="text-align:justify;">
                     Jangan lewatkan momentum yang baik untuk berinovasi. Ikuti program ini dari mana saja dan kapan saja untuk mendapatkan dukungan penuh pada perjalanan inovasi yang kamu lalui.

                    </v-card-text>
                  </v-card>                 
                </v-flex>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-img style="margin: 0 auto !important;position:relative;top:30px;" max-width="481px" src="/img/fillforms.png"></v-img> 
                  </v-card>        
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id="accent3" style="background: #fff !important;">
        <!-- <v-layout column wrap class="py-12" align-center>
         
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-img style="margin: 0 auto !important;" max-width="363px" src="/img/i-organitation.png"></v-img> 
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                  
                    <v-card-title style="display: block" primary-title>
                      <div class="headline">Managing Multi Stream Innovation Programs</div>
                      <div class="garis"></div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout> -->
      </section>

      <section>
        <v-parallax dark src="https://picsum.photos/1920/1080?grayscale">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">Web development has never been easier</div>
            <em>Kick-start your application today</em>
            <v-btn
              class="mt-12"
              color="primary--text text--darken-2"
              dark
              large
              router
              to="/personnel"
            >Personnel</v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section style="min-height:400px;" class="mt-12">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12 text-center">
            
            <v-flex class="my-11">
              <div class="text-center">
              <h2 class="mb-1 headline">Contact Us</h2>
              <div style="margin:0 auto;" class="garis mb-5"></div>
              <span class="subheading">
Terima kasih telah mengunjungi situs web kami, jika ada pertanyaan yang akan diajukan, hubungi email kami</span>
               
              </div>
              <div class="imail mt-5 py-2 px-5">
                <h2 style="color:#00667f"><v-icon class="mr-2" large color="#00667f">mdi-email-edit-outline</v-icon> info@mikti.org</h2>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer color="primary">
        <v-layout row wrap align-center>
          <v-flex class="text-center" xs12>
            <div class="white--text ml-4">@2020, start.mikti.id</div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      title: "Home"
    };
  }
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
