import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CLOSE_ERR
} from "../actions/ActionTypes";
const initialState = {
  orders: [],
  loading: true,
  err: null
};
export default function orders(state = initialState, action) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.data
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        err: action.err
      };
    case CLOSE_ERR: {
      return {
        ...state,
        err: null
      };
    }
    default:
      return state;
  }
}
