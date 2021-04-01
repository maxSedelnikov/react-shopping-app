import React from 'react';
import classes from './Footer.module.css';

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
            target='_blanl'
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
