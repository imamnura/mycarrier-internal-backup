import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import ImageAttachment from '@__old/components/elements/ImageAttachment';
import FileAttachment from '@__old/components/elements/FileAttachment';

export default function Component(props) {
  const { classes, data } = props;

  return (
    data?.status !== 'checking' &&
    data?.evidenceAttachment?.length !== 0 &&
    data?.status !== 'rejected' && (
      <Grid className={classes.wrapper} container spacing={1}>
        {data?.evidenceAttachment?.map((item, i) => (
          <>
            <Grid item xs={1}>
              <div className={classes.circleNumber}>
                <Typography color="white" variant="h6">
                  {i + 1}
                </Typography>
              </div>
            </Grid>
            <Grid className={classes.evidenceWrapper} item xs={11}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className={classes.boxCompleted}>
                    <Typography color="green" variant="subtitle2">
                      {item.evidenceToCustomer}
                    </Typography>
                  </div>
                </Grid>
                {item && item.fileType === 'pdf' && (
                  <Grid item xs={12}>
                    <FileAttachment
                      fileName={item.fileName}
                      type="pdf"
                      url={item.fileUrl}
                    />
                  </Grid>
                )}
                {item && item.fileType === 'image' && (
                  <Grid item xs={4}>
                    <ImageAttachment
                      fileName={item.fileName}
                      url={item.fileUrl}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    )
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  schema: PropTypes.object.isRequired,
};
