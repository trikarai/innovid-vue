<template>
  <v-footer class="subtitle-1" color="#f1f1f1" height="auto" app>
    <div class="grey--text subtitle-2 ml-auto">
      &copy;2020,
      <strong>innov.id</strong> | {{appVersion}}
    </div>
  </v-footer>
</template>
<script>
import { version } from "../../package.json";
export default {
  data() {
    return {
      appVersion: "",
    };
  },
  created() {
    this.appVersion = version;
  },
};
</script>
