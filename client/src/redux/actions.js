export const toggle = () => {
  return {
    type: "TOGGLE"
  };
};

export const fetchDataStart = () => {
  return {
    type: "FETCH_DATA_START"
  };
};

export const fetchDataSuccess = data => {
  return {
    type: "FETCH_DATA_SUCCESS",
    payload: data
  };
};

export const fetchDataFailure = err => {
  return {
    type: "FETCH_DATA_FAILURE",
    payload: err
  };
};
