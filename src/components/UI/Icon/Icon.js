import React from 'react';
import classes from './Icon.module.css';

// component for using images as an icon

const Icon = ({ src, alt, title, width }) => {
  return (
    <img
      className={classes.Icon}
      loading='lazy'
      src={src}
      alt={alt}
      width={width}
      title={title}
    />
  );
};

export default Icon;
