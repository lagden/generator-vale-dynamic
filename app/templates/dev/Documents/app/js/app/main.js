define(function(require) {

    var devDebug = (typeof window.devDebug  !== 'undefined') ? window.devDebug : false;
    var prefixo = (devDebug) ? 'http://www.vale.com' : '';
    var dados = require('i18n!./nls/dados');

    console.log(dados);

});