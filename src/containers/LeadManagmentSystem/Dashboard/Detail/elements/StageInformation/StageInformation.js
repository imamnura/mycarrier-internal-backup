import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@components/Tabs';
import LeadDetail from './elements/LeadDetail';
import Qualify from './elements/Qualify';
import { Box } from '@material-ui/core';
import Opportunity from './elements/Opportunity';
import Quote from './elements/Quote';
import Agreement from './elements/Agreement';
import Order from './elements/Order';
import Provisioning from './elements/Provisioning';
import useQueryParams from '@utils/hooks/useQueryParams';
import LoadingBar from '@components/LoadingBar';
import { useDetailData } from '../../utils';

const StageInformation = ({ loading }) => {
  const { queryParams, setQueryParams } = useQueryParams();
  const { data } = useDetailData();

  const tab = queryParams.stage || 'leadDetail';
  const setTab = (stage) => setQueryParams({ stage });

  const content = useMemo(() => {
    return {
      leadDetail: <LeadDetail />,
      qualify: <Qualify />,
      opportunity: <Opportunity />,
      quote: <Quote />,
      agreement: <Agreement />,
      order: <Order />,
      provisioning: <Provisioning />,
    }[tab];
  }, [tab]);

  const optTab = data?.isNetworkConnectivity
    ? [
        { label: 'Lead Detail', value: 'leadDetail' },
        { label: 'Qualify', value: 'qualify' },
        { label: 'Opportunity', value: 'opportunity' },
        { label: 'Quote', value: 'quote' },
        { label: 'Agreement', value: 'agreement' },
        { label: 'Order', value: 'order' },
      ]
    : [{ label: 'Lead Detail', value: 'leadDetail' }];

  return (
    <div>
      <Tabs onChange={setTab} options={optTab} value={loading ? false : tab} />
      <LoadingBar loading={loading} />
      <Box mt={5} visibility={loading ? 'hidden' : 'inherit'}>
        {content}
      </Box>
    </div>
  );
};

StageInformation.defaultProps = {
  loading: true,
};

StageInformation.propTypes = {
  loading: PropTypes.bool,
};

export default React.memo(StageInformation);
