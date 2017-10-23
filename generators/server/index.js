'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils');
var path = require('path');
var fs = require('fs');

module.exports = class extends Generator{
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the server ' + chalk.red('generator-angular-2-crud') + ' generator mock!'
    ));

    var prompts = [
    {
      type: 'input',
      name: 'amount',
      message: 'Amount of mock data',
      default: '5'
    },
    {
      type: 'input',
      name: 'port',
      message: 'Server Port',
      default: '3500'
    },
    {
      type: 'input',
      name: 'dataModel',
      message: 'Your dataModel relative path',
      default: 'dataModel.json'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));    
  }

  writing () {
    try {
      var models = JSON.parse(fs.readFileSync(this.props.dataModel, 'utf8'));

      var entities = utils.getEntities(models, ['relativeURI']);
      entities = utils.addRelations(entities);

      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('server/package.json')
      );

      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath('server/server.js'), {
          entities: entities,
          port: this.props.port,
          amount: this.props.amount
        }
      );
    } catch (errr) {
      console.log('Error: ' + errr);
    }    
  }

  install () {
    var npmdir = process.cwd() + '/server';
    process.chdir(npmdir);
    this.installDependencies();
  }
}
