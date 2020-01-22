const INITIAL_STATE = {
  toggle: false,
  isFetching: false,
  data: null,
  errorMessage: undefined
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        toggle: !state.toggle
      };
    case "FETCH_DATA_START":
      return {
        ...state,
        isFetching: true
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
