import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@legion-ui/core';

const SwitchStatusPopUp = (props) => {
  const { data, onChangeStatusBanner, locatorId, ...otherSwitchProps } = props;

  const onClickSpan = (e) => e.stopPropagation();

  return (
    <span onClick={onClickSpan} id={locatorId?.action?.showHide}>
      <Switch
        {...otherSwitchProps}
        checked={data?.isActive}
        disabled={false}
        onChange={onChangeStatusBanner}
      />
    </span>
  );
};

SwitchStatusPopUp.defaultProps = {
  data: null,
  onChangeStatusBanner: () => {},
};

SwitchStatusPopUp.propTypes = {
  data: PropTypes.object,
  onChangeStatusBanner: PropTypes.func,
};

export default SwitchStatusPopUp;
