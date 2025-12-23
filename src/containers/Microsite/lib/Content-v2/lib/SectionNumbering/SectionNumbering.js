import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Numbering from '../../elements/Numbering';

const SectionNumbering = (props) => {
  const { data, nameKey, schema } = props;

  return (
    <Box mb={3}>
      {data.map((_value, i) => {
        let value = _value;

        if (typeof value === 'object' && nameKey) {
          value = getValueObject({ name: nameKey, data: value }) || '-';
        }

        return (
          <Box key={`numbering-${i}`}>
            <Numbering
              alignItems={!schema ? 'center' : 'flex-start'}
              data={value}
              number={i + 1}
              schema={schema}
              size="small"
            />
          </Box>
        );
      })}
    </Box>
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
