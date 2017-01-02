export interface <%= entity.capitalize %>Model {
  <% Object.keys(entity.entity).forEach(function(field) {%>
    <%= field %><% if(!entity.entity[field].require) {%>?<%}%>: <%= entity.entity[field].type || entity.entity[field] %>;
  <% })%>
}
