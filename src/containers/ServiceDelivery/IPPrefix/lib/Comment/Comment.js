import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Box, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import BubbleChat from './lib/BubbleChat';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import StateMessage from '@components/StateMessage';
import SearchFile from '@assets/ilustration-v2/SearchFile';
import Stroke from '@assets/icon-v2/Stroke';
import useActions from './hooks/useActions';
import useStyles from './styles';

export default function Component(props) {
  const { open, data } = props;
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    onClose,
    comment,
    handleSendComment,
    loading,
  } = useActions(props);

  const renderContent = () => {
    if (comment?.length < 1 && !loading.data.root) {
      return (
        <Grid
          alignItems="center"
          className={classes.root}
          container
          direction="column"
          justifyContent="center"
        >
          <StateMessage
            description="There is no comment yet"
            ilustration={SearchFile}
          />
        </Grid>
      );
    }

    return (
      <Box className={classes.root} id="room-chat">
        {comment.map((v, i) => (
          <BubbleChat key={i} {...v} />
        ))}
      </Box>
    );
  };

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <Grid container>
        <Grid item xs={12}>
          <Typography color="general-dark" variant="h5" weight="medium">
            Comments
          </Typography>
        </Grid>
      </Grid>
      {renderContent()}
      {data?.status === 'returned' ||
      data?.status === 'triims returned' ||
      data?.status === 'on progress' ? (
        <Box className={classes.bottomContainer}>
          <Paper className={classes.rootInput}>
            <Controller
              control={control}
              name="comment"
              render={({ field, fieldState }) => (
                <InputBase
                  {...field}
                  {...fieldState}
                  className={classes.input}
                  multiline
                  placeholder="Type Here..."
                />
              )}
            />
            <IconButton
              className={classes.iconButton}
              onClick={handleSubmit(handleSendComment)}
            >
              <Stroke />
            </IconButton>
          </Paper>
        </Box>
      ) : null}
    </Dialog>
  );
}

Component.defaultProps = {
  data: {},
  open: false,
};

Component.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
};
