'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Angular 2 CRUD') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    },
    {
      type: 'input',
      name: 'description',
      message: 'Your project description',
    },
    {
      type: 'input',
      name: 'version',
      message: 'Your project version',
      default: '0.1.0'
    },
    {
      type: 'input',
      name: 'models',
      message: 'Your models.json relative path',
      default: 'models.json'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    console.log('after calling readFile');

    try {
      var models = JSON.parse(fs.readFileSync(this.props.models, 'utf8'));

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name,
          description: this.props.description,
          version: this.props.version,
        }
      );

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          name: this.props.name,
          description: this.props.description,
          version: this.props.version,
          modelsName: this.props.models,
          models: JSON.stringify(models, null, 2)
        }
      );

      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );

      this.fs.copy(
        this.templatePath('tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );

      this.fs.copy(
        this.templatePath('tslint.json'),
        this.destinationPath('tslint.json')
      );

      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );

      this.fs.copy(
        this.templatePath('src/**/*'),
        this.destinationPath('src')
      );
    }
    catch (errr)
    {
      console.log('Error: ' + errr);

    }
  },

  install: function () {
    this.installDependencies();
  }
});
