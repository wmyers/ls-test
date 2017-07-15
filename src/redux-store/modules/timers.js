
export const ADD_COUNTER = 'add_counter';
export const ADD_COUNTER_SUCCESS = 'add_counter_success';
export const ADD_COUNTER_FAIL = 'add_counter_fail';
export const EDIT_COUNTER = 'edit_counter';
export const EDIT_COUNTER_SUCCESS = 'edit_counter_success';
export const EDIT_COUNTER_FAIL= 'edit_counter_fail';
export const DELETE_COUNTER = 'delete_counter';
export const DELETE_COUNTER_SUCCESS = 'delete_counter_success';
export const DELETE_COUNTER_FAIL = 'delete_counter_fail';

const initialState = {
  entities:{},
  log: '',
  totalAdded: 0
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COUNTER:
    case ADD_COUNTER_FAIL:
    case EDIT_COUNTER:
    case EDIT_COUNTER_FAIL:    
    case DELETE_COUNTER:
    case DELETE_COUNTER_FAIL:
      return state;
    case ADD_COUNTER_SUCCESS:
      const id = state.totalAdded.toString();
      return {
        entities: {
          ...state.entities,
          [id]: action.counter
        },
        log: updateLog({type: action.type, id}, state.log),
        totalAdded: state.totalAdded +1
      };
    case EDIT_COUNTER_SUCCESS:
      const {id: editedId, value} = action;
      return {
        entities: {
          ...state.entities,
          [editedId]: {value}
        },
        log: updateLog(action, state.log),
        totalAdded: state.totalAdded
      }; 
    case DELETE_COUNTER_SUCCESS:
      const {[action.id]: foo, ...rest} = state.entities;
      return {
        entities: {
          ...rest
        },
        log: updateLog(action, state.log),
        totalAdded: state.totalAdded
      };
    default:
      return state;
  }
};

export const addCounter = (counter = {value: '0'}) => {
  return {
    types: [ADD_COUNTER, ADD_COUNTER_SUCCESS, ADD_COUNTER_FAIL],
    promise: ({service}) => {
      return service.timers.addCounter({counter});
    },
    counter
  }
}

export const editCounter = ({id, value}) => {
  return {
    types: [EDIT_COUNTER, EDIT_COUNTER_SUCCESS, EDIT_COUNTER_FAIL],
    promise: ({service}) => {
      return service.timers.editCounter({id, value});
    },
    id,
    value
  }
}

export const deleteCounter = ({id}) => {
  return {
    types: [DELETE_COUNTER, DELETE_COUNTER_SUCCESS, DELETE_COUNTER_FAIL],
    promise: ({service}) => {
      return service.timers.deleteCounter({id});
    },
    id
  }
}

export const updateLog = ({type, id}, log = '') => {
  let logEntry;
  switch(type) {
    case ADD_COUNTER_SUCCESS:
      logEntry = `Added a new counter with id: ${id}`;
      break;
    case EDIT_COUNTER_SUCCESS:
      logEntry = `Edited counter with id: ${id}`;
      break;
    case DELETE_COUNTER_SUCCESS:
      logEntry = `Deleted counter with id: ${id}`;
      break;
  }
  return !logEntry ? log : log.concat(`- ${logEntry}\n`)
}
