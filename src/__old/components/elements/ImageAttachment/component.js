import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../Text';
import Download from '../../../../assets/Svg/Download';
import { textLimit } from '../../../../utils/text';
import Image from 'next/image';
// import { getFileInformation } from '@utils/common';

const Component = (props) => {
  const { classes, label, fileName, isVideo, url } = props;

  // const { extension } = getFileInformation(url);

  const handleDownload = () => {
    window.open(url, '_blank');
  };

  return (
    <Grid alignItems="center" className={classes.root} container>
      {label && (
        <Grid item xs={12}>
          <Text className={classes.label} color="grey" variant="body2">
            {label}
          </Text>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid
          alignItems="center"
          className={classes.file}
          container
          onClick={handleDownload}
          spacing={1}
        >
          <Grid item xs={12}>
            {isVideo ? (
              <video autoPlay className={classes.image} loop src={url} />
            ) : (
              <Image
                alt=""
                className={classes.image}
                height={160}
                src={url}
                unoptimized={true}
                width={160}
              />
            )}
          </Grid>
          <Grid item style={{ wordBreak: 'break-all' }} xs={10}>
            <Text variant="subtitle1">{textLimit(fileName, 24)}</Text>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.downloadIcon}>
              <Download />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  fileName: '-',
  isVideo: false,
  label: '',
  type: 'ZIP',
  url: '',
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  fileName: PropTypes.string,
  isVideo: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

export default Component;
