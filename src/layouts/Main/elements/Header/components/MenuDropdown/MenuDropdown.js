import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@material-ui/core';
import Account from '@assets/icon-v2/Account';
import AccountOn from '@assets/icon-v2/AccountOn';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import Logout from '@assets/icon-v2/Logout';
import Notification from '@assets/icon-v2/NotificationOff';
import StarOff from '@assets/icon-v2/StarOff';
import StarOn from '@assets/icon-v2/StarOn';
import Typography from '@components/Typography';
import useResponsive from '@utils/hooks/useResponsive';
import { logout } from '@__old/utils/common';
import { route } from '@configs';
import { useRouter } from 'next/router';
import useStyles from './styles';
import useActions from './hooks/useActions';

const MenuDropdown = (props) => {
  const router = useRouter();
  const smClient = useResponsive('sm');

  const [open, _setOpen] = useState(null);

  const setOpen = (val) => (event) => {
    if (val) {
      _setOpen(event.currentTarget);
    } else {
      _setOpen(null);
    }
  };

  const { data } = useActions();

  const onClickNotif = () => router.push(route.notificationSetting());
  const onClickAchievment = () => router.push(route.achievement());
  const onClickProfile = () => router.push(route.profile());

  const classes = useStyles({
    rootEvent: open,
    smClient,
  });

  const renderMenu = (
    <Popover
      anchorEl={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{ paper: classes.popover }}
      onClose={setOpen(false)}
      open={!!open}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={classes.menuItem} onClick={onClickAchievment}>
        {data?.popUpStatus ? (
          <StarOff className="icon" />
        ) : (
          <StarOn className="icon" />
        )}
        <Typography children="Achievement" variant="body2" />
      </div>
      <div className={classes.menuItem} onClick={onClickNotif}>
        <Notification className="icon" />
        <Typography children="Notification Settings" variant="body2" />
      </div>
      <div className={classes.menuItem} onClick={onClickProfile}>
        <Account className="icon" />
        <Typography children="User Profile" variant="body2" />
      </div>
      <div className={classes.menuItem} onClick={logout}>
        <Logout className="icon" />
        <Typography children="Logout" variant="body2" />
      </div>
    </Popover>
  );

  let renderControl = (
    <div className={classes.root} onClick={setOpen(true)}>
      {data?.popUpStatus ? (
        <Account className={classes.account} />
      ) : (
        <AccountOn className={classes.account} />
      )}
      <div children={props.name.toLowerCase()} className={classes.label} />
      <ArrowDown className={classes.arrow} />
    </div>
  );

  if (smClient) {
    renderControl = (
      <div className={classes.iconOnly} onClick={setOpen(true)}>
        <Account className="icon" />
      </div>
    );
  }

  return (
    <>
      {renderControl}
      {renderMenu}
    </>
  );
};

MenuDropdown.defaultProps = {
  name: '',
};

MenuDropdown.propTypes = {
  name: PropTypes.string,
};

export default MenuDropdown;
