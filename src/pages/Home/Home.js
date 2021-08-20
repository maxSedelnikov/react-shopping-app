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
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, eum.
        </p>
      </div>
    </Section>
  );
};

export default Home;
