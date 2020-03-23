export const checkDomainMixins = {
  data() {
    return {
      mainDomain: "",
      isMain: false
    };
  },
  created() {
    var s = location.hostname;
    this.getDomain(s);
  },
  mounted() {
    this.checkMainDomain();
  },
  methods: {
    checkMainDomain() {
      if (this.mainDomain == "innov") {
        this.isMain = true;
      } else {
        this.isMain = false;
      }
    },
    getDomain(s) {
      //s = start.mikti.id
      s = s.replace(/^www\./, "");
      var parts = s.split(".");
      // ['start',''mikti, 'id']
      // eslint-disable-next-line no-console
      console.log("Domain parts", parts);
      if (parts.length >= 3) {
        this.mainDomain = parts[1];
        this.params.incubatorIdentifier = parts[1];
        this.isMain = false;
      } else {
        this.mainDomain = parts[0];
        this.isMain = true;
      }
      //   return parts.join(".");
      //   this.mainDomain = parts.join(".");
    }
  }
};
