import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@components/Dropdown';

const Component = (props) => {
  const { filterOptions, filterValue, filterWidth } = props;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          backgroundColor: '#FFF',
          borderRadius: '5px',
        }}
      >
        <Dropdown
          defaultMenuIsOpen={true}
          options={filterOptions}
          staticWidth={filterWidth}
          value={filterValue}
        />
      </div>
    </div>
  );
};

Component.defaultProps = {
  filterOptions: [],
  filterValue: {},
  filterWidth: 300,
};

Component.propTypes = {
  filterOptions: PropTypes.array,
  filterValue: PropTypes.object,
  filterWidth: PropTypes.number,
};

export default Component;
