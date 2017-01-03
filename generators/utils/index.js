var _ = require('lodash');
var p = require('pluralize')

capitalize = (entity) => {
  return entity.charAt(0).toUpperCase() + entity.slice(1);
}

uncapitalize = (entity) => {
  return entity.charAt(0).toLowerCase() + entity.slice(1);
}

pluralize = (entity) => {
  return p.plural(entity);
}

singular = (entity) => {
  return p.singular(entity);
}

module.exports = {
    getEntities: (models, except) => {
      // get the entities (All the keys of the model json) except
      // no entities like relativeURI
      var entities = Object.keys(_.omit(models, except));

      return entities.reduce((transf, entityName) => {
          var p = pluralize(entityName);
          var s = singular(entityName);

          transf.push({
            'entity': models[entityName],

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
