module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pwa: {
    name: 'innov.id',
    themeColor: '#14DA51',
    manifestOptions: {
      background_color: '#2D693C'
    },
    msTileColor: '#121212',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
