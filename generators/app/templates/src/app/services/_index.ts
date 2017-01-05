<% entities.forEach(function (entity) { -%>
export { <%= entity.capitalize %>Service } from './<%= entity.uncapitalize %>';
<% }) -%>
