import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Summary from './elements/Summary';
import LeadValidSummary from './elements/LeadValidSummary';
import List from './elements/List';
import useAction from './hooks/useAction';
import DownloadForm from './elements/DownloadForm';
import { isHaveAccess } from '@utils/common';

const ListDashboard = (props) => {
  const { formDownload, onCreate, onDownload, setFormDownload, feature } =
    useAction(props);
  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'read_download_list_lead'))
      actions.push({ children: 'download', onClick: setFormDownload(true) });

    if (isHaveAccess(feature, 'create_new_lead_by_am_lead'))
      actions.push({ children: 'add new lead', onClick: onCreate });

    return actions;
  };

  return (
    <>
      <HeaderAndFilter
        action={action()}
        breadcrumb={[{ label: 'Dashboard' }]}
      />
      <Box mt={4}>
        <Grid container spacing={4} style={{ padding: '24px 32px' }}>
          <Grid item lg={6} xs={12}>
            <Summary />
          </Grid>
          <Grid item lg={6} xs={12}>
            <LeadValidSummary />
          </Grid>
        </Grid>
      </Box>
      <List {...props} />
      <DownloadForm
        onClose={setFormDownload(false)}
        onSubmit={onDownload}
        open={formDownload}
      />
    </>
  );
};

ListDashboard.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ListDashboard;
