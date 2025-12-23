import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@components/Tooltip';
import { Switch } from '@legion-ui/core';
import moment from 'moment';

const SwitchStatusPopUp = (props) => {
  const { data, onClickUpdateStatus, ...otherSwitchProps } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const endPeriodDate = moment(data?.endPeriod, 'YYYY-MM-DD');
  const today = moment();
  const isExpiredPeriod = endPeriodDate.isBefore(today, 'day');

  const handleClose = () => setTooltipOpen(false);
  const handleOpen = () => isExpiredPeriod && setTooltipOpen(true);
  const onClickSpan = (e) => e.stopPropagation();

  return (
    <Tooltip
      arrow
      onClose={handleClose}
      onOpen={handleOpen}
      open={tooltipOpen}
      placement="bottom"
      title="Can’t change status. Period has ended."
    >
      <span onClick={onClickSpan}>
        <Switch
          {...otherSwitchProps}
          checked={data?.status?.toLowerCase() === 'active'}
          disabled={isExpiredPeriod}
          onChange={onClickUpdateStatus}
        />
      </span>
    </Tooltip>
  );
};

SwitchStatusPopUp.defaultProps = {
  data: null,
  onClickUpdateStatus: () => {},
};

SwitchStatusPopUp.propTypes = {
  data: PropTypes.object,
  onClickUpdateStatus: PropTypes.func,
};

export default SwitchStatusPopUp;
