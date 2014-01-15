{
    "optimize": "uglify2",
    "removeCombined": true,
    "generateSourceMaps": false,
    "preserveLicenseComments": false,
    "optimizeCss": "none",
    "mainConfigFile": "../dev/Documents/app/js/common.js",
    "appDir": "../dev",
    "dir": "../build",
    "baseUrl": "Documents/app/js",
    "modules": [{
        "name": "config"
    }, {
        "name": "common",
        "include": ["lib.text", "lib.i18n"],
        "exclude": ["config"]
    }, {
        "name": "main",
        "include": ["app/main", "app/nls/dados", "app/nls/root/dados", "app/nls/es-es/dados", "app/nls/pt-br/dados"],
        "exclude": ["config", "common"]
    }]
}