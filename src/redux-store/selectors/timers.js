import {createSelector} from 'reselect';

export const getCounters = createSelector(
  state => state.timers.entities,
  counters => counters
);