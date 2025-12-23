import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import SearchFile from '@assets/ilustration-v2/SearchFile';
import StateMessage from '@components/StateMessage';
import List from '@fragments/List';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import useActions from './hooks/useActions';
import { schemaOrder } from './utils';
import PropTypes from 'prop-types';

const Order = (props) => {
  const { list, loadingTable, onClickRowTable } = useActions(props);

  const { data } = useDetailData();
  const { initialState } = props;

  const stateProps =
    useMemo(() => {
      return noDataStageInformation(data.status, 'Order');
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

  const listProps = {
    breadcrumb: [{ label: 'Order List', color: 'general-mid' }],
    table: {
      numbering: false,
      data: list,
      meta: { totalPage: 0 },
      schema: schemaOrder,
      loading: false,
      loadingRoot: loadingTable,
      onClickRow: onClickRowTable,
      emptyMessage: {
        description: `Order list is not currently created by the Account Manager`,
        message: `Order list doesn't exist yet`,
        icon: SearchFile,
      },
      size: 5,
    },
  };

  return (
    <>
      <List {...listProps} />
    </>
  );
};

Order.defaultProps = {
  initialState: false,
};

Order.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Order);
