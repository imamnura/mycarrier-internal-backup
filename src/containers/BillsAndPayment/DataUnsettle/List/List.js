import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useAction from './hooks/useAction';
import { convertToRupiah } from '@utils/text';
import { dropdownValueParser } from '@utils/common';
import { filterMonthOptions, filterYearOptions } from './utils';

const DataUnsettle = (props) => {
  const {
    // filterDate,
    filterSegment,
    list,
    loadingTable,
    onClickRowTable,
    onDownload,
    search,
    // setFilterDate,
    setFilterSegment,
    setSearch,
    useOrderBy,
    useSort,
    filterMonth,
    filterYear,
    setFilterMonth,
    setFilterYear,
    privilegesDownload,
  } = useAction(props);

  const action = privilegesDownload && [
    { children: 'Download', onClick: onDownload },
  ];

  const filter = () => {
    let filters = [];

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

    const optionsFilterSegment = [
      { label: 'All Segment', value: '' },
      { label: 'AMS', value: 'AMS' },
      { label: 'BMS', value: 'BMS' },
      { label: 'CSOLO', value: 'CSOLO' },
      { label: 'CUG', value: 'CUG' },
      { label: 'VCS', value: 'VCS' },
      { label: 'X_NEW_CUSTOMER', value: 'X_NEW_CUSTOMER' },
      { label: 'X_UNDEFINED', value: 'X_UNDEFINED' },
    ];

    filters.push({
      onChange: setFilterSegment,
      options: optionsFilterSegment,
      type: 'dropdown',
      value: dropdownValueParser(filterSegment, optionsFilterSegment),
    });
    return filters;
  };

  const tableData = list.map((data) => {
    return {
      ...data,
      periode1: convertToRupiah(data.periode1),
      periode2: convertToRupiah(data.periode2),
      periode3: convertToRupiah(data.periode3),
      periode4: convertToRupiah(data.periode4),
      total: convertToRupiah(data.total),
    };
  });

  const listProps = {
    title: 'Data Unsettle',
    action: action,
    breadcrumb: [{ label: 'Data Unsettle' }],
    filter: filter(),
    search: {
      placeholder: 'Search..',
      value: search,
      onChange: setSearch,
    },
    table: {
      useOrderBy: useOrderBy,
      useOrderDirection: useSort,
      data: tableData,
      loadingRoot: loadingTable,
      meta: {
        page: 1,
        totalData: list.length,
        size: list.length > 0 ? list.length : 10,
      },
      onClickRow: onClickRowTable,
      onPaginationChange: () => {},
      page: 1,
      schema: [
        {
          cellStyle: {
            minWidth: 250,
          },
          label: 'SEGMENT',
          name: 'segment',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          label: 'INVOICE GROUP',
          name: 'invoiceGroup',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: '0-6 BULAN',
          name: 'periode1',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: '7-12 BULAN',
          name: 'periode2',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: '13-24 BULAN',
          name: 'periode3',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: '>24 BULAN',
          name: 'periode4',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'TOTAL',
          name: 'total',
        },
      ],
    },
  };

  return <List {...listProps} />;
};

DataUnsettle.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default DataUnsettle;
