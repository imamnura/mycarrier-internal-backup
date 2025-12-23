import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Divider } from '@material-ui/core';
import Help from '@assets/icon-v2/Help';
import Phone from '@assets/icon-v2/Phone';
import BookUserGuide from '@assets/icon-v2/BookUserGuide';
import Typography from '@components/Typography';
import useResponsive from '@utils/hooks/useResponsive';
import useStyles from './styles';
import { talkToHelpdesk } from '@utils/common';
import useActions from './hooks/useAction';
import { dateDiff } from '@utils/parser';

const HelpMenuDropdown = (props) => {
  const { data, open, setOpen, onClickUserGuide } = useActions(props);

  const smClient = useResponsive('sm');

  const classes = useStyles({
    rootEvent: open,
    smClient,
  });

  const { version, releaseDate } = data || {
    version: '5.0.0',
    releaseDate: '',
  };

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
      <div className={classes.menuItem} onClick={onClickUserGuide}>
        <BookUserGuide className="icon" />
        <Typography children="Read user guide" variant="body2" />
      </div>
      <div className={classes.menuItem} onClick={talkToHelpdesk}>
        <Phone className="icon" />
        <Typography children="Talk to Helpdesk" variant="body2" />
      </div>
      <Divider className={classes.divider} />
      <div className={classes.versionItem}>
        <Typography
          children={`MyCarrier Internal v${version}`}
          inline
          variant="caption"
        />
        <Typography
          children={`Updated ${dateDiff('days', releaseDate)} days ago`}
          inline
          variant="caption"
        />
      </div>
    </Popover>
  );

  let renderControl = (
    <div className={classes.root} onClick={setOpen(true)}>
      <Help className={classes.account} />
      <div children="Help" className={classes.label} />
    </div>
  );

  if (smClient) {
    renderControl = (
      <div className={classes.iconOnly} onClick={setOpen(true)}>
        <Help className="icon" />
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

HelpMenuDropdown.defaultProps = {
  name: '',
};

HelpMenuDropdown.propTypes = {
  name: PropTypes.string,
};

export default HelpMenuDropdown;
