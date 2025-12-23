import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import NoData from '@assets/Svg/NoData';
import Text from '@__old/components/elements/Text';
import { Grid } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const Component = ({ amProfile, classes, deleteAM }) => {
  const contentEmpty = amProfile.length < 1 && (
    <div className={classes.emptyData}>
      <NoData />
      <div className={classes.emptyContainer}>
        <Text variant="h5">Search your data with specific keyword.</Text>
      </div>
    </div>
  );

  const content = (value) => {
    return <Text variant="subtitle1Bold">{!value ? '-' : value}</Text>;
  };

  return (
    <>
      {contentEmpty}
      {amProfile.map((item, index) => {
        return (
          <>
            <Grid
              container
              direction="row"
              item
              justifyContent="flex-start"
              key={`amProfile-${index}`}
              style={{ marginTop: '35px' }}
            >
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    NAME
                  </Text>
                  {content(item?.fullName)}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    NIK
                  </Text>
                  {content(item?.nik)}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    SEGMENT
                  </Text>
                  {content(item?.segment)}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    GM SEGMENT
                  </Text>
                  {content(item?.generalManager)}
                </div>
              </Grid>
              <Grid item md={12} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    POSITION
                  </Text>
                  {content(item?.jobTitle)}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    CONTACT NUMBER
                  </Text>
                  {content(item?.phoneNumber)}
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.subitem}>
                  <Text color="grey" variant="caption">
                    EMAIL
                  </Text>
                  {content(item?.email)}
                </div>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.removeButton}>
                <div />
                <span id="delbutton" onClick={() => deleteAM(item?.nik)}>
                  <AddCircle style={{ transform: 'rotate(45deg)' }} />
                  <Text color="primary" variant="button">
                    DELETE AM
                  </Text>
                </span>
              </div>
            </Grid>
          </>
        );
      })}
    </>
  );
};

Component.defaultProps = {
  amProfile: [],
  classes: {},
};

Component.propTypes = {
  amProfile: PropTypes.array,
  classes: PropTypes.object,
  deleteAM: PropTypes.func.isRequired,
};

export default withStyles(styles)(Component);
