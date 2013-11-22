'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ValeDynamicGenerator = module.exports = function ValeDynamicGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    var cowsay = this.readFileAsString(path.join(__dirname, '../COW.txt'));
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.on('end', function() {
        var installProjectDependencies = !this.installProjectDependencies;
        this.installDependencies({
            skipInstall: installProjectDependencies,
            skipMessage: true,
            callback: function() {
                console.log(cowsay);
            }
        });
    });
};

util.inherits(ValeDynamicGenerator, yeoman.generators.Base);

ValeDynamicGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'projectName',
        message: 'Qual o nome do projeto?',
        default: "Projeto"
    }, {
        name: 'projectDescription',
        message: 'Qual a descrição do projeto?',
        default: "Página dinâmica - Vale.com"
    }, {
        name: 'projectAuthor',
        message: 'Qual o nome do desenvolvedor do projeto?',
        default: "Thiago Lagden"
    }, {
        name: 'projectPath',
        message: 'Qual é o caminho no Sharepoint onde ficará o projeto?',
        default: "/SiteCollectionDocuments"
    }, {
        name: 'projectLocalServerPort',
        message: 'Qual é será a porta utilizada pelo servidor local?',
        default: 9000
    }, {
        name: 'useJquery',
        type: 'confirm',
        message: 'Deseja usar jQuery?',
        default: true
    }, {
        when: function(response) {
            return response.useJquery
        },
        name: 'jqueryVersion',
        type: 'list',
        message: 'Escolha a versão que deseja usar jQuery?',
        choices: ["1.7.2", "1.8.2", "1.10.2"]
    }, {
        name: 'useHandlebars',
        type: 'confirm',
        message: 'Deseja usar Handlebars?',
        default: true
    }, {
        name: 'addHtml5shiv',
        type: 'confirm',
        message: 'Deseja adicionar o html5shiv?',
        default: false
    }, {
        name: 'useBower',
        type: 'confirm',
        message: 'Deseja também usar Bower?',
        default: false
    }, {
        name: 'installProjectDependencies',
        type: 'confirm',
        message: 'Instalar os pacotes automaticamente?',
        default: true
    }];

    this.prompt(prompts, function(props) {
        this.projectName = props.projectName;
        this.projectDescription = props.projectDescription;
        this.projectAuthor = props.projectAuthor;
        this.projectPath = props.projectPath;
        this.projectLocalServerPort = props.projectLocalServerPort;
        this.useJquery = props.useJquery;
        this.jqueryVersion = props.jqueryVersion;
        this.useHandlebars = props.useHandlebars;
        this.addHtml5shiv = props.addHtml5shiv;
        this.useBower = props.useBower;
        this.installProjectDependencies = props.installProjectDependencies;
        cb();
    }.bind(this));
};

ValeDynamicGenerator.prototype.app = function app() {
    // App Dev
    this.directory('dev');

    // Jade Templates
    this.directory('jade');

    // Bower
    if (this.useBower) {
        this.template('_bower.json', 'bower.json');
        this.copy('bowerrc', '.bowerrc');
    }

    // SASS
    this.copy('config.rb', 'config.rb');
    this.directory('sass','sass');

    // Tools - r.js
    this.directory('tools');

    // Others
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('README.md', 'README.md');
    this.template('_Gruntfile.js', 'Gruntfile.js');
};

ValeDynamicGenerator.prototype.writePackage = function writePackage() {
    var _packageFile = path.join(__dirname, './templates/_package.json');
    var _package = JSON.parse(this.readFileAsString(_packageFile));
    _package.name = this.projectName;
    _package.description = this.projectDescription;
    _package.author.name = this.projectAuthor;
    if (this.useJquery) _package.volo.dependencies["jquery"] = "http://ajax.googleapis.com/ajax/libs/jquery/" + this.jqueryVersion + "/jquery.js";
    if (this.useHandlebars) _package.volo.dependencies["handlebars"] = "http://rawgithub.com/wycats/handlebars.js/1.0.0/dist/handlebars.js";
    if (this.addHtml5shiv) _package.volo.dependencies["html5shiv"] = "http://rawgithub.com/aFarkas/html5shiv/master/dist/html5shiv.js";
    this.write('package.json', JSON.stringify(_package));
};