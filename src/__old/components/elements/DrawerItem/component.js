import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Text from '../Text';
import Link from '../Link';
import NavIcon from '../NavIcon';

const Component = (props) => {
  const { classes, collapse, active, label, path, icon } = props;

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (collapse) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 100);
    }
  }, [collapse]);

  const labelProps = {
    color: active ? 'primary' : 'default',
    variant: active ? 'subtitle1Bold' : 'subtitle1',
  };

  const rootStyles = !collapse
    ? {
        className: clsx(classes.root, {
          [classes.active]: active,
        }),
      }
    : {};

  return (
    <Link to={path}>
      <div {...rootStyles}>
        <div
          className={clsx(classes.icon, {
            [classes.iconActive]: active,
          })}
        >
          <NavIcon active={active} type={icon} />
        </div>
        {!show && (
          <div className={classes.label}>
            <Text {...labelProps}>{label}</Text>
          </div>
        )}
      </div>
    </Link>
  );
};

Component.defaultProps = {
  active: false,
  icon: '',
  path: '/',
};

Component.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  collapse: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default Component;
