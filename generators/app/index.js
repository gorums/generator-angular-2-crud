'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var beautify = require('gulp-beautify');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Angular 2 CRUD') + ' generator!'
    ));

    this.registerTransformStream(beautify({indentSize: 2}));

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
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        version: this.props.version,
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
