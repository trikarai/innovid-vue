<template>
  <v-container fluid>
    <v-row id="welcome">
      <v-col cols="12" xl="8" lg="8" md="8" sm="12">
        <v-card class="pa-5">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vRnq7nPBoVj3JczUpfA2OMOiocdJxdX0cGZ5NKJmA7MGpVAYNdaTbnzg1TON7NMnlQdoT_A1JcRi-rd/embed?start=false&amp;loop=false&amp;delayms=10000"
            width="100%"
            height="440"
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
        <v-card class="pa-5">
          <v-card-title class="mb-5">
            <h4 style="color:#00667f;">Jadwal Webinar Series</h4>
          </v-card-title>
          <template>
            <div>
              <v-simple-table
                :dense="dense"
                :fixed-header="fixedHeader"
                :height="height"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left"><b>Tanggal</b></th>
                      <th class="text-left"><b>Waktu</b></th>
                      <th class="text-left"><b>Narasumber</b></th>
                      <th class="text-left"><b>Profil</b></th>
                      <th class="text-left"><b>Topik</b></th>
                      <!-- <th class="text-left">Link Google Meet</th> -->
                      <th class="text-left"><b>Moderator</b></th>
                      <th class="text-left"><b>Profil</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.tanggal">
                      <td>{{ item.tanggal }}</td>
                      <td>{{ item.waktu }}</td>
                      <td>{{ item.narasumber }}</td>
                      <td>{{ item.profil }}</td>
                      <td>{{ item.topik }}</td>
                      <!-- <td>{{ item.linkGoogleMeet }}</td> -->
                      <td>{{ item.moderator }}</td>
                      <td>{{ item.profilm }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </template>
          <v-card-subtitle
            >*keterangan : <b>Link Google Meet</b> -> Diinformasikan ke email
            peserta yang terdaftar</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="9" lg="9" md="9" sm="12">
        <v-card class="pa-5" elevation="">
          <v-card-title class="mb-5">
            <h4 style="color:#00667f;">Frequently Asked Questions (FAQ)</h4>
          </v-card-title>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Apakah program inkubasi MIKTI-Start ini full online?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Ya. Seluruh informasi penting diberikan terstruktur dan lengkap
                berdasarkan framework dan metodologi inovasi yang diakui global
                (lean startup, design thinking dan agile development). Kemudahan
                implementasi materi dengan template worksheet (seperti LKS)
                mempermudah mentor memonitor perkembangan startup.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b>Kapan batas akhir pendaftaran?</b></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Tidak ada. Pendaftaran dapat dilakukan kapan saja Anda siap dan
                bisa langsung mulai mengikuti program inkubasi setelah profil
                seluruh tim pendiri dipastikan terisi lengkap.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Bagaimana proses seleksi dilakukan?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Founder startup dapat langsung mengikuti program tanpa seleksi.
                Kami percaya tidak ada seleksi yang lebih baik dari seleksi
                alam.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Berapa lamakah masa inkubasinya?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                FLEKSIBILITAS, setiap startup memiliki tantangan yang berbeda
                dan dapat menentukan kecepatan sesuai kondisinya, tidak ada
                durasi baku untuk setiap tahapan. Waktu yang baku, membuat
                startup tergesa-gesa dan mengabaikan faktor risiko yang penting.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Bagaimana jika bidang startup saya tidak ada dalam sesi
                  webinar series, apakah masih bisa ikut? Misal robotic?
                </b></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Webinar series merupakan bagian dari program Inkubasi Virtual
                MIKTI-Start yang diselenggarakan untuk memperkaya ide founder
                startup. Saat memasuki program inkubasi, KONSULTASI, founder
                dapat memilih mentor yang berbeda, sesuai dengan kebutuhan, isu
                ataupun bidang industri startup.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Kami masih di tahap validasi market, apakah bisa ikut?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Semua founder startup digital (terutama tahap pre-startup),
                dapat mengikuti MIKTI-Start. Selama disiplin pada diri sendiri,
                memiliki tekad dan kesungguhan, founder startup di mana pun
                dapat memperoleh dukungan yang diperlukan.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Apakah sudah harus punya pitch deck?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Cukup melengkapi data profil dan tim yang ada pada dashboard
                akun peserta.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><b
                  >Bagaimana kalau saya punya pertanyaan khusus seputar program
                  yang tidak ada di halaman website?</b
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Silahkan bertanya via WhatsApp ke
                <b>082169784988 (Dayu)</b> Untuk informasi terkini silahkan
                kunjungi instagram <b>@infomikti atau @a.incubator_id.</b>

                <br /><br />Untuk Kendala teknis, silahkan email lebih dulu ke
                <b>start@mikti.org.</b>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$vuetify.goTo("#welcome", {
      offset: 100,
    });
  },
  data: () => ({
    dense: false,
    fixedHeader: false,
    height: 400,
    desserts: [
      {
        tanggal: "Selasa, 30 Juni 2020",
        waktu: "13.20 - 13.50 WIB",
        narasumber: "MIKTI Start",
        profil: "",
        topik: "Penjelasan Mengenai Program MIKTI Start",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "",
        profilm: "",
      },
      {
        tanggal: "Selasa, 30 Juni 2020",
        waktu: "14.00 - 15.00 WIB",
        narasumber: "Arief Yahya ",
        profil: "CEO PT. Telkom ( 2012-2014), Menteri Pariwisata (2014-2019)",
        topik: "Strategi Kolaborasi Startup Dengan Korporat",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "Indra Purnama",
        profilm: "Managing Partner Angel.ID",
      },
      {
        tanggal: "Selasa, 30 Juni 2020",
        waktu: "16.00 - 17.30 WIB",
        narasumber: "Sarita Sutedja",
        profil: "Founder Upnormal & Bakso Boedjangan, Co-Founder Foodizz",
        topik:
          "Bagaimana Pandemi Mengubah Sektor Industri Kuliner? Peluang Inovasi Apa Yang Muncul?",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "Rendi",
        profilm: "General Manager MIKTI",
      },
      {
        tanggal: "Selasa, 7 Juli 2020",
        waktu: "19.00 - 20.30 WIB",
        narasumber: "Irfan Setiaputra",
        profil: "Direktur Utama PT. Garuda Indonesia (Persero) Tbk.",
        topik:
          "Bagaimana Pandemi Mengubah Sektor Industri Transportasi? Peluang Inovasi Apa Yang Muncul?",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "M. Andy Zaky",
        profilm: "Managing Partner Angel.ID",
      },
      {
        tanggal: "Jumat, 10 Juli 2020",
        waktu: "19.00 - 20.30 WIB",
        narasumber: "Chaidir Akbar",
        profil: "Triathlete, Training & Racing Advisory",
        topik:
          "Bagaimana Pandemi Mengubah Sektor Industri Olahraga? Peluang Inovasi Apa Yang Muncul?",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "Rahmadayu",
        profilm: "Journey Manager Angel.ID",
      },
      {
        tanggal: "Jumat, 10 Juli 2020",
        waktu: "dalam konfirmasi",
        narasumber: "Ade Rai",
        profil: "Fitness Expert, Founder Rai Fitness",
        topik:
          "Bagaimana Pandemi Mengubah Sektor Personal Health? Peluang Inovasi Apa Yang Muncul?",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "Rahmadayu",
        profilm: "Journey Manager Angel.ID",
      },
      {
        tanggal: "Selasa, 21 Juli 2020",
        waktu: "19.00 - 20.30 WIB",
        narasumber: "Indra Utoyo",
        profil: "Managing Director of Digital Banking and IT of BRI",
        topik:
          "New Normal: Perubahan & Peluang Inovasi Pada Sektor Industri Perbankan",
        // linkGoogleMeet: 'Diinformasikan ke email peserta yang terdaftar',
        moderator: "Arief Widhiyasa",
        profilm: "CEO Agate",
      },
    ],
  }),
};
</script>
