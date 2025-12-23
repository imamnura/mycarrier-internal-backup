import React from 'react';
import PropTypes from 'prop-types';
import { getFileIcon, getFileInformation } from '@utils/common';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Trash from '@assets/icon-v2/Trash';
import { Text } from '@legion-ui/core';

const Attachment = (props) => {
  const { id, fileName, handleDelete } = props;

  const { name, extension } = getFileInformation(fileName);

  const Icon = getFileIcon(extension);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid alignItems="center" container spacing={2}>
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
        <Grid className={classes.title} item xs>
          <Text>{fileName || name}</Text>
        </Grid>
        <Grid item>
          <div className={classes.actionIcon} onClick={() => handleDelete(id)}>
            <Trash />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Attachment.defaultProps = {
  fileName: '',
  fileUrl: '',
  id: '',
};

Attachment.propTypes = {
  fileName: PropTypes.string,
  fileUrl: PropTypes.string,
  id: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
};

export default Attachment;
