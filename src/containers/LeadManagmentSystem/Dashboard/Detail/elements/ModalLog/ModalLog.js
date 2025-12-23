import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import Tabs from '@components/Tabs';
import Button from '@components/Button';
import Worklog from '@components/Worklog';
import Table from '@components/Table';
import {
  getDashboardWorklog,
  tableTTRHeader,
  useDetailData,
} from '../../utils';
import ArrowKeyboardRight from '@assets/icon-v2/ArrowKeyboardRight';
import { maskLeadStatus } from '@containers/LeadManagmentSystem/Dashboard/utils';

const ModalLog = (props) => {
  const { data } = useDetailData();

  const { onClose, open, setTab, tab } = useAction(props);

  const classes = useStyles();

  const tableData = () => {
    let listData = data?.ttr?.list?.map((item) => ({
      ...item,
      decimal: item.decimal + '',
      status: (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            width: 'max-content',
          }}
        >
          <Typography children={maskLeadStatus(item.from)} inline />
          <ArrowKeyboardRight className={classes.status} />
          <Typography children={maskLeadStatus(item.to)} inline />
        </Box>
      ),
    }));

    if (listData?.length) {
      listData.push({
        status: (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Typography
              children="Total Time To Respond"
              inline
              variant="subtitle1"
            />
          </Box>
        ),
        decimal: (
          <Typography
            children={data?.ttr?.totalDecimal || '-'}
            inline
            variant="subtitle1"
            weight="bold"
          />
        ),
        date: (
          <Typography
            children={data?.ttr?.totalDate || '-'}
            inline
            variant="subtitle1"
            weight="bold"
          />
        ),
      });
    }

    return listData;
  };

  const renderContent = () => {
    switch (tab) {
      case 'history':
        return (
          <Box className={classes.scroller} pr={2} pt={4}>
            <Worklog
              data={getDashboardWorklog(
                data?.worklog,
                data?.validBy,
                data?.isNetworkConnectivity,
              )}
            />
          </Box>
        );
      case 'ttr':
        return (
          <Box className={classes.scroller}>
            <Table
              data={tableData()}
              emptyMessage={{
                description: `The data will appear if the status move to another status`,
                message: `There is no log Time To Respond`,
              }}
              meta={{ page: 0 }}
              numbering={false}
              schema={tableTTRHeader}
            />
          </Box>
        );
      default:
        return;
    }
  };

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} open={open} scroll="body">
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5" weight="medium">
            Log
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Tabs
              onChange={setTab}
              options={[
                { label: 'History Work Log', value: 'history' },
                { label: 'Time To Respond', value: 'ttr' },
              ]}
              value={tab}
            />
            {renderContent()}
          </div>
        </Grid>
        <Grid align="center" item xs={12}>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

ModalLog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ModalLog;
