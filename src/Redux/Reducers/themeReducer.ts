import { SET_THEME } from "../Actions/themeActions";

const initialState = {
  theme: "light",
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
