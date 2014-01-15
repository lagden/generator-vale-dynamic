define(function(require) {

    'use strict';

    // Vars
    var devDebug = 'undefined' !== typeof window.devDebug ? window.devDebug : !1,
        pathFinal = 'undefined' !== typeof window.pathFinal ? window.pathFinal : '/',
        prefixo = devDebug ? 'http://www.vale.com/' : '/';

    // Carrega css
    loadCss(pathFinal + "main.css");

    // Exemplo
    var dados = require('lib.i18n!./nls/dados');

    console.log(dados);

});