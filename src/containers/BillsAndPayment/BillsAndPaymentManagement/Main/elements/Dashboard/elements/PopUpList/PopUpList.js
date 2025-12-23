/* eslint-disable react/prop-types */
import { Box, Dialog } from '@material-ui/core';
import React, { useMemo } from 'react';
import useStyles from './styles';
import Typography from '@components/Typography/Typography';
import List from '@fragments/List/List';
import Button from '@components/Button/Button';
import { tableSchema } from './utils';
import useAction from './hooks/useAction';

const PopUpList = (props) => {
  const { type, subType, open, onClose, testLocator } = props;

  const classes = useStyles();

  const {
    filterStatus,
    search,
    setFilterStatus,
    setSearch,
    list,
    onPaginationChange,
    page,
    onDownload,
    loadingTable,
  } = useAction(props);

  const title =
    {
      invoice: {
        all: 'Summary Invoice Document Status',
        requested: 'Summary Invoice Document Status - Requested',
        inProgress: 'Summary Invoice Document Status - In Progress',
        completed: 'Summary Invoice Document Status - Completed',
      },
      billingReminder: {
        all: 'Summary Billing Reminder',
        Draft: 'Summary Billing Reminder - Draft',
        Approval: 'Summary Billing Reminder - Approval',
        'In Progress': 'Summary Billing Reminder - In Progress',
        Sent: 'Summary Thanks Letter - Sent',
        Failed: 'Summary Billing Reminder - Failed',
        Reject: 'Summary Billing Reminder - Reject',
      },
      thanksLetter: {
        all: 'Summary Thanks Letter',
        'In Progress': 'Summary Thanks Letter - In Progress',
        Sent: 'Summary Thanks Letter - Sent',
        Failed: 'Summary Thanks Letter - Failed',
      },
    }[type][subType] || '';

  const filter = useMemo(() => {
    const filters = [];

    if (subType === 'all') {
      filters.push({
        onChange: setFilterStatus,
        value: filterStatus,
        options: {
          invoice: [
            { label: 'All Status', value: '' },
            { label: 'Requested', value: 'INITIAL' },
            { label: 'In Progress', value: 'INPROGRESS' },
            { label: 'Completed', value: 'FINISH' },
          ],
          billingReminder: [
            { label: 'All Status', value: '' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Approval', value: 'Approval' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Sent', value: 'Sent' },
            { label: 'Failed', value: 'Failed' },
            { label: 'Reject', value: 'Reject' },
          ],
          thanksLetter: [
            { label: 'All Status', value: '' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Sent', value: 'Sent' },
            { label: 'Failed', value: 'Failed' },
          ],
        }[type],
        type: 'dropdown',
        label: '',
      });
    }

    return filters;
  }, [type, subType, filterStatus]);

  const tableData = useMemo(() => {
    if (type === 'invoice') {
      return list.data.map((d) => ({
        ...d,
        status:
          {
            INPROGRESS: 'IN PROGRESS',
            INITIAL: 'REQUESTED',
            FINISH: 'INVOICE COMPLETED',
          }[d?.status || d.docStage] || d.docStage,
      }));
    }

    return list.data;
  }, [list.data, filterStatus]);

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      keepMounted={false}
      maxWidth="lg"
      open={open}
      PaperProps={{
        id: testLocator?.id,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          {title}
        </Typography>
      </Box>
      <Box>
        <List
          noMargin
          noPadding
          filter={filter}
          search={{
            noBorder: true,
            placeholder: 'Search Invoice..',
            value: search,
            onChange: setSearch,
            id: testLocator?.search,
          }}
          table={{
            schema: tableSchema({ type }),
            maxHeight: 330,
            data: tableData,
            // onBottomPage: onLoadMore,
            onPaginationChange: onPaginationChange,
            page: page,
            loadingRoot: loadingTable,
            loading: false,
            meta: list.meta,
            id: testLocator?.table,
          }}
          withTopDivider={false}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 16, justifyContent: 'center', mt: 4 }}>
        <Button onClick={onClose} variant="ghost" id={testLocator?.close}>
          CLOSE
        </Button>
        <Button onClick={onDownload} id={testLocator?.download}>
          DOWNLOAD
        </Button>
      </Box>
    </Dialog>
  );
};

export default PopUpList;
