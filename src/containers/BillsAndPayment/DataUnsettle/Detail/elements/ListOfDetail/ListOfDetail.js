import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useAction from './hooks/useAction';
import { dropdownValueParser } from '@utils/common';
import {
  filterMonthOptions,
  filterYearOptions,
} from '@containers/BillsAndPayment/DataUnsettle/List/utils';

const ListOfDetail = (props) => {
  const {
    filterAging,
    // filterDate,
    filterIddb,
    list,
    loading,
    search,
    setFilterAging,
    // setFilterDate,
    setFilterIddb,
    setSearch,
    useOrderBy,
    useSort,
    filterMonth,
    filterYear,
    setFilterMonth,
    setFilterYear,
  } = useAction(props);

  const tableData = list.map((data) => {
    return {
      ...data,
      total: new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(
        data.total,
      ),
      periode:
        {
          1: '0-6 Bulan',
          2: '7-12 Bulan',
          3: '13-24 Bulan',
          4: '>24 Bulan',
        }[data.periode] || null,
    };
  });

  const filter = () => {
    let filters = [];

    const optionsFilterAging = [
      { label: 'All Aging', value: '' },
      { label: '0-6 Bulan', value: '1' },
      { label: '7-12 Bulan', value: '2' },
      { label: '13-24 Bulan', value: '3' },
      { label: '>24 Bulan', value: '4' },
    ];

    filters.push({
      onChange: setFilterAging,
      options: optionsFilterAging,
      type: 'dropdown',
      value: dropdownValueParser(filterAging, optionsFilterAging),
    });

    const optionsFilterIddb = [
      { label: 'All IDDB', value: '' },
      { label: 'Adjustment', value: 'adjustment' },
      { label: 'Billing', value: 'billing' },
    ];

    filters.push({
      onChange: setFilterIddb,
      options: optionsFilterIddb,
      type: 'dropdown',
      value: dropdownValueParser(filterIddb, optionsFilterIddb),
    });

    // filters.push({
    //   onChange: setFilterDate,
    //   type: 'date',
    //   label: 'Cut Off Period',
    //   value: filterDate
    // });

    filters.push(
      {
        type: 'dropdown',
        options: filterYearOptions(),
        value: filterYear,
        onChange: setFilterYear,
      },
      {
        type: 'dropdown',
        options: filterMonthOptions,
        value: filterMonth,
        onChange: setFilterMonth,
      },
    );

    return filters;
  };

  const listProps = {
    noMargin: true,
    noPadding: true,
    filter: filter(),
    search: {
      placeholder: 'Search..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading,
      useOrderBy: useOrderBy,
      useOrderDirection: useSort,
      meta: {
        page: 1,
        totalData: list.length,
        size: list.length,
      },
      schema: [
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'Customer Number',
          name: 'bpNumber',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 278,
          },
          label: 'Customer',
          name: 'custName',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 80,
            width: 80,
          },
          label: 'Currency',
          name: 'currency',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 124,
            width: 124,
          },
          label: 'Total',
          name: 'total',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'GL ACCOUNT',
          name: 'glAccount',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'INVOICE GROUP',
          name: 'invoiceGroup',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 320,
            width: 320,
          },
          label: 'GL DESCRIPTION',
          name: 'glDesc',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'SERVICE ACC',
          name: 'serviceAcc',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'DOC PERIOD',
          name: 'docPeriod',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'POST PERIOD',
          name: 'postPeriod',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'USG PERIOD',
          name: 'usgPeriod',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'IDDB',
          name: 'iddb',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 80,
            width: 80,
          },
          label: 'SEGMENT',
          name: 'segment',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'NIK AM',
          name: 'nikAM',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 278,
            width: 278,
          },
          label: 'NAME AM',
          name: 'nameAM',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'MOBILE AM',
          name: 'mobileAM',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'EMAIL AM',
          name: 'emailAM',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 128,
            width: 128,
          },
          label: 'AGING',
          name: 'periode',
          sort: true,
        },
      ],
    },
  };

  return <List {...listProps} />;
};

ListOfDetail.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ListOfDetail;
