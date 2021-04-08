import React from 'react';

import Footer from 'components/Footer';
import NavBar from 'components/NavBar';

import classes from './Layout.module.css';

// layout wrapper for main companents

/**
 * Higher order component used as a wrapper for main components
 * @category Application
 * @subcategory Hoc
 * @component Layout
 * @param {Array} children - passed components
 * @returns {jsx} Styled page structure with navigation, footer and children components passed
 * @see NavBar
 * @see Footer
 */

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <header className={classes.Container}>
        <NavBar />
      </header>
      <main className={classes.Container}>{children}</main>
      <footer className={classes.Container}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
