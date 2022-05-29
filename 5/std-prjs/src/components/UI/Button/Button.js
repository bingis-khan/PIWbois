import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}

      name={props.name ?? ''}
      value={props.value ?? ''}
    >
      {props.children}
    </button>
  );
};

export default Button;
