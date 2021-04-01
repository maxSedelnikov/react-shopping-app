import actionTypes from '../actions/actionTypes';

const {
  GET_CART_ITEMS,
  SET_EMPTY_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_PRODUCT_IN_CART,
  CLEAR_CART,
  UPDATE_CART_INFO,
  START_LOADING,
  STOP_LOADING,
} = actionTypes;

const initialState = {
  items: [],
  isEmptyCartSet: false,
  numberOfItems: 0,
  totalSum: 0,
  loading: false,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        items: [...payload],
      };
    }

    case SET_EMPTY_CART: {
      return {
        ...state,
        isEmptyCartSet: true,
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        items: [payload, ...state.items],
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    }

    case UPDATE_PRODUCT_IN_CART: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        items: [],
        isEmptyCartSet: true,
      };
    }

    case UPDATE_CART_INFO: {
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        totalSum: payload.totalSum,
      };
    }

    case START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
