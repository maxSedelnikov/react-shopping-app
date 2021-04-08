import React from 'react';

import classes from './Footer.module.css';

/**
 * Footer component with contacts
 * @category Application
 * @subcategory Elements
 * @component Footer
 * @returns {jsx} contacts with links
 */

const Footer = () => {
  return (
    <section className={classes.Contacts}>
      <ul className={classes.ContactsList}>
        <li>
          <a
            href='https://github.com/maxSedelnikov'
            target='_blank'
            rel='noreferrer'
          >
            My github
          </a>
        </li>
        <li>
          <a
            href='https://t-do.ru/MaximSedelnikov'
            target='_blank'
            rel='noreferrer'
          >
            My telegram
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Footer;
