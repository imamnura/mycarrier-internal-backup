import React from 'react';
import {
  normalizeContentStatus,
  normalizeStatus,
  tableHeader,
} from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import { Box } from '@material-ui/core';

const ListEvents = (props) => {
  const {
    filter,
    list,
    onClickRowTable,
    onUpdateEvents,
    confirmDeleteEvents,
    addEvents,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    button.push({
      onClick: addEvents,
      children: 'ADD CONTENT',
      loading: loadingTable,
    });

    return button;
  };

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.eventsStatus,
      maxwidth: 200,
      type: 'dropdown',
    });
    res.push({
      ...filter.contentStatus,
      maxwidth: 200,
      type: 'dropdown',
    });
    res.push({
      ...filter.dateRange,
      type: 'dateRange',
      label: 'Date Held',
      variant: 'secondary',
    });

    return res;
  };

  const tableList = () => {
    return list.data.map((item) => ({
      ...item,
      status: normalizeContentStatus(item.status),
      eventStatus: normalizeStatus(item.eventStatus),
      operations: (
        <Box
          sx={{
            '& svg': {
              color: '#2E434D',
              cursor: 'pointer',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box id="updateEvents" onClick={(e) => onUpdateEvents(e, item.id)}>
            <EditIcon />
          </Box>
          <Box
            id="deleteEvents"
            onClick={(e) => confirmDeleteEvents(e, item.eventId)}
            style={{ marginLeft: '12px' }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    }));
  };

  const listProps = {
    title: 'Events Management',
    breadcrumb: [{ label: 'Events Management' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Events Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList(),
      hovering: true,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      numbering: true,
      onClickRow: onClickRowTable,
      schema: tableHeader,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

ListEvents.defaultProps = {};

ListEvents.propTypes = {};

export default ListEvents;
