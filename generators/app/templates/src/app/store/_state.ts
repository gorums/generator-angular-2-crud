import {
  <% entities.forEach(function (entity) { -%>
  <%= entity.capitalize %>Model,
  <% }) -%>
}  from '../models';

export interface State {
  <% entities.forEach(function (entity) { -%>
  <%= entity.pluralizeUncapitalize %>: Array<<%= entity.capitalize %>Model>
  <% }) -%>
}

export const defaultState = {
  <% entities.forEach(function (entity) { -%>
  <%= entity.pluralizeUncapitalize %>: [],
  <% }) -%>
}
