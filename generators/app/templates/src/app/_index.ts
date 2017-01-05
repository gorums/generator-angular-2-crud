import * as services from './services';
import * as c from './containers';
import * as u from './ui';

import { ApiService } from './api';
import { Store } from './store';
import { StoreHelper } from './store/helper'; 
export { App } from './app';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export { routes } from './routes';
export const providers = [
  ApiService,
  Store,
  StoreHelper,
  ...mapValuesToArray(services)
];

export const containers = mapValuesToArray(c);
export const ui = mapValuesToArray(u);
