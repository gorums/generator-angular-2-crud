var _ = require('lodash');
var p = require('pluralize')

capitalize = (entity) => {
  return entity.charAt(0).toUpperCase() + entity.slice(1);
}

pluralize = (entity) => {
  return p.plural(entity);
}

module.exports = {
    getEntitiesName: (models, except) => {
      // get the entities (All the keys of the model json) except
      // no entities like relativeURI
      var entities = Object.keys(_.omit(models, except));

      return entities.reduce((transf, entity) => {
          transf.push({
            'pluralize': pluralize(entity), //this is using on the route
            'capitalize': capitalize(entity)
          });

          return transf;
      }, []);
    }
}
