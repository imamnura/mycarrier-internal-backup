import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import SearchFile from '@assets/ilustration-v2/SearchFile';
import StateMessage from '@components/StateMessage';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import List from '@fragments/List';
import { schemaQuote } from './utils';
import useActions from './hooks/useActions';
import PropTypes from 'prop-types';

const Quote = (props) => {
  const { list, loadingTable, onClickRowTable } = useActions(props);

  const { data } = useDetailData();
  const { initialState } = props;

  const stateProps =
    useMemo(() => {
      return noDataStageInformation(data.status, 'Quote');
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
    breadcrumb: [{ label: 'Quote List', color: 'general-mid' }],
    table: {
      numbering: false,
      data: list,
      meta: { totalPage: 0 },
      schema: schemaQuote,
      loading: false,
      loadingRoot: loadingTable,
      onClickRow: onClickRowTable,
      emptyMessage: {
        description: `Quote list is not currently created by the Account Manager`,
        message: `Quote list doesn't exist yet`,
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

Quote.defaultProps = {
  initialState: false,
};

Quote.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Quote);
