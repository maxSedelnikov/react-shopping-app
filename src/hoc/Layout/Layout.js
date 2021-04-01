import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import classes from './Layout.module.css';

// layout wrapper for main companents

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
