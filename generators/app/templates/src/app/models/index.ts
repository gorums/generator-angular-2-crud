<% entities.forEach(function (entity) {%>export { <%= entity.capitalize %>Model } from './<%= entity.name %>';
<% })%>
