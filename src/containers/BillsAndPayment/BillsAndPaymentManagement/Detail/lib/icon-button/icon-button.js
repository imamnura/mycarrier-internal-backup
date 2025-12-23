import React from 'react';
import useStyles from './styles';

const IconButton = React.forwardRef(({ ...buttonProps }, ref) => {
  const classes = useStyles();

  return (
    <button
      ref={ref}
      className={classes.button}
      type="button"
      {...buttonProps}
    />
  );
});

export default IconButton;
