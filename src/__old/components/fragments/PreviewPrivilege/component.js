import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import Journey from './elements/journey';
import Category from './elements/category';
import Text from '../../elements/Text';
import useStyles from './hooks/useStyles';
import useActions from './hooks/useActions';

const Component = (props) => {
  const { data, hasPrivilege, isDisabled, isLabelActive, previewFrom } = props;

  const { getJourney, state, getCategory } = useActions(props);

  const classes = useStyles();

  const renderPrivilege = () => {
    if (previewFrom === 'category') {
      return (
        <Category
          classes={classes}
          data={state}
          getCategory={getCategory}
          isDisabled={isDisabled}
          isExpandJourney={true}
          isLabelActive={isLabelActive}
        />
      );
    } else {
      return state.map((journey, i) => (
        <div key={i} style={{ display: 'inline-block', width: '100%' }}>
          <Journey
            classes={classes}
            getJourney={getJourney}
            isDisabled={isDisabled}
            isLabelActive={isLabelActive}
            journey={journey}
          />
        </div>
      ));
    }
  };

  const preview = () => {
    return data.length === 0 ? (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
        <CircularProgress style={{ color: '#DE1B1B' }} />
      </div>
    ) : (
      <Grid container direction="column">
        <div style={{ columnCount: 2, columnGap: '1em', marginBottom: '22px' }}>
          {renderPrivilege()}
        </div>
      </Grid>
    );
  };

  return (
    <>
      {hasPrivilege && (
        <>
          <div style={{ marginBottom: '22px', marginTop: '24px' }}>
            <Text color="grey" variant="h4" weight="medium">
              Privilege Preview
            </Text>
          </div>
          {preview()}
        </>
      )}
    </>
  );
};

Component.defaultProps = {
  classes: {},
  previewFrom: 'journey',
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array.isRequired,
  hasPrivilege: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLabelActive: PropTypes.bool.isRequired,
  previewFrom: PropTypes.oneOf(['journey', 'category', 'feature', 'function']),
};

export default Component;
