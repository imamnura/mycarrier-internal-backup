import React from 'react';
import PropTypes from 'prop-types';
import { image } from '@configs';
import MenuDropdown from './components/MenuDropdown/MenuDropdown';
import HelpMenuDropdown from './components/HelpMenuDropdown/HelpMenuDropdown';
import useHeaderStyles from './Header.styles';
import useResponsive from '@utils/hooks/useResponsive';
import { getUserData } from '@utils/common';
import Menu from '@assets/icon-v2/Menu';

const Header = ({ setExpand }) => {
  const { fullName } = getUserData();

  const smClient = useResponsive('sm');
  const classes = useHeaderStyles({ smClient });

  return (
    <div className={classes.root}>
      {smClient && (
        <button className={classes.clickableIcon}>
          <Menu onClick={setExpand} />
        </button>
      )}
      <img alt="logo" className={classes.logo} src={image.logo} />
      <div className={classes.middle} />
      <HelpMenuDropdown name={fullName} />
      <MenuDropdown name={fullName} />
    </div>
  );
};

Header.propTypes = {
  setExpand: PropTypes.func.isRequired,
};

export default Header;
