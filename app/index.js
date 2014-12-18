'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string')

var defaultBaseName = path.basename(process.cwd());
if(defaultBaseName.indexOf('kurea-contrib') == 0)
  defaultBaseName = defaultBaseName.substr(13);

module.exports = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.option("coffee", {
      desc: "Generate a project for CoffeeScript",
      type: "boolean",
      default: false
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.useCoffee = !!this.options['coffee'];


    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine' + chalk.red('Kurea') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author?',
        default: "Abraham Lincoln"
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your Github username?',
        default: "abelincloln"
      },
      {
        type: 'input',
        name: 'baseName',
        message: 'What is the base name of your module (kurea-contrib-?)?',
        default: defaultBaseName
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe what your module does.',
        default: "A module for Kurea."
      }
    ];

    if(!this.useCoffee)
      prompts.push({
        type: 'confirm',
        name: 'useCoffee',
        message: "Would you like to use CoffeeScript?",
        default: true
      });

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      for(var key in props){
        this[key] = props[key];
      }
      this.commandName = _.str.dasherize(this.baseName);
      if(this.commandName[0] == '-')
        this.commandName = this.commandName.substr(1);
      this.className = _.str.classify(this.commandName);
      this.packageName = 'kurea-contrib-' + this.commandName;

      this.pathPrefix = 'kurea-contrib-'+this.commandName+'/'
      if(defaultBaseName == this.baseName && fs.readdirSync('.').length == 0)
        this.pathPrefix = './'

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', this.pathPrefix+'package.json');
      this.template('_README.md', this.pathPrefix+'README.md');
      this.src.copy('.gitignore', this.pathPrefix+'.gitignore')
      this.src.copy('.npmignore', this.pathPrefix+'.npmignore')
      if(this.useCoffee)
        this.template('_index.coffee', this.pathPrefix+'index.coffee');
      else
        this.template('_index.js', this.pathPrefix+'index.js');
    },

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
