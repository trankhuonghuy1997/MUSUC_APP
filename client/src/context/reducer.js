const SET_USER = "SET_USER";

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
