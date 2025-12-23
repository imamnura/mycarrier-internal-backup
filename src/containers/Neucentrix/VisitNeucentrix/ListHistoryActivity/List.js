import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { dateFormat } from '@utils/parser';
import { route } from '@configs';
import useActions from './hooks/useActions';
import { pickStatus } from './utils';

const VisitNeucentrix = (props) => {
  const {
    visitId,
    filterVisitor,
    list,
    loading,
    onBottomPage,
    search,
    setFilterVisitor,
    setSearch,
    optionsVisitor,
    isLoadingVisitor,
  } = useActions(props);

  const breadcrumb = [
    { label: 'Visiting', url: route.visitNcx('list') },
    { label: visitId, url: route.visitNcx('detail', visitId) },
    { label: 'View All Activities' },
  ];

  const tableData = list?.historyActivity?.map((data) => {
    const { date, activity } = data;

    const pickActivity = {
      CHECKIN: 'Check In',
      CHECKOUT: 'Check Out',
      VISITING: 'Visiting',
    }[activity];

    return {
      ...data,
      date: dateFormat({ date: date, type: 'date-time' }),
      activity: pickActivity,
    };
  });

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterVisitor,
      options: optionsVisitor,
      type: 'dropdown',
      value: filterVisitor,
      isLoading: isLoadingVisitor,
    });

    return filters;
  };

  const listProps = {
    breadcrumb: breadcrumb,
    onBottomPage: onBottomPage,
    filter: filter(),
    search: {
      placeholder: 'Search Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      numbering: false,
      schema: [
        {
          cellStyle: {
            minWidth: 100,
            width: 180,
          },
          label: 'Date',
          name: 'date',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Name',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Activity',
          name: 'activity',
        },
      ],
    },
    status: pickStatus[list?.status],
  };

  return <List {...listProps} />;
};

VisitNeucentrix.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default VisitNeucentrix;
