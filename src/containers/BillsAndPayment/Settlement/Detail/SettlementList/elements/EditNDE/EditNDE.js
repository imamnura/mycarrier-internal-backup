import React from 'react';
import { Dialog, Slide } from '@material-ui/core';
import Typography from '@components/Typography';
import useStyles from './styles';
import Button from '@components/Button';
import Wysiwyg from '@components/Wysiwyg';
import useAction from './hooks/useAction';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditNDE = (props) => {
  const classes = useStyles();

  const { onClose, onSubmit, open, value, setValue } = useAction(props);

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <div className={classes.header}>
        <Typography className={classes.title} variant="subtitle1">
          Edit NDE
        </Typography>
        <div className={classes.actionButton}>
          <Button children="cancel" onClick={onClose} variant="ghost" />
          <Button
            children="save changes"
            disabled={!value}
            onClick={onSubmit}
          />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Wysiwyg onChange={setValue} value={value} variant="document" />
      </div>
    </Dialog>
  );
};

export default EditNDE;
