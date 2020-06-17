<template>
  <v-app light>
    <v-app-bar class="px-lg-12 pt-lg-5 elevation-0 toolbarcustom">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <v-img class="mt-2" max-width="110" src="/img/logo.png"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-md-flex d-lg-flex">
        <v-btn text>Home</v-btn>
        <v-btn to="/signup" text>Registration</v-btn>
        <v-btn
          style=" border-radius: 28px !important;height: 34px !important;position: relative;top: 16px;"
          dark
          color="primary"
          to="/login"
          >Login</v-btn
        >
      </v-toolbar-items>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="d-flex d-sm-none" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-btn block text>Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="/signup" text>Registration</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="/login" text>Login</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <section style="max-height:590px">
        <v-img class="imgkastem" src="/img/mainbanner.jpg">
          <div class="container" style="margin-top:140px;">
            <v-row>
              <v-col cols="12" xs="6" sm="6">
                <v-card style="opacity:0.9" elevation="0" class="pa-1">
                  <v-card-title style="display: block" primary-title>
                    <div class="headline">New Normal = New Opportunities</div>
                    <div class="garis"></div>
                  </v-card-title>
                  <v-card-text style="text-align:justify;">
                    Pandemi telah mengubah pola pikir, perilaku dan budaya
                    masyarakat dan organisasi yang akhirnya memunculkan
                    kebutuhan dan permasalahan baru untuk menyesuaikan dengan
                    standar normal yang baru. Melalui inovasi, permasalahan dan
                    kebutuhan tersebut dapat menjadi peluang yang membawa
                    manfaat bagi seluruh pihak.
                  </v-card-text>
                  <!-- <v-btn to="/signup" large>
                  Registration
                  </v-btn>-->
                </v-card>
                <v-card
                  style="opacity:0.9"
                  elevation="0"
                  class="pa-1 mt-1 pt-0"
                >
                  <v-card-title style="display: block" primary-title>
                    <div class="headline">Program Inkubasi Virtual</div>
                    <div class="garis"></div>
                  </v-card-title>

                  <v-card-text style="text-align:justify;">
                    Jangan lewatkan momentum yang baik untuk berinovasi. Ikuti
                    program ini dari mana saja dan kapan saja untuk mendapatkan
                    dukungan penuh pada perjalanan inovasi yang kamu lalui.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" xs="6" sm="6"></v-col>
            </v-row>
          </div>
        </v-img>
      </section>

      <section>
        <v-layout wrap class="py-12" align-center>
          <v-flex xs12 md12>
            <v-container grid-list-xl>
              <v-card
                dark
                elevation="5"
                class="pa-5"
                shaped
                color="#00667f"
                style="padding-top:50px !important;padding-bottom:50px !important;"
              >
                <v-layout row wrap align-center>
                  <v-flex xs12 md6 style="text-align:center">
                    <h1>Daftarkan diri anda segera !</h1>
                  </v-flex>
                  <v-flex xs12 md6 style="text-align:center">
                    <v-btn to="/signup" x-large color="#fd4010">
                      Registration
                      <v-icon class="ml-3">mdi-arrow-right-bold-circle</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id="accent2" style="background:#e8e8e8 !important;">
        <div class="container" style="text-align:center">
          <div class="headline" style="margin-top:90px;">
            List Mentor
          </div>
        </div>
        <v-carousel height="auto" hide-delimiters>
          <v-carousel-item>
            <div class="container">
              <v-row
                style="margin-top:10px;margin-bottom:30px;text-align:center;"
              >
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="3"
                  lg="3"
                  v-for="mentor in mentors1"
                  :key="mentor.id"
                >
                  <v-btn
                    class="sbio"
                    color="primary"
                    x-small
                    rounded
                    elevation="5"
                    @click="openDialog(mentor)"
                  >
                    short bio
                  </v-btn>
                  <v-img
                    style="margin:0 auto"
                    max-width="200"
                    :src="mentor.photo"
                  ></v-img>
                  <h3 class="mt-5">{{ mentor.name }}</h3>
                  <p>
                    {{ mentor.role }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-carousel-item>
        </v-carousel>
      </section>

      <section id="accent3" style="background: #fff !important;"></section>

      <section style="min-height:400px;" class="mt-12">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12 text-center">
            <v-flex class="my-11">
              <div class="text-center">
                <h2 class="mb-1 headline">Contact Us</h2>
                <div style="margin:0 auto;" class="garis mb-5"></div>
                <span class="subheading"
                  >Terima kasih telah mengunjungi situs web kami, jika ada
                  pertanyaan yang akan diajukan, hubungi email kami</span
                >
              </div>
              <div class="imail mt-5 py-2 px-5">
                <h2 style="color:#00667f">
                  <v-icon class="mr-2" large color="#00667f"
                    >mdi-email-edit-outline</v-icon
                  >info@mikti.org
                </h2>
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

    <dialog-mentor
      v-if="dialogMentor"
      :dialog.sync="dialogMentor"
      :mentor="mentor"
    />
  </v-app>
</template>

<script>
import DialogMentor from "./DialogBio";

export default {
  name: "App",
  components: {
    DialogMentor,
  },
  data: function() {
    return {
      title: "Home",
      dialogMentor: false,
      mentor: {},
      mentors1: [
        {
          id: "111",
          name: "Dibya Pradana",
          role: "CEO PT. Jejala Pararta International and CTO PT. Ayomobile",
          bio:
            "Dibya Pradana is a specialist in IS/IT Planning and\n Digital Business Re-engineering. Experienced CEO at PT\n Jejala Pararta International and Founder/CTO PT\n Ayomobile Media International. Actively involved as a\n Consultant at Bappenas and Coordinating Ministry for\n Economic Affairs. Furthermore, also taking a role as\n Director Executive at Bandung, Jogja, Makassar Digital\n Valley under MIKTI.",
          photo: "/img/dibya.png",
        },
        {
          id: "112",
          name: "Dina Dellyana",
          role: "Director, Bussiness Incubator at SBM ITB",
          bio: "this is dina bio",
          photo: "/img/dina.png",
        },
      ],
      mentors2: [],
    };
  },
  methods: {
    openDialog(mentor) {
      this.mentor = mentor;
      this.dialogMentor = true;
    },
  },
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
.toolbarcustom {
  position: absolute;
  z-index: 1;
  background-color: transparent !important;
  border-color: transparent !important;
}
.vertical-center {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}

#accent2 {
  background: #fafafa;
  position: relative;
}

#accent2:before {
  content: "";
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
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 40px solid rgb(232, 232, 232);
  border-left: 40px solid #fff;
  width: 50%;
}

.sbio {
  position: relative;
  right: 101px;
  top: 182px;
  z-index: 9;
}
</style>
