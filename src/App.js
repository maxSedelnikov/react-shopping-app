import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { generateUniqId } from './helpers/functions';
import Layout from './hoc/Layout/Layout';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';

const { REACT_APP_USER_STORAGE_KEY } = process.env;

function App() {
  useEffect(() => {
    // setting up uniq user id

    if (!window.localStorage.getItem(REACT_APP_USER_STORAGE_KEY)) {
      const userId = generateUniqId();

      window.localStorage.setItem(REACT_APP_USER_STORAGE_KEY, userId);
    }
  }, []);

  // defining app routes

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
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
