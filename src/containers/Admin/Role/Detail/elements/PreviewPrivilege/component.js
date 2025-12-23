import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Journey from './elements/journey';
import Category from './elements/category';
import useStyles from './hooks/useStyles';
import useActions from './hooks/useActions';

const Component = (props) => {
  const { isDisabled, isLabelActive, previewFrom } = props;

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

  return (
    <>
      <Grid
        item
        md={12}
        xs={12}
        style={{
          background: '#fff',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <Grid container direction="column">
          <div
            style={{ columnCount: 2, columnGap: '1em', marginBottom: '22px' }}
          >
            {renderPrivilege()}
          </div>
        </Grid>
      </Grid>
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
  isDisabled: PropTypes.bool.isRequired,
  isLabelActive: PropTypes.bool.isRequired,
  previewFrom: PropTypes.oneOf(['journey', 'category', 'feature', 'function']),
};

export default Component;
