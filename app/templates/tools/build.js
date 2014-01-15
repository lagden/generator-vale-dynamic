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
        "name": "common",
        "include": ["lib.text", "lib.i18n"]
    }, {
        "name": "main",
        "include": ["app/main"],
        "exclude": ["common"]
    }]
}