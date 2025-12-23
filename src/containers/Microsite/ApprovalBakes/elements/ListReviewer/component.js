import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../../../../../__old/components/elements/Text';
import RedList from '../../../../../__old/components/elements/RedList';

export default function Component(props) {
  const { classes, data } = props;

  const approvalSchema = [
    { name: 'name', label: 'Name' },
    { name: 'position', label: 'Title' },
    { name: 'email', label: 'Email' },
    { name: 'note', label: 'Notes' },
  ];

  const renderItem = (item) => (
    <Grid container direction="column" spacing={1}>
      {approvalSchema.map((schema, index) => (
        <Grid item key={index}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '75px' }}>
              <Text color="grey" variant="body2">
                {schema.label}
              </Text>
            </div>
            <div style={{ width: '200px' }}>
              <Text variant="body2" weight="bold">
                {item[schema.name] ? item[schema.name] : '-'}
              </Text>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    data[0].note && (
      <Fragment>
        <Text color="grey" variant="body1">
          Note From Telkom
        </Text>
        <RedList
          child={renderItem}
          classes={classes}
          data={data}
          hide={(i) => data[i].note}
        />
      </Fragment>
    )
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
};
