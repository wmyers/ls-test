export default function serviceMiddleware(service) {
  return ({getState, dispatch}) => {
    return next => action => {
      const state = getState();

      if (typeof action === 'function') {
        return action({
          service,
          getState,
          dispatch
        });
      }

      const {promise, types, ...rest} = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;

      // dispatch the initial REQUEST action
      next({...rest, type: REQUEST});

      return promise({
        service,
        state,
        dispatch
      }).then(
        (result) => {
          return next({...rest, result, type: SUCCESS});
        },
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error) => {
        console.error('SERVICE MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
