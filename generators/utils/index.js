var _ = require('lodash');
var p = require('pluralize')

capitalize = (entityName) => {
  return entityName.charAt(0).toUpperCase() + entityName.slice(1);
}

uncapitalize = (entityName) => {
  return entityName.charAt(0).toLowerCase() + entityName.slice(1);
}

pluralize = (entityName) => {
  return p.plural(entityName);
}

singular = (entityName) => {
  return p.singular(entityName);
}

key = (entity) => {
  return Object.keys(entity).filter((field) => entity[field].key);
}

module.exports = {
    getEntities: (models, except) => {
      // get the entities (All the keys of the model json) except
      // no entities like relativeURI
      var entities = Object.keys(_.omit(models, except));

      return entities.reduce((transf, entityName) => {
          var p = pluralize(entityName);
          var s = singular(entityName);
          var k = key(models[entityName]);

          transf.push({
            'entity': models[entityName],
            'key': k,

            'name': entityName,
            'capitalize': capitalize(entityName),
            'uncapitalize': uncapitalize(entityName),

            'singular': s,
            'singularUncapitalize': uncapitalize(s),
            'singularCapitalize': capitalize(s),

            'pluralize': p,
            'pluralizeUncapitalize': uncapitalize(p),
            'pluralizeCapitalize': capitalize(p)
          });

          return transf;
      }, []);
    },
    getRelations: (entity, entities) => {
      var referent;
      Object.keys(entity.entity).forEach((field) => {
        if (entity.entity[field].referent) {
          referent = entity.entity[field].referent;
        }
      });

      return referent && entities.filter((e) => e.name === referent);
    }
}
