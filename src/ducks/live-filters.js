/* eslint-disable no-param-reassign */
import { createContext } from 'react';
import { idEquals, isGroup } from '../utils/compare';
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
    const { filterGroup, thingToAdd } = payload;
    const hasThatFilterGroupId = idEquals(filterGroup.id);
    const addNewChild = (child) => {
      if (isGroup(child)) {
        if (hasThatFilterGroupId(child)) child.children = child.children.concat(thingToAdd);
        else child.children.forEach(addNewChild);
      }
    };
    [copy].forEach(addNewChild);
    return copy;
  }
  // UPDATE
  // We may not need any more update methods.
  // Toggling the filter group operation might be enough for now.
  if (type === UPDATE) return state;
  // REMOVE
  if (type === REMOVE) {
    const { object } = payload;
    const hasThatId = idEquals(object.id);
    const removeFilterThing = (child, index, array) => {
      if (hasThatId(child)) array.splice(index, 1);
      else if (isGroup(child)) {
        if (hasThatId(child)) array.splice(index, 1);
        else child.children.forEach(removeFilterThing);
      }
    };
    copy.children.forEach(removeFilterThing);
    return copy;
  }
  // TOGGLE
  if (type === TOGGLE_OPERATOR) {
    const { filterGroup } = payload;
    const hasThatFilterGroupId = idEquals(filterGroup.id);
    const toggleFilterGroup = (child) => {
      if (isGroup(child)) {
        if (hasThatFilterGroupId(child)) child.operator = toggle(child);
        else child.children.forEach(toggleFilterGroup);
      }
    };
    [copy].forEach(toggleFilterGroup);
    return copy;
  }
  return state;
};
