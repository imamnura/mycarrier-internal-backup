import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import ImageAttachment from '@__old/components/elements/ImageAttachment';
import moment from 'moment';

export default function Component(props) {
  const { data } = props;

  const renderAttachment = () => {
    return (
      data &&
      data.troubleOccurs.map((t) => {
        return (
          <>
            {t.file.map((f, key) => (
              <Grid item key={key} xs={4}>
                <ImageAttachment fileName={f.fileName} url={f.fileUrl} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography color="general-mid" variant="caption">
                TIMESTAMPS
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {moment(t.dateTime).format('DD/MM/YYYY HH:mm:ss')}
              </Typography>
            </Grid>
          </>
        );
      })
    );
  };

  return (
    <Grid container key="attachment" spacing={1}>
      {renderAttachment()}
    </Grid>
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
};
