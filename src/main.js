import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSanitize from "vue-sanitize";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCy5X7jqhpBkDU58D5ZHhC4lN7Rp1Uw8r8",
  authDomain: "start-mikti-2020.firebaseapp.com",
  databaseURL: "https://start-mikti-2020.firebaseio.com",
  projectId: "start-mikti-2020",
  storageBucket: "start-mikti-2020.appspot.com",
  messagingSenderId: "157635197855",
  appId: "1:157635197855:web:a64218f2013e3566805baa",
  measurementId: "G-60PCJWDN9Q",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// firebase alias
Vue.prototype.$analytics = firebase.analytics();

// Mix Panel
import mixpanel from "mixpanel-browser";
// var mixpanel = require("mixpanel-browser");
mixpanel.init("6467c859ee7e17ea5e1c96e0d86125e0");
Vue.prototype.$mixpanel = mixpanel;

//global component
import Notification from "@/components/Notification";
Vue.component("notification", Notification);

// //scroll
// import vuescroll from "vue-scroll";
// Vue.use(vuescroll);

Vue.use(require("vue-moment"));

var defaultOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "p",
    "a",
    "ul",
    "ol",
    "nl",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "code",
    "hr",
    "br",
    "div",
    "table",
    "thead",
    "caption",
    "tbody",
    "tr",
    "th",
    "td",
    "iframe",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "target"],
    img: ["src", "width", "height"],
    iframe: ["src", "width", "height", "allowfullscreen", "frameborder"],
  },
  allowedIframeHostnames: [
    "www.youtube.com",
    "docs.google.com",
    "drive.google.com",
    "www.dailymotion.com",
    "www.slideshare.net",
    "cdnapisec.kaltura.com",
  ],
};
Vue.use(VueSanitize, defaultOptions);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

var marked = require("marked");
Vue.mixin({
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false,
      },
      err_msg: "",
    };
  },
  methods: {
    marked: function(input) {
      return marked(input);
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
