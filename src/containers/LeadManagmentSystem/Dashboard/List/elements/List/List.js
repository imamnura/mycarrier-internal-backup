import Typography from '@components/Typography';
import List from '@fragments/List';
import { Box } from '@material-ui/core';
import { isHaveAccess } from '@utils/common';
import { dropdownValueParser } from '@utils/common';
import React, { useEffect, useMemo } from 'react';
import useAction from './hooks/useAction';
import { optionStatus } from './constant';
import {
  maskLeadStatus,
  schemaLeadStatus,
} from '@containers/LeadManagmentSystem/Dashboard/utils';

const ListLead = (props) => {
  const {
    feature,
    filterDateSubmit,
    filterLastContacted,
    filterLastUpdate,
    filterSource,
    filterStatus,
    list,
    onClickRowTable,
    optionSource,
    search,
    setFilterDateSubmit,
    setFilterLastContacted,
    setFilterLastUpdate,
    setFilterSource,
    setFilterStatus,
    setSearch,
    setTab,
    tab,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterDateSubmit,
      label: 'Date Submit',
      type: 'dateRange',
      value: filterDateSubmit,
      variant: 'secondary',
    });

    if (['leadValid', 'leadInvalid', 'dispatchLead'].includes(tab)) {
      filters.push({
        onChange: setFilterLastUpdate,
        label: 'Last Update',
        type: 'dateRange',
        value: filterLastUpdate,
        variant: 'secondary',
      });

      if (tab === 'leadValid') {
        filters.push({
          onChange: setFilterStatus,
          options: optionStatus,
          type: 'dropdown',
          value: dropdownValueParser(filterStatus, optionStatus),
        });

        filters.push({
          onChange: setFilterLastContacted,
          label: 'Last Contacted',
          type: 'dateRange',
          value: filterLastContacted,
          variant: 'secondary',
        });
      }
    }

    filters.push({
      onChange: setFilterSource,
      options: optionSource,
      type: 'dropdown',
      value: dropdownValueParser(filterSource, optionSource),
    });

    return filters;
  };

  const tableSchema = useMemo(() => {
    return [
      {
        cellStyle: {
          minWidth: 240,
        },
        label: 'COMPANY NAME',
        name: 'companyName',
      },
      {
        cellStyle: {
          minWidth: 180,
          width: 180,
        },
        label: 'CONTACT PERSON',
        name: 'contactPerson',
      },
      {
        cellStyle: {
          minWidth: 160,
          width: 160,
        },
        label: 'PRODUCT',
        name: 'productName',
      },
      {
        cellStyle: {
          minWidth: 240,
          width: 240,
        },
        label: 'SOURCE',
        name: 'source',
      },
      // {
      //   cellStyle: {
      //     minWidth: 240,
      //     width: 240
      //   },
      //   label: 'PLACEMENT',
      //   name: 'placement'
      // },
      {
        cellStyle: {
          minWidth: 180,
          width: 180,
        },
        formatDate: 'full-string-date',
        label: 'LAST CONTACTED',
        name: 'lastContacted',
      },
      {
        cellStyle: {
          minWidth: 180,
          width: 180,
        },
        formatDate: 'full-string-date',
        label: 'LAST UPDATE',
        name: 'updatedAt',
      },
      {
        cellStyle: {
          minWidth: 180,
          width: 180,
        },
        formatDate: 'full-string-date',
        label: 'DATE SUBMIT',
        name: 'createdAt',
      },
      {
        cellStyle: {
          minWidth: 180,
          width: 180,
        },
        label: 'STATUS SALES STAGE',
        name: 'statusSalesStage',
        schemaStatus: schemaLeadStatus,
      },
    ].filter(({ name }) => {
      if (name === 'lastContacted' || name === 'statusSalesStage') {
        return tab === 'leadValid';
      } else if (name === 'updatedAt') {
        return tab !== 'needValidation';
      } else if (name === 'dateSubmit') {
        return tab === 'needValidation';
      } else {
        return true;
      }
    });
  }, [tab]);

  const tableData = useMemo(() => {
    return list.data.map((d) => ({
      ...d,
      companyName: (
        <Box>
          <Typography>{d.companyName}</Typography>
          <Box mt={1}>
            <Typography color="general-mid" inline variant="caption">
              #{d.interestId}
            </Typography>
          </Box>
        </Box>
      ),
      source: <Box sx={{ wordBreak: 'break-all' }}>{d.source || '-'}</Box>,
      // placement: (
      //   <Box sx={{ wordBreak: 'break-all' }}>
      //     {d.placement || '-'}
      //   </Box>
      // ),
      statusSalesStage: maskLeadStatus(d?.status),
    }));
  }, [list.data]);

  const optionTab = () => {
    let tabs = [];

    if (isHaveAccess(feature, 'read_list_need_validation_lead'))
      tabs.push({ label: 'Need Validation', value: 'needValidation' });
    if (isHaveAccess(feature, 'read_list_valid_lead'))
      tabs.push({ label: 'Lead Valid', value: 'leadValid' });
    if (isHaveAccess(feature, 'read_list_invalid_lead'))
      tabs.push({ label: 'Lead Invalid', value: 'leadInvalid' });
    if (isHaveAccess(feature, 'read_list_dispatch_lead'))
      tabs.push({ label: 'Dispatch Lead', value: 'dispatchLead' });

    return tabs;
  };

  useEffect(() => {
    if (!tab && optionTab().length) {
      setTab(optionTab()[0]?.value);
    }
  }, [JSON.stringify(optionTab()), tab]);

  const listProps = {
    title: 'Lead Management System',
    filter: filter(),
    search: {
      placeholder: 'Search Company Name..',
      value: search,
      onChange: setSearch,
    },
    tabs: {
      options: optionTab(),
      value: tab,
      onChange: setTab,
    },
    table: {
      // numbering: false,
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableSchema,
      onPaginationChange: onPaginationChange,
    },
  };
  return <List {...listProps} />;
};

export default ListLead;
