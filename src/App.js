import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Alert from 'components/Alert';
import { generateUniqId } from 'helpers/functions';
import { userIdStorageKey } from 'helpers/variables';
import Layout from 'hoc/Layout';
import About from 'pages/About';
import Cart from 'pages/Cart';
import Home from 'pages/Home';

/**
 * A container for the whole app
 * @category Application
 * @subcategory Entry
 * @component App
 * @returns {jsx} The app's layout with routes
 * @see Layout
 * @see Alert
 */

const App = () => {
  /**
   * Using react hook useEffect to check if the user has a uniq id and set it if not before rendering the app
   * @memberof App
   * @function useEffect
   * @inner
   * @see generateUniqId
   */

  useEffect(() => {
    if (!window.localStorage.getItem(userIdStorageKey)) {
      const userId = generateUniqId();

      window.localStorage.setItem(userIdStorageKey, userId);
    }
  }, []);

  /**
   * Availible routes in the app
   * @inner routes
   * @see About
   * @see Cart
   * @see Home
   */

  const routes = (
    <Switch>
      <Route path='/about' component={About} />
      <Route path='/cart' component={Cart} />
      <Route path='/' exact component={Home} />
      <Redirect to={'/'} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Alert />
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
};

export default App;
