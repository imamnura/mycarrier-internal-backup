import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Text from '../../../../../../__old/components/elements/Text';
import ImageAttachment from '../../../../../../__old/components/elements/ImageAttachment';
import FileAttachment from '../../../../../../__old/components/elements/FileAttachment';

export default function Component(props) {
  const { classes, data } = props;

  return (
    data?.evidence?.length > 0 && (
      <Grid className={classes.wrapper} container spacing={1}>
        <Grid item xs={12}>
          <Text color="grey" variant="h4">
            Evidence
          </Text>
        </Grid>
        {data.evidence.map((item, i) => (
          <>
            {item && ['pdf'].includes(item.fileType) && (
              <Grid className={classes.evidenceWrapper} item key={i} xs={12}>
                <FileAttachment
                  fileName={item.fileName}
                  type="pdf"
                  url={item.fileUrl}
                />
              </Grid>
            )}
            {item &&
              ['image', 'jpg', 'png', 'jpeg'].includes(item.fileType) && (
                <Grid className={classes.evidenceWrapper} item key={i} xs={5}>
                  <ImageAttachment
                    fileName={item.fileName}
                    url={item.fileUrl}
                  />
                </Grid>
              )}
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
