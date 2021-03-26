import React from 'react';
import classes from './Section.module.css';

const Section = ({ children, type }) => {
  const cls = [classes.Section, classes[type]];

  return <section className={cls.join(' ')}>{children}</section>;
};

export default Section;
