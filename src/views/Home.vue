<template>
  <v-app light>
    <v-app-bar 
      style="z-index:9;"
      color="white"
      absolute
      transparent
      elevate-on-scroll 
      scroll-target="#scrolling-techniques-7"
      class="px-8">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      
      <v-toolbar-title class="">
        <v-img class="" max-width="80" src="/img/logo.png"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-md-flex d-lg-flex">
        <v-btn text>Home</v-btn>
        <v-btn href="http://blog.innov.id" text>Blog</v-btn>
        <v-btn style="border-radius: 28px !important;height: 34px !important;position: relative;top: 16px;" dark color="primary" to="/login">Login</v-btn>
      </v-toolbar-items>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="d-flex d-sm-none" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <!-- <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
        <v-list>
          <v-list-item>
            <v-btn block text>Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="/signup" text>Blog</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="/login" text>Login</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-sheet 
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="750"
    >
    <v-container fluid class="ml-0 pl-0 mr-0 pr-0" style="height: 1500px;padding-top:0px">
      <section>
        <v-img max-height="750" class="imgkastem" src="/img/hero.jpg">
        <v-container style="margin-top:250px;">       
          <v-row>
              <v-col cols="12" xs="6" sm="6">
                <h1 class="d-none d-md-flex d-lg-flex">Platform Kolaborasi Proses Inovasi & Pendampingan Bisnis</h1>
                <h3 class="grey--text d-none d-md-flex d-lg-flex">untuk Inkubator, Akselerator & Perusahaan</h3>
                <div class="garis d-none d-md-flex d-lg-flex"></div>
                <div class="d-none d-md-flex d-lg-flex" style="margin-top:40px;"></div>
                <p class="d-none d-md-flex d-lg-flex" style="text-align: justify !important;">
                  Lebih berorientasi hasil dan lebih mudah dalam menyelenggarakan program inkubasi, akselerasi, atau program inovasi dan pendampingan bisnis lainnya 
                </p>
                <v-btn width="200" class="d-none d-md-flex d-lg-flex" color="primary" to="/signup" large>
                  Registration
                </v-btn>
              <v-card class="pa-5 d-sm-none" elevation="0" style="opacity:0.8;">
                <h1>Platform Kolaborasi Proses Inovasi & Pendampingan Bisnis</h1>
                <h3 class="grey--text">untuk Inkubator, Akselerator & Perusahaan</h3>
                <div class="garis"></div>
                <div style="margin-top:40px;"></div>
                <p style="text-align: justify !important;">
                  Lebih berorientasi hasil dan lebih mudah dalam menyelenggarakan program inkubasi, akselerasi, atau program inovasi dan pendampingan bisnis lainnya 
                </p>
                <v-btn color="primary" to="/signup" large>
                  Registration
                </v-btn>
              </v-card>
              </v-col>
              <v-col cols="12" xs="6" sm="6">
                
              </v-col>
          </v-row>
        </v-container>
        </v-img>
      </section>

      <section>
        <v-container class="py-10 my-10">
        <v-row>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card height="260" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title>Easy to Use</v-card-title>
              <v-card-text>
                Aktivitas dan proses yang selama ini harus dikelola secara langsung dan intensif, akan lebih mudah dikelola dengan menggunakan innov.id. Mulai dari pelatihan, dokumentasi hasil kerja, monitoring, pendampingan, mentoring, evaluasi hingga aktivitas sinergi dengan pihak eksternal. 
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card height="260" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title>Human Centered Design</v-card-title>
              <v-card-text>
                Lembar kerja, data & laporan aktivitas, data capaian metric / KPI, catatan mentoring dan laporan evaluasi yang tersimpan secara digital dan terpusat akan memberikan informasi yang lengkap mengenai perkembangan, isu dan permasalahan dari setiap startup / inovator yang dapat ditindaklanjuti oleh pengelola program.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card height="260" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title>Startup Friendly</v-card-title>
              <v-card-text>
                Bidang industri, teknologi atau fase perkembangan yang berbeda terkadang membutuhkan pendekatan yang berbeda pula. Dengan innov.id, penyelenggaraan sejumlah program yang berbeda dalam waktu yang bersamaan akan jauh lebih mudah untuk dikelola.
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
        </v-container>
      </section>

      <section id="accent2" style="background:#e8e8e8 !important;">
        <v-layout column wrap class="py-12" align-center>
          <!-- <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="headline">The best way to start developing</h2>
              <span class="subheading">Cras facilisis mi vitae nunc</span>
            </div>
          </v-flex> -->
            <v-container grid-list-xl>
              <v-row>
                <v-col cols="12" xs="12" md="6" lg="6">                    
                      <v-img style="margin: 0 auto !important;position:relative;top:19px;" src="/img/illustration-1.png"></v-img>                 
                </v-col>
                <v-col class="mt-6" cols="12" xs="12" md="6" lg="6">
                  <div class="headline mt-10">Mengapa Perlu Innov.id ?</div>
                  <div class="garis"></div>           
                  <template>
                    <v-expansion-panels class="mt-10" focusable>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Kelola Proses Lebih Mudah</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                          Aktivitas dan proses yang selama ini harus dikelola secara langsung dan intensif, akan lebih mudah dikelola dengan menggunakan innov.id. Mulai dari pelatihan, dokumentasi hasil kerja, monitoring, pendampingan, mentoring, evaluasi hingga aktivitas sinergi dengan pihak eksternal.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Informasi Holistik Mengenai Perkembangan Startup / Inovator</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                          Lembar kerja, data & laporan aktivitas, data capaian metric / KPI, catatan mentoring dan laporan evaluasi yang tersimpan secara digital dan terpusat akan memberikan informasi yang lengkap mengenai perkembangan, isu dan permasalahan dari setiap startup / inovator yang dapat ditindaklanjuti oleh pengelola program.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Kelola Sejumlah Program Simultan</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                          Bidang industri, teknologi atau fase perkembangan yang berbeda terkadang membutuhkan pendekatan yang berbeda pula. Dengan innov.id, penyelenggaraan sejumlah program yang berbeda dalam waktu yang bersamaan akan jauh lebih mudah untuk dikelola.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Fokus Pada Isu Strategis </v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                         Dengan semakin sederhananya pengelolaan proses dan aktivitas serta semakin lengkapnya informasi yang dapat diakses, maka pengelola dan mentor dapat lebih mengalokasikan waktu dan pikirannya pada aspek dan dukungan yang lebih strategis dan tepat sasaran untuk masing-masing startup / inovator.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Jangkau Peserta & Mentor Lebih Luas</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                          Tatap muka langsung memang lebih baik. Tapi jangan sampai perbedaan kota domisili menjadi kendala dalam menerima startup / inovator yang potensial dan merekrut mentor yang berkualitas. Dengan innov.id, startup / innovator dapat terfasilitasi dan mentor dapat berkontribusi tanpa batasan wilayah.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>Proses Inovasi yang Kolaboratif</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                          Interaksi antara tim startup / innovator, mentor dan pengelola program akan lebih intensif dan cepat. Seluruh pihak tersebut dapat mengakses informasi yang sama untuk dijadikan referensi atas setiap aksi yang dilakukan.
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </template>        
                </v-col>
              </v-row>
            </v-container>
        </v-layout>
      </section>

      <section id="accent3" style="background: #fff !important;">
      <v-container style="height:100% !important;" fluid>
        <v-row justify="center">
          <div class="mt-12 pt-12 mb-12 text-center">
              <h2 class="mb-1 headline">Fitur Innov.ID</h2>
              <div style="margin:0 auto;" class="garis mb-5"></div>
                <!-- <span class="subheading">Thank you for visiting our website, if there any questions that will be submitted, press the button below</span>           -->
          </div>
        </v-row>
        <v-row>
          <template>
            <v-carousel height="100%" hide-delimiters>
              <v-carousel-item>
              <v-row class="px-15">
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/flow.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Alur & Materi Pembelajaran
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Sajikan materi yang perlu dipelari oleh startup / inovator dalam alur yang sesuai, sehingga mereka dapat mempelajarinya secara mandiri
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/worksheet.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Lembar Kerja / Canvas
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Permudah proses implementasi & eksekusi oleh setiap startup / inovator dengan lembar kerja / canvas yang dapat dirancang dan disesuaikan dengan mudah.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/monitor.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Monitor & Feedback
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                         Analisa perkembangan & kualitas implementasi dari masing-masing startup / inovator, dan berikan masukan sesuai kebutuhan.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/meet.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Mentoring & Pelaporan
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Permudah startup / inovator dalam mengajukan jadwal konsultasi dengan mentor pilihannya. Fasilitasi meeting room virtual khusus untuk sesi tersebut, lalu kumpulkan & kelola laporan sesi mentoring dari startup / inovator & mentor secara terpusat.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
              </v-row>
              </v-carousel-item>
              <v-carousel-item>
              <v-row class="px-15">
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/stat.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Target & Capaian
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Definisikan dan alokasikan target (KPI / metric) yang berbeda untuk masing-masing startup / inovator, dan lihat hasil capaiannya dari waktu ke waktu. 
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/evaluasi.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Evaluasi
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Rencanakan tahapan evaluasi kepada setiap startup / inovator, serta kelola laporan dan hasil keputusannya secara terpusat.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/setup_wizard.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            Pengelolaan Aktivitas
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Rencanakan, kelola dan laporkan seluruh aktivitas yang berkaitan dengan program, baik yang hanya dilaksanakan oleh satu startup / inovator saja maupun yang bersifat lintas peran & pemangku kepentingan.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <template>
                      <v-card
                        light
                        justify-center
                        class="mx-auto text-center"
                        max-width="344"
                        min-height="444"
                      >
                        <div class="pa-4">
                          <v-img
                            class="pa-5"
                            src="/img/setup.png"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-chip
                          class="mt-8"
                          color="primary"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          <h3>
                            White-Labelling
                          </h3>
                        </v-chip>

                        <v-card-subtitle>
                          Hilangkan identitas solusi ini di mata peserta dan pemangku kepentingan lainnya. Gunakan alamat web, logo dan warna tema sesuai organisasi.
                        </v-card-subtitle>

                        <v-expand-transition>
                          <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                              
                            </v-card-text>
                          </div>
                        </v-expand-transition>
                      </v-card>
                  </template>
                </v-col>
              </v-row>
              </v-carousel-item>
            </v-carousel>
          </template>
        </v-row>
      </v-container>
      </section>

      <section style="margin:100px 0px 100px 0px;">
        <v-container>
          <div class="text-center">
              <h2 class="mb-1 headline">Partner</h2>
              <div style="margin:0 auto;" class="garis mb-5"></div>            
          </div>
          <v-row>
            <v-col cols="12" md="6">
              <v-img class="mx-auto" max-width="200" src="/img/mikti.png"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-img class="mx-auto" max-width="200" src="/img/aibi.png"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section style="min-height:400px;" class="backcu mt-12">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12 text-center">
            
            <v-flex class="my-11">
              <div class="text-center">
                <h2 class="mb-1 headline">Hubungi Kami</h2>
                <div style="margin:0 auto;" class="garis mb-5"></div>
                <span class="subheading">Terima kasih telah mengunjungi website kami, jika ada pertanyaan yang ingin diajukan, kirim melalui e-mail dibawah ini</span>   
              </div>
              <v-row justify="center">
              <v-card class="pa-5 px-7 mt-5" dark>
              <div class="mx-auto" style="display:inline-flex;">
              <v-img width="50" src="/img/email.png"/>
              <h1 class="mt-3 ml-5" color="primary">info@innov.id</h1>
              </div>
              </v-card>
              </v-row>
            </v-flex>
            
          </v-layout>
        </v-container>
      </section>

      <v-footer color="primary darken-2">
        <v-layout row wrap align-center>
          <v-flex class="text-center" xs12>
            <div class="white--text ml-4">@2021, innov.id</div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-container>
    </v-sheet>
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
header.v-sheet.theme--light.v-toolbar.v-toolbar--absolute.v-app-bar.v-app-bar--elevate-on-scroll.v-app-bar--hide-shadow.white {
    background: transparent !important;
    /* color: #fff !important; */
}

.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
.toolbarcustom {
  /* position:absolute; */
  /* z-index:1; */
  background-color: transparent !important;
  border-color:transparent !important;
}
.vertical-center {
  min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}

#accent2 {
  background: #fafafa;
  position: relative;
}

#accent2:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-top: 40px solid #fff;
  border-left: 40px solid rgb(232, 232, 232);
  width: 50%;
}
#accent3 {
  background: #fafafa;
  position: relative;
}

#accent3:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-top: 40px solid rgb(232, 232, 232);
  border-left: 40px solid #fff;
  width: 50%;
}
.leftbrd {
  border-left-color: white;
  border-left-width: thick;
  border-left-style: inset;
}

</style>
