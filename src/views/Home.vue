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
        <v-btn text>Fitur</v-btn>
        <v-btn text>harga</v-btn>
        <v-btn href="http://blog.innov.id" text>Blog</v-btn>
        <!-- <v-btn style="border-radius: 28px !important;height: 34px !important;position: relative;top: 16px;" dark color="primary" to="/login">Login</v-btn> -->
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
            <v-btn block to="#" text>Fitur</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="#" text>Harga</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="#" text>Blog</v-btn>
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
        <v-img min-height="750" aspect-ratio="1.9" class="imgkastem" src="/img/backbanner.jpg">
        <v-container>      
          <v-row>
              <v-col cols="12" md="5">
                <h1 class="d-none d-md-flex d-lg-flex typing"  style="margin-top:250px;max-width: 387px;font-size: 30px;">     
                  Platform Inovasi Kolaboratif
                </h1>
                <h3 class="grey--text d-none d-md-flex d-lg-flex">untuk Inkubator, Akselerator & Perusahaan</h3>
                <div class="garis d-none d-md-flex d-lg-flex"></div>
                <div class="d-none d-md-flex d-lg-flex" style="margin-top:40px;"></div>
                <p class="d-none d-md-flex d-lg-flex" style="text-align: justify !important;font-size: 17px;">
                  Lebih fokus pada aspek strategis dan dukungan tepat sasaran untuk setiap startup / inovasi
                </p>
                <v-btn width="200" class="d-none d-md-flex d-lg-flex" color="primary" to="/signup" large>
                  Demo Solusi
                </v-btn>
              <v-card class="pa-5 d-sm-none mt-14" elevation="0" style="opacity:0.8;">
                <h1 class="typing">Platform Inovasi Kolaboratif</h1>
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
              <v-col cols="12" md="7">
                <div class="css-f0zq8q">
                  <h1 style="transform: translate3d(0px, -15px, 0px);" role="text" class="css-6l4p0r">
                  <span class="css-rz4lf6"><span style="border: 3px solid transparent;" class="css-nfnndr typing2">Innovation</span>
                  <div class="css-1net4kr" style="transform: translate3d(-130px, -30px, 0px);" aria-hidden="true"><svg viewBox="0 0 22 24" fill="none" class="css-7s1cgq"><g filter="url(#filter0_d)"><path d="M7.5 17L5 4l11 6.5-5.5 1.5-3 5z" fill="currentColor"></path><path d="M7 17.1l.26 1.28.67-1.12 2.9-4.83 5.3-1.45 1.14-.3-1.02-.61-11-6.5-.95-.56.2 1.08 2.5 13z" stroke="#fff" stroke-linecap="square"></path></g><defs><filter id="filter0_d" x="0.6" y="0.01" width="20.95" height="23.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="x"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></feColorMatrix><feBlend in2="x" result="y"></feBlend><feBlend in="SourceGraphic" in2="y" result="shape"></feBlend></filter></defs></svg><div class="css-1msqe2r">Startup / Inovator</div></div></span>
                  <span style="transform: none;" class="css-79elbk">
                    <img class="imej" src="/img/pjourney.png" alt="" />
                  <div class="css-csv9hp" style="transform: translate3d(270px, -60px, 0px);" aria-hidden="true"><svg viewBox="0 0 22 24" fill="none" class="css-1jnkkb5"><g filter="url(#filter0_d)"><path d="M7.5 17L5 4l11 6.5-5.5 1.5-3 5z" fill="currentColor"></path><path d="M7 17.1l.26 1.28.67-1.12 2.9-4.83 5.3-1.45 1.14-.3-1.02-.61-11-6.5-.95-.56.2 1.08 2.5 13z" stroke="#fff" stroke-linecap="square"></path></g><defs><filter id="filter0_d" x="0.6" y="0.01" width="20.95" height="23.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="x"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></feColorMatrix><feBlend in2="x" result="y"></feBlend><feBlend in="SourceGraphic" in2="y" result="shape"></feBlend></filter></defs></svg>
                  <!-- <div class="css-36d1ie">Mae</div> -->
                  </div></span><br>
                  <span class="css-79elbk">
                    <div id=flip>
                      <div><div>Journey</div></div>
                      <div><div style="color:#00667f;">Journey</div></div>
                      <!-- <div><div>Journey</div></div> -->
                    </div>
                    <div class="css-mtg5mp" style="transform: translate3d(-240px, 70px, 0px);" aria-hidden="true">
                    <svg viewBox="0 0 22 24" fill="none" class="css-1uk24sa"><g filter="url(#filter0_d)"><path d="M7.5 17L5 4l11 6.5-5.5 1.5-3 5z" fill="currentColor"></path><path d="M7 17.1l.26 1.28.67-1.12 2.9-4.83 5.3-1.45 1.14-.3-1.02-.61-11-6.5-.95-.56.2 1.08 2.5 13z" stroke="#fff" stroke-linecap="square"></path></g><defs><filter id="filter0_d" x="0.6" y="0.01" width="20.95" height="23.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="x"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></feColorMatrix><feBlend in2="x" result="y"></feBlend><feBlend in="SourceGraphic" in2="y" result="shape"></feBlend></filter></defs></svg><div class="css-11kesv5">Mentor / Pendamping</div></div></span> <span style="transform: none;" class="css-79elbk"><div class="css-1up6dgi" style="transform: translate3d(180px, 80px, 0px);" aria-hidden="true"><svg viewBox="0 0 22 24" fill="none" class="css-aermcn"><g filter="url(#filter0_d)"><path d="M7.5 17L5 4l11 6.5-5.5 1.5-3 5z" fill="currentColor"></path><path d="M7 17.1l.26 1.28.67-1.12 2.9-4.83 5.3-1.45 1.14-.3-1.02-.61-11-6.5-.95-.56.2 1.08 2.5 13z" stroke="#fff" stroke-linecap="square"></path></g><defs><filter id="filter0_d" x="0.6" y="0.01" width="20.95" height="23.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="x"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></feColorMatrix><feBlend in2="x" result="y"></feBlend><feBlend in="SourceGraphic" in2="y" result="shape"></feBlend></filter></defs></svg><div class="css-1kyh9wu">Manajemen</div></div></span></h1>
                  <!-- <div class="css-1c72cp7">
                    <button class="css-1luajct">Try Figma for free</button>
                  </div> -->
                </div>      
              </v-col>
          </v-row>
        </v-container>
        </v-img>
      </section>

      <section>
        <v-container class="py-10 my-10">
        <v-row>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card min-height="157" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title style="font-size:22px;">Informasi holistik</v-card-title>
              <v-card-text style="font-size:18px;">
                Mengenai perkembangan dan isu dari setiap startup / inovasi
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card min-height="157" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title style="font-size:22px;">Penyederhanaan operasional</v-card-title>
              <v-card-text style="font-size:18px;">
                Termasuk pada pelaksanaan sejumlah program simultan 
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="12">
            <v-card min-height="157" class="pa-2 leftbrd"  color="primary" dark>
              <v-card-title style="font-size:22px;">Jangkau lebih luas</v-card-title>
              <v-card-text style="font-size:18px;">
                Startup, inovator dan mentor berkualitas, di manapun mereka berada
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

      <section id="accent3">
      <v-container style="height:100% !important;padding:0px 50px 0px 50px;" fluid>
        <v-row justify="center">
          <div class="mt-12 pt-12 mb-12 text-center">
              <h2 class="mb-1 headline">Fitur Innov.ID</h2>
              <div style="margin:0 auto;" class="garis mb-5"></div>
                <!-- <span class="subheading">Thank you for visiting our website, if there any questions that will be submitted, press the button below</span>           -->
          </div>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" xs="12" sm="12">
          </v-col>
          <v-col cols="12" md="8" xs="12" sm="12">
            <!-- fitur row 1 -->
            <v-row>
              <!-- fitur 1 -->
                <v-col cols="12" md="4" xs="12" sm="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/pjourney.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Program Journey
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog1"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Program Journey
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Sajikan materi yang perlu dipelari oleh startup / inovator dalam alur yang sesuai, sehingga mereka dapat mempelajarinya secara mandiri
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog1 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 2 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/play-button.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Multimedia Learning
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog2"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Multimedia Learning
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Framework & methodology best suits the program.e.g. Customer Development, Lean Startup, Design Thinking, TRL, etc
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog2 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 3 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/worksheet-1.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Worksheet / Canvas
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog3"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Worksheet / Canvas
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Permudah proses implementasi & eksekusi oleh setiap startup / inovator dengan lembar kerja / canvas yang dapat dirancang dan disesuaikan dengan mudah.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog3 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
            </v-row>
            <!-- fitur row 2 -->
            <v-row>
              <!-- fitur 1 -->
                <v-col cols="12" md="4" xs="12" sm="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/writing.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Mentor Feedback
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog4"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Mentor Feedback
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Analisa perkembangan & kualitas implementasi dari masing-masing startup / inovator, dan berikan masukan sesuai kebutuhan.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog4 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 2 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/chat.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Mentoring
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog5"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Mentoring
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Permudah startup / inovator dalam mengajukan jadwal konsultasi dengan mentor pilihannya. Fasilitasi meeting room virtual khusus untuk sesi tersebut, lalu kumpulkan & kelola laporan sesi mentoring dari startup / inovator & mentor secara terpusat.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog5 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 3 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/aim.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Metric & Target
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog6"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Metric & Target
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Definisikan dan alokasikan target (KPI / metric) yang berbeda untuk masing-masing startup / inovator, dan lihat hasil capaiannya dari waktu ke waktu. 
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog6 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
            </v-row>
            <!-- fitur row 3 -->
            <v-row>
              <!-- fitur 1 -->
                <v-col cols="12" md="4" xs="12" sm="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/timetable.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Activity Management
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog7"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                             Activity Management
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Rencanakan, kelola dan laporkan seluruh aktivitas yang berkaitan dengan program, baik yang hanya dilaksanakan oleh satu startup / inovator saja maupun yang bersifat lintas peran & pemangku kepentingan.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog7 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 2 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/magnifying-glass.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Progress Monitoring
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog8"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Progress Monitoring
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Analisa perkembangan & kualitas implementasi dari masing-masing startup / inovator, dan berikan masukan sesuai kebutuhan.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog8 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <!-- fitur 3 -->
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <img
                      src="/img/checklist.png"
                      class="fiturimg"
                    >

                    <v-card-title style="justify-content:center">
                      Evaluation
                    </v-card-title>

                    <v-card-subtitle>
                      
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-dialog
                        v-model="dialog9"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            Read More
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Evaluation
                          </v-card-title>

                          <v-card-text class="mt-6">
                            Rencanakan tahapan evaluasi kepada setiap startup / inovator, serta kelola laporan dan hasil keputusannya secara terpusat.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog9 = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="2" xs="12" sm="12">
          </v-col>
        </v-row>
        <v-row>

        <!-- slider backup -->
          <!-- <template>
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
          </template> -->
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
      title: "Home",
      show: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog9: false,
    };
  }
};
</script>

<style>
/* .v-responsive__sizer {
    padding-bottom: 0px !important;
} */
</style>

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
  /* background: #fafafa; */
  background: url(/img/backinnov.png);
  background-size: cover;
  background-attachment: fixed;
  position: relative;

}

#accent3:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-top: 40px solid rgb(232, 232, 232);
  border-left: 40px solid transparent;
  width: 50%;
}
.leftbrd {
  border-left-color: white;
  border-left-width: thick;
  border-left-style: inset;
}
.css-f0zq8q{
  width:100%;
  margin-top: 70px;
  background: url(/img/monitor-ij.png);
  background-size: cover;
  background-position-y: 72px;
  text-align:center;
  /* padding:70px 32px; */
  min-height:calc(100vh - 200px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.css-6l4p0r{font-family:'Whyte Inktrap',Whyte,sans-serif;font-size:60px;line-height:1;max-width:900px;margin:0 auto;-webkit-letter-spacing:-0.03em;-moz-letter-spacing:-0.03em;-ms-letter-spacing:-0.03em;letter-spacing:-0.03em;color:#000000;}.css-6l4p0r span{display:inline-block;}@media (max-width:960px){.css-6l4p0r{font-size:72px;}}@media (max-width:540px){.css-6l4p0r{font-size:64px;}}
.css-1net4kr{position:relative;position:absolute;
  top: -44px;
  left: 113px;
  z-index:3;}
.css-7s1cgq{color:#5551FF;width:22px;}
.css-nfnndr{border:3px solid #5551FF;}
.css-rz4lf6{
  top: 50px;
  right: 104px;
  /* width:3.2em; */
  text-align:left;position:relative;}
.css-1msqe2r{position:absolute;top:18px;left:14px;background-color:#5551FF;color:#fff;font-size:11px;font-weight:700;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;width:110px;text-align:center;padding:5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
.css-79elbk{
  top: 30px;
  right: 144px;
  position:relative;}
.css-csv9hp{position:relative;position:absolute;z-index:3;top:20%;left:15%;}
.css-36d1ie{position:absolute;top:18px;left:14px;background-color:#0FA958;color:#fff;font-size:11px;font-weight:700;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;width:110px;text-align:center;padding:5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
.css-1jnkkb5{color:#0FA958;width:22px;}
.css-mtg5mp{position:relative;position:absolute;z-index:3;top:54%;left:102%;}
.css-1uk24sa{color:#F24E1E;width:22px;}
.css-11kesv5{position:absolute;top:18px;left:14px;background-color:#F24E1E;color:#fff;font-size:11px;font-weight:700;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;width:135px;text-align:center;padding:5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
.css-79elbk{position:relative;}
.css-1up6dgi{position:relative;position:absolute;z-index:3;
  top: -40px;
  right: -2px;}
.css-aermcn{color:#A259FF;width:22px;}
.css-1kyh9wu{position:absolute;top:18px;left:14px;background-color:#A259FF;color:#fff;font-size:11px;font-weight:700;-webkit-letter-spacing:0;-moz-letter-spacing:0;-ms-letter-spacing:0;letter-spacing:0;width:110px;text-align:center;padding:5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
.css-q04hp6{font-size:var(--t1);line-height:1.3;-webkit-letter-spacing:0.01em;-moz-letter-spacing:0.01em;-ms-letter-spacing:0.01em;letter-spacing:0.01em;max-width:528px;margin:40px auto;}@media (max-width:800px){.css-q04hp6{line-height:1.5;}}
.css-1c72cp7{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}@media (max-width:540px){.css-1c72cp7{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}
.css-1luajct{background:#000000;color:#FFFFFF;display:inline-block;border-radius:8px;padding:14px 24px 16px;font-size:18px;font-weight:700;line-height:1;border:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:-webkit-transform 200ms,background 200ms;-webkit-transition:transform 200ms,background 200ms;transition:transform 200ms,background 200ms;}.css-1luajct:hover{-webkit-transform:translateY(-2px);-ms-transform:translateY(-2px);transform:translateY(-2px);-webkit-text-decoration:none;text-decoration:none;}.css-1luajct:active{-webkit-transform:translateY(1px);-ms-transform:translateY(1px);transform:translateY(1px);}.css-1luajct:disabled{pointer-events:none;}

.typing {
  position: relative;
}
.typing::after {
  content: "|";
  position: absolute;
  right: 0;
  width: 100%;
  color: #1d1f20;
  background: #ededed;
  -webkit-animation: typing 4s steps(28) forwards, caret 1s infinite;
          animation: typing 4s steps(28) forwards, caret 1s infinite;
}

@-webkit-keyframes typing {
  to {
    width: 0;
  }
}

@keyframes typing {
  to {
    width: 0;
  }
}

.typing2 {
  position: relative;
}
.typing2::after {
  content: "|";
  position: absolute;
  right: 0;
  width: 100%;
  color: #1d1f20;
  background: #fff;
  -webkit-animation: typing 4s steps(10) forwards, caret 1s infinite;
          animation: typing 4s steps(10) forwards, caret 1s infinite;
}

@-webkit-keyframes typing2 {
  to {
    width: 0;
  }
}

@keyframes typing2 {
  to {
    width: 0;
  }
}

@-webkit-keyframes caret {
  50% {
    color: transparent;
  }
}
@keyframes caret {
  50% {
    color: transparent;
  }
}

#flip {
  height:67px;
  overflow:hidden;
}

#flip > div > div {
  color:#1d1f20;
  padding:2px 12px;
  height:45px;
  margin-bottom:45px;
  display:inline-block;
}

#flip div:first-child {
  animation: show 5s linear;
}

/* #flip div div {
  background:#42c58a;
}
#flip div:first-child div {
  background:#4ec7f3;
}
#flip div:last-child div {
  background:#DC143C;
} */

@keyframes show {
  0% {margin-top:-270px;}
  5% {margin-top:-180px;}
  33% {margin-top:-180px;}
  38% {margin-top:-90px;}
  66% {margin-top:-90px;}
  71% {margin-top:0px;}
  99.99% {margin-top:0px;}
  100% {margin-top:-270px;}
}

/* p {
  position:fixed;
  width:100%;
  bottom:30px;
  font-size:12px;
  color:#999;
  margin-top:200px;
} */

body {
  background-color: #fff;
}

img.imej {
  left: 68px;
  /* max-width: 80%; */
  /* width: 17.5%; */
  position: absolute;
  top: 40px;
  /* left: 0; */
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 0;
  animation-name: imj;
  animation-delay: 2s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}


@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes imj {
  to {
    opacity: 1;
  }
}

.fiturimg {
  margin: 0 auto;
  width: 75px;
  display: block;
  padding-top: 26px;
}
</style>