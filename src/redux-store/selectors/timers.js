import {createSelector} from 'reselect';

export const getCounters = createSelector(
  state => state.timers.entities,
  counters => counters
);

export const getCountersLog = createSelector(
  state => state.timers.log,
  countersLog => countersLog
);