import React from 'react';
import { Dialog, Zoom } from '@material-ui/core';
import useStyles from './styles';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { dateFormat, stringToHtml } from '@utils/parser';
import useWhatsNew from './hooks/useAction';

const WhatsNew = () => {
  const classes = useStyles();

  const { data, onClose } = useWhatsNew();

  const { version, releaseDate, content } = data || {
    version: '',
    releaseDate: '',
    content: '',
  };

  return (
    <Dialog
      classes={{ paper: classes.root }}
      fullWidth
      open={!!data}
      TransitionComponent={Zoom}
    >
      <div className={classes.header}>
        <Typography color="general-main" variant="h5" weight="medium">
          What’s New on MyCarrier
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography color="general-mid" variant="subtitle1" weight="light">
          {dateFormat({ type: 'date-month-year', date: releaseDate })}
        </Typography>
        <div className={classes.title}>
          <div className="dot" />
          <Typography color="general-main" variant="h3" weight="medium">
            Release new feature for v{version}
          </Typography>
        </div>
        <div className={classes.detail}>{stringToHtml(content)}</div>
      </div>
      <div className={classes.footer}>
        <Button onClick={onClose} variant="ghost">
          thanks for the information!
        </Button>
      </div>
    </Dialog>
  );
};

export default WhatsNew;
