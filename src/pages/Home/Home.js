import React from 'react';

import Section from 'hoc/Section';

import classes from './Home.module.css';

/**
 * A component for Home's page content
 * @category Application
 * @subcategory Pages
 * @component Home
 * @returns {jsx} Home page content
 * @see Section
 */

const Home = () => {
  return (
    <Section type='ContentCenter'>
      <div className={classes.Home}>
        <h1>Home Page</h1>
      </div>
    </Section>
  );
};

export default Home;
