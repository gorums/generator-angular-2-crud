'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var utils = require('../utils');

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
      name: 'baseurl',
      message: 'Server API URL',
      default: 'http://localhost:3500'
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
  },

  writing: function () {
    console.log('after calling readFile');

    //try {
      var models = JSON.parse(fs.readFileSync(this.props.dataModel, 'utf8'));

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
          dataModel: this.props.dataModel,
          models: JSON.stringify(models, null, 2)
        }
      );

      // *

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

      //src/*

      this.fs.copy(
        this.templatePath('src/global.css'),
        this.destinationPath('src/global.css')
      );

      this.fs.copy(
        this.templatePath('src/polyfills.ts'),
        this.destinationPath('src/polyfills.ts')
      );

      this.fs.copy(
        this.templatePath('src/vendor.ts'),
        this.destinationPath('src/vendor.ts')
      );

      this.fs.copy(
        this.templatePath('src/main.ts'),
        this.destinationPath('src/main.ts')
      );

      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath('src/index.html'),
        {
          name: this.props.name
        }
      );

      //src/app/*

      this.fs.copy(
        this.templatePath('src/app/api.ts'),
        this.destinationPath('src/app/api.ts')
      );

      this.fs.copy(
        this.templatePath('src/app/app.ts'),
        this.destinationPath('src/app/app.ts')
      );

      this.fs.copy(
        this.templatePath('src/app/index.ts'),
        this.destinationPath('src/app/index.ts')
      );

      this.fs.copyTpl(
        this.templatePath('src/app/config.ts'),
        this.destinationPath('src/app/config.ts'),
        {
          baseurl: this.props.baseurl
        }
      );

      var entities = utils.getEntities(models, ['relativeURI']);

      this.fs.copyTpl(
        this.templatePath('src/app/routes.ts'),
        this.destinationPath('src/app/routes.ts'),
        {
          entities: entities
        }
      );

      //src/app/store/*

      this.fs.copy(
        this.templatePath('src/app/store/helper.ts'),
        this.destinationPath('src/app/store/helper.ts')
      );

      this.fs.copy(
        this.templatePath('src/app/store/index.ts'),
        this.destinationPath('src/app/store/index.ts')
      );

    this.fs.copy(
      this.templatePath('src/app/containers/home.ts'),
      this.destinationPath('src/app/containers/home.ts')
    );

      this.fs.copyTpl(
        this.templatePath('src/app/store/state.ts'),
        this.destinationPath('src/app/store/state.ts'),
        {
          entities: entities
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/containers/dashboard.ts'),
        this.destinationPath('src/app/containers/dashboard.ts'),
        {
          entities: entities
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/containers/index.ts'),
        this.destinationPath('src/app/containers/index.ts'),
        {
          entities: entities
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/models/index.ts'),
        this.destinationPath('src/app/models/index.ts'),
        {
          entities: entities
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/services/index.ts'),
        this.destinationPath('src/app/services/index.ts'),
        {
          entities: entities
        }
      );

    this.fs.copyTpl(
      this.templatePath('src/app/ui/index.ts'),
      this.destinationPath('src/app/ui/index.ts'),
      {
        entities: entities
      }
    );

    entities.forEach((entity) => {
      this.fs.copyTpl(
        this.templatePath('src/app/models/entity.ts'),
        this.destinationPath('src/app/models/' + entity.name + '.ts'),
        {
          entity: entity
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/services/entity.ts'),
        this.destinationPath('src/app/services/' + entity.name + '.ts'),
        {
          entity: entity,
          relativeURI: models.relativeURI || ''
        }
      );

      var relations = utils.getRelations(entity, entities);
      console.log(relations);

      this.fs.copyTpl(
        this.templatePath('src/app/containers/entity.ts'),
        this.destinationPath('src/app/containers/' + entity.name + '.ts'),
        {
          entity: entity,
          relations: relations
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/ui/entity.ts'),
        this.destinationPath('src/app/ui/' + entity.name + '/' + entity.name +'.ts'),
        {
          entity: entity,
          relations: relations
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/ui/entityCreate.ts'),
        this.destinationPath('src/app/ui/' + entity.name + '/' + entity.name +'Create.ts'),
        {
          entity: entity,
          relations: relations
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/ui/entityDelete.ts'),
        this.destinationPath('src/app/ui/' + entity.name + '/' + entity.name +'Delete.ts'),
        {
          entity: entity,
          relations: relations
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/app/ui/entityEdit.ts'),
        this.destinationPath('src/app/ui/' + entity.name + '/' + entity.name +'Edit.ts'),
        {
          entity: entity,
          relations: relations
        }
      );
    })
    /*}
    catch (errr)
    {
      console.log('Error: ' + errr);
    }*/
  },

  install: function () {
    this.installDependencies();
  }
});
