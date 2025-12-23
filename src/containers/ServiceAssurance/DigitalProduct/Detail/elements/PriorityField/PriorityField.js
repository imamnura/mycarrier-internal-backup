import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import color from '@styles/color';

const PriorityField = (props) => {
  const { priority } = props;

  const pickColor =
    {
      low: color.green.main,
      Low: color.green.main,
      medium: color.orange.main,
      Medium: color.orange.main,
      high: color.primary.main,
      High: color.primary.main,
    }[priority] || color.general.soft;

  if (!priority) {
    return '-';
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          marginRight: 4,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: pickColor,
        }}
      />
      <Typography children={priority} inline variant="subtitle1" />
    </div>
  );
};

PriorityField.defaultProps = {
  priority: '',
};

PriorityField.propTypes = {
  priority: PropTypes.string,
};

export default PriorityField;
