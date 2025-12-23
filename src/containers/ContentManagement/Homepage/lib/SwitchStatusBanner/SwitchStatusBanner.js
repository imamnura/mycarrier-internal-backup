import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@components/Tooltip';
import { Switch } from '@legion-ui/core';

const SwitchStatusPopUp = (props) => {
  const { data, onClickUpdateStatus, meta, ...otherSwitchProps } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const shouldDisableSwitch = meta.totalShow <= 1;

  const handleClose = () => setTooltipOpen(false);
  const handleOpen = () =>
    data.isDisplay && shouldDisableSwitch && setTooltipOpen(true);
  const onClickSpan = (e) => e.stopPropagation();

  return (
    <Tooltip
      arrow
      onClose={handleClose}
      onOpen={handleOpen}
      open={tooltipOpen}
      placement="bottom"
      title="Can’t change status. Minimum 1 banner show required."
    >
      <span onClick={onClickSpan}>
        <Switch
          {...otherSwitchProps}
          checked={!!data?.isDisplay}
          disabled={!!data?.isDisplay && shouldDisableSwitch}
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
