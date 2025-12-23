import StateMessage from '@components/StateMessage';
import Typography from '@components/Typography';
import {
  noDataStageInformation,
  useDetailData,
} from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';
import { DetailGenerator } from '@fragments/Detail';
import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import LeadsFollowUpDetail from '../../../LeadsFollowUpDetail';
import PropTypes from 'prop-types';

const Opportunity = (props) => {
  const { data } = useDetailData();
  const { initialState } = props;

  const stateProps =
    useMemo(() => {
      let retireOnOpportunity = false;
      data.timeline.map((item, index, array) => {
        if ((item.status, item.active)) {
          if (array[index - 1]?.status === 'qualify')
            retireOnOpportunity = true;
        }
      });
      return noDataStageInformation(
        data.status,
        'Opportunity',
        retireOnOpportunity,
      );
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

  const schema = [
    {
      type: 'information',
      title: 'Opportunity Detail',
      properties: {
        data: data?.opportunity || {},
        schema: [
          {
            label: 'OPPORTUNITY ID',
            name: 'oppId',
            grid: 3,
          },
          {
            label: 'OPPORTUNITY NUMBER',
            name: 'oppNumber',
            grid: 3,
          },
        ],
      },
    },
    {
      type: 'custom',
      title: 'Revenue',
      render: (
        <Box pt={2}>
          <Typography
            children={data?.opportunity?.revenue}
            color="primary-main"
            variant="h4"
            weight="medium"
          />
        </Box>
      ),
    },
    {
      type: 'custom',
      render: <LeadsFollowUpDetail variant="opportunity" />,
    },
  ];

  return (
    <>
      <DetailGenerator data={schema} />
    </>
  );
};

Opportunity.defaultProps = {
  initialState: false,
};

Opportunity.propTypes = {
  initialState: PropTypes.bool,
};

export default React.memo(Opportunity);
