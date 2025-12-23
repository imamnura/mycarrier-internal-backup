import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const Component = (props) => {
  const { children, classes, className, to } = props;
  const router = useRouter();

  const onClick = () => router.push(to);

  return (
    <span className={clsx(classes.link, className)} onClick={onClick}>
      {children}
    </span>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  to: PropTypes.string,
};

Component.defaultProps = {
  children: null,
  classes: {},
  className: '',
  to: '',
};

export default Component;
