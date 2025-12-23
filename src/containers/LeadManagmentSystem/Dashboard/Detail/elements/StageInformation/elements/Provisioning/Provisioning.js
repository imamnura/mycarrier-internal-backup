import React, { useMemo } from 'react';
import StateMessage from '@components/StateMessage';
import { Box } from '@material-ui/core';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import PropTypes from 'prop-types';

const Provisioning = (props) => {
  const { data } = useDetailData();
  const { initialState } = props;

  const stateProps =
    useMemo(() => {
      return noDataStageInformation(data.status, 'Provisioning');
    }, [data.status]) || initialState;

  if (stateProps) {
    return (
      <Box py={4}>
        <StateMessage
          description={stateProps.description}
          ilustration={stateProps.ilustration}
          message={stateProps.message}
        />
      </Box>
    );
  }

  return <> </>;
};

Provisioning.defaultProps = {
  initialState: false,
};

Provisioning.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Provisioning);
