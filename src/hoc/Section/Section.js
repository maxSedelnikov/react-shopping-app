import React from 'react';
import classes from './Section.module.css';

/**
 * Higher order component which covers passed components into a html section with border
 * @category Application
 * @subcategory Hoc
 * @component Section
 * @function Section
 * @param {array} children - passed components
 * @param {string} type - extra class
 * @returns {jsx} Styled section with components
 */

const Section = ({ children, type }) => {
  const cls = [classes.Section, classes[type]];

  return <section className={cls.join(' ')}>{children}</section>;
};

export default Section;
