import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

/**
 * Navigation component
 * @category Application
 * @subcategory Elements
 * @component NavBar
 * @returns {jsx} page navigation
 */

const NavBar = () => {
  return (
    <nav className={classes.NavBar}>
      <ul>
        <li>
          <NavLink
            to='/'
            exact
            className={classes.NavLink}
            activeClassName={classes.active}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            className={classes.NavLink}
            activeClassName={classes.active}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/cart'
            className={classes.NavLink}
            activeClassName={classes.active}
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
