<template>
  <v-app light>
    <v-app-bar class="px-lg-12 pt-lg-5 elevation-0 toolbarcustom">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <v-img class="mt-2" max-width="110" src="/img/logo.png"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-md-flex d-lg-flex">
        <v-btn dark text>Home</v-btn>
        <v-btn dark to="/signup" text>Registration</v-btn>
        <v-btn style=" border-radius: 28px !important;height: 34px !important;position: relative;top: 16px;" dark color="primary" to="/login">Login</v-btn>
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
            <v-btn block to="/signup" text>Registration</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block to="/login" text>Login</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <section>
        <v-img class="imgkastem" src="/img/mainbanner.jpg">
        <div class="container" style="margin-top:190px;">
          <v-row>
              <v-col cols="12" xs="6" sm="6">
                <h1>Can you effectively track & manage all innovation innitiatives inside your organization?</h1>
                <div class="garis"></div>
                <div style="margin-top:40px;"></div>
                <p style="text-align: justify !important;">
                  Innov.ID is an innovation management system. By leveraging this solution, 
organization (enterprise, incubators, accelerators, etc) can easily track 
progress and issues of each innovation innitiatives being concurrently 
conducted by different innovator teams, and finally decide the right support for each of them. 
                </p>
                <v-btn to="/signup" large>
                  Registration
                </v-btn>
                
              </v-col>
              <v-col cols="12" xs="6" sm="6">
                
              </v-col>
          </v-row>
        </div>
        </v-img>
      </section>

      <section>
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
                    <v-img style="margin: 0 auto !important;" src="/img/automate.png"></v-img> 
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <!-- <v-card-text class="text-center">
                      <v-icon x-large class="primary--text text--darken-2">mdi-flash</v-icon>
                    </v-card-text> -->
                    <v-card-title style="display: block" primary-title>
                      <div class="headline">Automate some activities, then focus on key issue</div>
                      <div class="garis"></div>
                    </v-card-title>
                    <v-card-text style="text-align:justify;">
                      Innov.ID is an innovation management system. By leveraging this solution, organization (enterprise, incubators, accelerators, etc) can easily track progress and issues of each innovation innitiatives being concurrently 
conducted by different innovator teams, and finally decide the right support for each of them. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
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
                    <!-- <v-card-text class="text-center">
                      <v-icon x-large class="primary--text text--darken-2">mdi-flash</v-icon>
                    </v-card-text> -->
                    <v-card-title style="display: block" primary-title>
                      <div class="headline">Collaborative Innovation Process</div>
                      <div class="garis"></div>
                    </v-card-title>
                    
                    <v-card-text style="text-align:justify;">
                      Managing innovation across organization means doing many tasks repetitively. Sometimes relatively unimportant tasks require more time and resources to accomplish. With Innov.ID, most of repetitive task such as give training on innovation methodology to new innovators and routine monitoring / reporting can be done independently by innovators without needed any direct support from management or mentors. Therefore, management and mentors can focus more on most important issues such as discussing strategy and challenge of most strategic innovation with the innovator. 
                    </v-card-text>
                  </v-card>                 
                </v-flex>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-img style="margin: 0 auto !important;position:relative;top:30px;" max-width="481px" src="/img/colaborate.png"></v-img> 
                  </v-card>        
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id="accent3" style="background: #fff !important;">
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
                    <v-img style="margin: 0 auto !important;" max-width="363px" src="/img/i-organitation.png"></v-img> 
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <!-- <v-card-text class="text-center">
                      <v-icon x-large class="primary--text text--darken-2">mdi-flash</v-icon>
                    </v-card-text> -->
                    <v-card-title style="display: block" primary-title>
                      <div class="headline">Managing Multi Stream Innovation Programs</div>
                      <div class="garis"></div>
                    </v-card-title>
                    <v-card-text style="text-align:justify;">
                      Innovation in different verticals and phases requires different approach, process, methodology, focus and action. Innov.ID enables organization to set different programs -from short event like innovation sprint, medium term program like incubation and acceleration, to long term continues 
improvement innovation program. For each program, organization can set different milestones and objectives, including to macth the requirements of verticals and phase of innovation related to that program.  
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <!-- <section>
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
      </section> -->

      <section style="min-height:400px;" class="backcu mt-12">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12 text-center">
            
            <v-flex class="my-11">
              <div class="text-center">
              <h2 class="mb-1 headline">Contact Us</h2>
              <div style="margin:0 auto;" class="garis mb-5"></div>
              <span class="subheading">
Thank you for visiting our website, if there any questions that will be submitted, press the button below</span>
               
              </div>
              <v-btn class="mt-5 text-center">
                 contact form
               </v-btn>
            </v-flex>
            
          </v-layout>
        </v-container>
      </section>

      <v-footer color="primary darken-2">
        <v-layout row wrap align-center>
          <v-flex class="text-center" xs12>
            <div class="white--text ml-4">@2020, innov.id</div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-main>
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
.toolbarcustom {
  position:absolute;
  z-index:1;
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

</style>
