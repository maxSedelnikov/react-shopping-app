import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from 'store/reducers/rootReducer';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(thunkMiddleware)
    ),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

export default renderWithRedux;
