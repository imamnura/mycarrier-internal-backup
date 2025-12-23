import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@components/Tabs';
import { Box, Grid } from '@material-ui/core';
import ProjectList from './lib/ProjectList';
import ServiceList from './lib/ServiceList';
import useQueryParams from '@utils/hooks/useQueryParams';

const ProjectAndServiceList = ({ optTab, ...props }) => {
  const { queryParams, setQueryParamsForce, isReady } = useQueryParams();

  const tab = queryParams?.tab || 'serviceList';
  const setTab = () => (tab) =>
    setQueryParamsForce({ tab, id: queryParams.id });

  const content = useMemo(() => {
    return {
      project: <ProjectList {...props} />,
      serviceList: <ServiceList {...props} />,
    }[tab];
  }, [tab]);

  return (
    isReady && (
      <Grid>
        {!!optTab && (
          <>
            <Tabs onChange={setTab()} options={optTab} value={tab} />
          </>
        )}
        <Box>{content}</Box>
      </Grid>
    )
  );
};

ProjectAndServiceList.defaultProps = {
  optTab: null,
};

ProjectAndServiceList.propTypes = {
  optTab: PropTypes.array,
};

export default React.memo(ProjectAndServiceList);
