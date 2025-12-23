import React from 'react';
import PropTypes from 'prop-types';
import Astinet from './elements/Astinet';
import General from './elements/General';
import IpTransit from './elements/IpTransit';
import VpnIp from './elements/VpnIp';
import MetroEthernet from './elements/MetroEthernet';
import Neucentrix from './elements/Neucentrix';

const FormAuto = (props) => {
  const { serviceName, ...otherProps } = props;

  if (serviceName.value === 'ASTINET') {
    return <Astinet {...otherProps} />;
  } else if (serviceName.value === 'IP TRANSIT') {
    return <IpTransit {...otherProps} />;
  } else if (serviceName.value === 'VPN IP') {
    return <VpnIp {...otherProps} />;
  } else if (serviceName.value === 'METRO E') {
    return <MetroEthernet {...otherProps} />;
  } else if (serviceName.value === 'CNDC') {
    return <Neucentrix {...otherProps} />;
  } else {
    return <General {...otherProps} />;
  }
};

FormAuto.defaultProps = {
  builder: {},
  serviceName: {},
};

FormAuto.propTypes = {
  builder: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  serviceName: PropTypes.object,
};

export default FormAuto;
