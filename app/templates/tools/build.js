{
    "optimize": "uglify2",
    "removeCombined": true,
    "generateSourceMaps": false,
    "preserveLicenseComments": false,
    "mainConfigFile": "../dev/Documents/app/js/common.js",
    "appDir": "../dev",
    "dir": "../build",
    "baseUrl": "Documents/app/js/lib",
    "modules": [{
        "name": "../common",
        "include": ["text", "i18n"]
    }, {
        "name": "app/main",
        "exclude": ["../common"]
    }]
}