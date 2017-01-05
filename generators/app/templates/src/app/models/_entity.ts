export interface <%= entity.capitalize %>Model {
<% Object.keys(entity.entity).forEach(function(field) { -%>
  <%= field -%>
<% if(!entity.entity[field].key && !entity.entity[field].require) { -%>
  <%= "?" -%>
<% } -%>
 <%= ":" -%>
 <%= entity.entity[field].type ||
    (entity.entity[field].key && "string") ||
    (entity.entity[field].referent && "string") || entity.entity[field] -%>;
<% }) -%>
}
