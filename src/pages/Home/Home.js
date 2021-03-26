import React from 'react';
import Section from '../../hoc/Section/Section';
import classes from './Home.module.css';

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
