{
    "optimize": "uglify2",
    "removeCombined": true,
    "generateSourceMaps": false,
    "preserveLicenseComments": false,
    "optimizeCss": "none",
    "mainConfigFile": "../dev/Documents/app/js/common.js",
    "appDir": "../dev",
    "dir": "../build",
    "baseUrl": "Documents/app/js/lib",
    "modules": [{
        "name": "../common",
        "include": ["text", "i18n"]
    }, {
        "name": "../main",
        "include": ["app/main"],
        "exclude": ["../common"]
    }]
}