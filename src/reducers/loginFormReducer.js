import { GET_LOGIN_REQUEST, GET_LOGIN_FAILURE, GET_LOGIN_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, CHANGE_AUTH_FIELDS, RESET_AUTH } from "../actions/actionTypes";

const initial_state = {
  fields: {
    login: "",
    password: "",
  },
  loading: false,
  error: null,
  token: null,
  profile: null,
};

export default function loginFormReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_LOGIN_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case GET_LOGIN_SUCCESS:
      const { token } = action.payload;
      return { ...state, loading: false, token };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PROFILE_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case GET_PROFILE_SUCCESS:
      const { profile } = action.payload;
      return { ...state, loading: false, profile };
    case RESET_AUTH:
      return initial_state;
    case CHANGE_AUTH_FIELDS:
      const { name, value } = action.payload;
      return { ...state, fields: { ...state.fields, [name]: value } };
    default:
      return state;
  }
}