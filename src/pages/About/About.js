import React from 'react';

import Section from 'hoc/Section';

import classes from './About.module.css';

/**
 * A component for About's page content with info about the project
 * @category Application
 * @subcategory Pages
 * @component Home
 * @returns {jsx} About page content
 * @see Section
 */

const About = () => {
  return (
    <Section type='ContentCenter'>
      <div className={classes.About}>
        <h1>About Page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          quia consequatur error, voluptas modi a totam aut officiis quas animi!
        </p>
      </div>
    </Section>
  );
};

export default About;
