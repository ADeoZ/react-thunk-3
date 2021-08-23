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

const loadFromLocalStorage = (key) => {
  try {
    const stateStr = localStorage.getItem(key);
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const store = createStore(
  reducer,
  { loginForm: loadFromLocalStorage("loginForm") },
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveToLocalStorage("loginForm", store.getState().loginForm);
});

export default store;
