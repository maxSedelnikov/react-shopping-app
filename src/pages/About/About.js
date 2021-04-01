import React from 'react';
import Section from '../../hoc/Section/Section';
import classes from './About.module.css';

const About = () => {
  return (
    <Section type='ContentCenter'>
      <div className={classes.About}>
        <h1>About Page</h1>
      </div>
    </Section>
  );
};

export default About;
