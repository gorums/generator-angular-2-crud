import { Injectable } from '@angular/core';
import { Store } from './index';

@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}

  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }

  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];

    this.store.setState(Object.assign({}, currentState, {[prop]: this.store.getCollection(collection, prop, state)}))
  }

  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: this.store.getFilter(collection, prop, id)}));
  }
}
