/* eslint-disable no-param-reassign */
import { createContext } from 'react';
import { hasChildren, idEquals, isGroup } from '../utils/compare';
import { initialLiveFilters } from '../data';

// Context
export const LiveFilterContext = createContext(initialLiveFilters);

// Constants
const ADD = 'demo/live-filters/ADD';
const UPDATE = 'demo/live-filters/UPDATE';
const REMOVE = 'demo/live-filters/REMOVE';
const TOGGLE_OPERATOR = 'demo/live-filters/TOGGLE_OPERATOR';

// Action Creators
export const add = payload => ({ type: ADD, payload });
export const update = payload => ({ type: UPDATE, payload });
export const remove = payload => ({ type: REMOVE, payload });
export const toggleOperator = payload => ({ type: TOGGLE_OPERATOR, payload });

// Utils
const getCopy = obj => Object.assign({}, obj);
const toggle = ({ operator }) => (operator === 'AND' ? 'OR' : 'AND');

// Reducer
export default (state = {}, action = {}) => {
  const { type, payload } = action;
  const copy = getCopy(state);
  // ADD
  if (type === ADD) {
    const addNewChild = ({ id, thingToAdd }) => (obj) => {
      if (idEquals(id)(obj)) obj.children = obj.children.concat(thingToAdd);
      else if (hasChildren(obj)) obj.children.forEach(addNewChild({ id, thingToAdd }));
    };
    const { filterGroup, thingToAdd } = payload;
    [copy].forEach(addNewChild({ id: filterGroup.id, thingToAdd }));
    return copy;
  }
  // UPDATE
  // We may not need any more update methods.
  // Toggling the filter group operation may be enough for now.
  if (type === UPDATE) return state;
  // REMOVE
  if (type === REMOVE) {
    const removeFilterThing = id => (item, index, array) => {
      const hasThatId = idEquals(id);
      if (hasChildren(item)) {
        if (hasThatId(item)) array.splice(index, 1);
        else item.children.forEach(removeFilterThing(id));
      } else if (hasThatId(item)) array.splice(index, 1);
    };
    const { object } = payload;
    copy.children.forEach(removeFilterThing(object.id));
    return copy;
  }
  // TOGGLE
  if (type === TOGGLE_OPERATOR) {
    const { object } = payload;
    const toggleFilterGroup = (child) => {
      if (isGroup(child)) {
        const hasThatId = idEquals(object.id);
        if (hasThatId(child)) child.operator = toggle(child);
        else if (child.children.length > 0) child.children.forEach(toggleFilterGroup);
      }
    };
    [copy].forEach(toggleFilterGroup);
    return copy;
  }
  return state;
};
