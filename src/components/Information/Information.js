import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Flex, Text } from '@legion-ui/core';

const Information = (props) => {
  const { label, value, weight, subLabel } = props;

  let renderValue = null;

  if (['string', 'number'].includes(typeof value)) {
    renderValue = subLabel ? (
      <>
        <Box width="100%">
          <Text
            children={value}
            inline
            weight={weight}
            style={{ overflowWrap: 'anywhere' }}
          />
        </Box>
        <Box
          width="fit-content"
          sx={{
            padding: '4px 8px',
            backgroundColor: '#E5E8EA',
            borderRadius: '4px',
          }}
        >
          <Text
            children={subLabel}
            inline
            weight={'bold'}
            style={{ color: '#9E9E9E' }}
          />
        </Box>
      </>
    ) : (
      <Text
        children={value}
        inline
        weight={weight}
        style={{ overflowWrap: 'anywhere' }}
      />
    );
  } else if (Array.isArray(value)) {
    renderValue = (
      <>
        {value.map((itemValue, index) => {
          if (['string', 'number'].includes(typeof itemValue)) {
            return (
              <Text style={{ overflowWrap: 'anywhere' }} key={index}>
                {value}
              </Text>
            );
          } else {
            return itemValue;
          }
        })}
      </>
    );
  } else {
    renderValue = value;
  }

  return (
    <Flex direction="column">
      <Text color="secondary500" weight="700" size="12px">
        {label.toUpperCase()}
      </Text>
      <Box width="100%">{renderValue}</Box>
    </Flex>
  );
};

Information.defaultProps = {
  label: '',
  value: null,
  weight: 'normal',
};

Information.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.node,
  ]),
  weight: PropTypes.string,
};

export default Information;
