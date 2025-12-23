import React, { useMemo } from 'react';
import StateMessage from '@components/StateMessage';
import { Box } from '@material-ui/core';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import SearchFile from '@assets/ilustration-v2/SearchFile';
import PropTypes from 'prop-types';

const Agreement = (props) => {
  const { list, loadingTable, onClickRowTable } = useActions(props);

  const { initialState } = props;
  const { data } = useDetailData();

  const stateProps =
    useMemo(() => {
      return noDataStageInformation(data.status, 'Agreement');
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
    breadcrumb: [{ label: 'Agreement List', color: 'general-mid' }],
    table: {
      numbering: false,
      data: list,
      meta: { totalPage: 0 },
      loading: false,
      loadingRoot: loadingTable,
      onClickRow: onClickRowTable,
      emptyMessage: {
        description: `Agreement list is not currently created by the Account Manager`,
        message: `Agreement list doesn't exist yet`,
        icon: SearchFile,
      },
      size: 5,
      schema: [
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'SC QUOTE ID',
          name: 'scQuoteId',
        },
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'QUOTE',
          name: 'quoteId',
        },
        {
          cellStyle: {
            minWidth: 252,
          },
          label: 'QUOTE NAME',
          name: 'quoteName',
        },
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'REVISION',
          name: 'revision',
        },
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'CREATED BY',
          name: 'createdBy',
        },
        {
          cellStyle: {
            minWidth: 252,
          },
          label: 'CUSTOMER ACCOUNT',
          name: 'customerAccount',
        },
        {
          cellStyle: {
            minWidth: 252,
          },
          label: 'LAST NAME',
          name: 'lastName',
        },
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'STATUS',
          name: 'status',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'CHILD AGREEMENT',
          name: 'childAgreement',
        },
        {
          cellStyle: {
            minWidth: 148,
          },
          label: 'ACCOUNT TEAM',
          name: 'accountTeam',
        },
      ],
    },
  };

  return <List {...listProps} />;
};

Agreement.defaultProps = {
  initialState: false,
};

Agreement.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Agreement);
