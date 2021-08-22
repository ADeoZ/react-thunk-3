import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginFormReducer from "../reducers/loginFormReducer";
import newsListReducer from "../reducers/newsListReducer";

const reducer = combineReducers({
  loginForm: loginFormReducer,
  newsList: newsListReducer,
});

const saveToLocalStorage = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!token || !profile) return {};
    return { loginForm: { token, profile } };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(reducer, persistedStore, applyMiddleware(thunk));

store.subscribe(() => {
  saveToLocalStorage("token", store.getState().loginForm.token);
  saveToLocalStorage("profile", store.getState().loginForm.profile);
});

export default store;
