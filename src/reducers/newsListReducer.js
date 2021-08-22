import { GET_NEWS_REQUEST, GET_NEWS_FAILURE, GET_NEWS_SUCCESS, GET_SELECT_NEWS_REQUEST, GET_SELECT_NEWS_FAILURE, GET_SELECT_NEWS_SUCCESS } from "../actions/actionTypes";

const initial_state = {
  news: [],
  selected: null,
  loading: false,
  error: null,
};

export default function newsListReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_NEWS_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case GET_NEWS_SUCCESS:
      const { news } = action.payload;
      return { ...state, loading: false, news };
    case GET_SELECT_NEWS_REQUEST:
      return { ...state, loading: true, error: null, selected: null };
    case GET_SELECT_NEWS_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case GET_SELECT_NEWS_SUCCESS: {
      const { news } = action.payload;
      return { ...state, loading: false, selected: news };
    }
    default:
      return state;
  }
}
