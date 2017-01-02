<% entities.forEach(function (entity) {%>
export { <%= entity.capitalize %> } from './<%= entity.name %>/<%= entity.name %>';
export { <%= entity.capitalize %>Create } from './<%= entity.name %>/<%= entity.name %>Create';
export { <%= entity.capitalize %>Edit } from './<%= entity.name %>/<%= entity.name %>Edit';
export { <%= entity.capitalize %>Delete } from './<%= entity.name %>/<%= entity.name %>Delete';
<% })%>
