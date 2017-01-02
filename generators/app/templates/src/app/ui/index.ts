<% entities.forEach(function (entity) {%>
export { <%= entity.capitalize %> } from './<%= entity.entity %>/<%= entity.entity %>';
export { <%= entity.capitalize %>Create } from './<%= entity.entity %>/<%= entity.entity %>Create';
export { <%= entity.capitalize %>Edit } from './<%= entity.entity %>/<%= entity.entity %>Edit';
export { <%= entity.capitalize %>Delete } from './<%= entity.entity %>/<%= entity.entity %>Delete';
<% })%>
