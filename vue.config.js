module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'npm audit fix',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/shame.scss";`
      }
    }
  }
}
