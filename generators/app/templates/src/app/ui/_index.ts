<% entities.forEach(function (entity) {%>
export { <%= entity.capitalize %> } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>';
export { <%= entity.capitalize %>Create } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Create';
export { <%= entity.capitalize %>Edit } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Edit';
export { <%= entity.capitalize %>Delete } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Delete';
<% })%>
