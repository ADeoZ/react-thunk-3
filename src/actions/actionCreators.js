import {
  CHANGE_AUTH_FIELDS,
  GET_LOGIN_FAILURE,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  RESET_AUTH,
  GET_NEWS_REQUEST,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  GET_SELECT_NEWS_REQUEST,
  GET_SELECT_NEWS_FAILURE,
  GET_SELECT_NEWS_SUCCESS,
} from "./actionTypes";

export function getLoginRequest() {
  return { type: GET_LOGIN_REQUEST };
}

export function getLoginFailure(error) {
  return { type: GET_LOGIN_FAILURE, payload: { error } };
}

export function getLoginSuccess(token) {
  return { type: GET_LOGIN_SUCCESS, payload: { token } };
}

export function getProfileRequest() {
  return { type: GET_PROFILE_REQUEST };
}

export function getProfileFailure(error) {
  return { type: GET_PROFILE_FAILURE, payload: { error } };
}

export function getProfileSuccess(profile) {
  return { type: GET_PROFILE_SUCCESS, payload: { profile } };
}

export function resetAuth() {
  return { type: RESET_AUTH };
}

export function changeAuthFields(name, value) {
  return { type: CHANGE_AUTH_FIELDS, payload: { name, value } };
}

export const getLogin = () => async (dispatch, getState) => {
  dispatch(getLoginRequest());
  const {
    loginForm: {
      fields: { login, password },
    },
  } = getState();
  try {
    const responseToken = await fetch(process.env.REACT_APP_AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (!responseToken.ok) {
      throw new Error("Auth failed");
    }
    const { token } = await responseToken.json();
    dispatch(getLoginSuccess(token));
  } catch (error) {
    dispatch(getLoginFailure(error.message));
  }
};

export const getProfile = () => async (dispatch, getState) => {
  dispatch(getProfileRequest());
  const { token } = getState().loginForm;
  try {
    const responseProfile = await fetch(`${process.env.REACT_APP_DATA_URL}me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!responseProfile.ok) {
      throw new Error("Profile is not exist");
    }
    const profile = await responseProfile.json();
    dispatch(getProfileSuccess(profile));
  } catch (error) {
    dispatch(getProfileFailure(error.message));
  }
};

export function getNewsRequest() {
  return { type: GET_NEWS_REQUEST };
}

export function getNewsFailure(error) {
  return { type: GET_NEWS_FAILURE, payload: { error } };
}

export function getNewsSuccess(news) {
  return { type: GET_NEWS_SUCCESS, payload: { news } };
}

export function getSelectNewsRequest() {
  return { type: GET_SELECT_NEWS_REQUEST };
}

export function getSelectNewsFailure(error) {
  return { type: GET_SELECT_NEWS_FAILURE, payload: { error } };
}

export function getSelectNewsSuccess(news) {
  return { type: GET_SELECT_NEWS_SUCCESS, payload: { news } };
}

export const getNews = () => async (dispatch, getState) => {
  dispatch(getNewsRequest());
  const { token } = getState().loginForm;
  try {
    const response = await fetch(`${process.env.REACT_APP_DATA_URL}news`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const news = await response.json();
    dispatch(getNewsSuccess(news));
  } catch (error) {
    dispatch(getNewsFailure(error.message));
  }
};

export const getSelectNews = (id) => async (dispatch, getState) => {
  dispatch(getSelectNewsRequest());
  const { token } = getState().loginForm;
  try {
    const response = await fetch(`${process.env.REACT_APP_DATA_URL}news/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const news = await response.json();
    dispatch(getSelectNewsSuccess(news));
  } catch (error) {
    dispatch(getSelectNewsFailure(error.message));
  }
};
