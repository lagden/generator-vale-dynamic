requirejs.config({
    waitSeconds: 30,
    baseUrl: 'js',
    config: {
        i18n: {
            locale: window.parent.document.documentElement.lang || 'pt-br'
        }
    },
    paths: {
        app: 'app'
    }
});