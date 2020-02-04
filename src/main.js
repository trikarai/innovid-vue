import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSanitize from "vue-sanitize";

//global component
import Notification from "@/components/Notification";
Vue.component('notification', Notification);

Vue.use(require('vue-moment'));

var defaultOptions = {
  allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img'],
  allowedAttributes: {
    'a': ['href', 'target'],
    img: ['src', 'width', 'height'],
    iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'docs.google.com', 'player.vimeo.com', 'www.dailymotion.com']
};
Vue.use(VueSanitize, defaultOptions);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

// var marked = require('marked');
Vue.mixin({
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: "",
    };
  },
  methods: {
    // marked: function (input) {
    //   return marked(input);
    // }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
