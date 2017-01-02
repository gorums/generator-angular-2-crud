var _ = require('lodash');
var p = require('pluralize')

capitalize = (entity) => {
  return entity.charAt(0).toUpperCase() + entity.slice(1);
}

pluralize = (entity) => {
  return p.plural(entity);
}

module.exports = {
    getEntities: (models, except) => {
      // get the entities (All the keys of the model json) except
      // no entities like relativeURI
      var entities = Object.keys(_.omit(models, except));

      return entities.reduce((transf, entityName) => {
          transf.push({
            'entity': models[entityName],
            'name': entityName,
            'pluralize': pluralize(entityName),
            'capitalize': capitalize(entityName)
          });

          return transf;
      }, []);
    }
}
