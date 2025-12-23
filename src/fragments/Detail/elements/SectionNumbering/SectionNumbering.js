import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Numbering from '@components/Numbering';

const SectionNumbering = (props) => {
  const { data, nameKey, schema } = props;

  return (
    <Grid container spacing={3}>
      {data.map((_value, i) => {
        let value = _value;

        if (typeof value === 'object' && nameKey) {
          value = getValueObject({ name: nameKey, data: value }) || '-';
        }

        return (
          <Grid item key={i} xs={12}>
            <Numbering
              alignItems={!schema ? 'center' : 'flex-start'}
              data={value}
              number={i + 1}
              schema={schema}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

SectionNumbering.defaultProps = {
  data: [],
  nameKey: '',
  schema: undefined,
};

SectionNumbering.propTypes = {
  data: PropTypes.array,
  nameKey: PropTypes.string,
  schema: PropTypes.array,
};

export default SectionNumbering;
