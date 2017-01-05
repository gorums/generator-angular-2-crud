export { DashboardContainer } from './dashboard';
export { HomeContainer } from './home';

<% entities.forEach(function (entity) { -%>
export { <%= entity.capitalize %>Container } from './<%= entity.uncapitalize %>';
<% }) -%>
