import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '../../../../fragments/List';
import useActions from './hooks/useActions';
import Reload from '../../../../assets/icon-v2/Reload';
import { statusFilter, tableHeader } from './constant';
import Button from '../../../../components/Button';
import Dialog from '../../../../__old/components/elements/Dialog';
import TicketNumberForm from '../../../../__old/components/forms/TicketNumber';
import ConfirmationDialog from '../../../../__old/components/elements/ConfirmationDialog';

const NeucloudList = (props) => {
  const {
    openFormTicketNumber,
    updateTicketNumber,
    list,
    loading,
    onBottomPage,
    onClickRowTable,
    handleFormTicketNumber,
    clearConfirmation,
    handleRefresh,
    onClickDownload,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
    confirmation,
    setConfirmation,
    sort,
    setSort,
    orderBy,
    setOrderBy,
  } = useActions(props);

  const tableList = list.data.map((item) => ({
    ...item,
    ticketId:
      item.ticketId !== '' ? (
        item.ticketId
      ) : (
        <Button
          children="Add Ticket Number"
          onClick={(e) => {
            handleFormTicketNumber(item.referenceId);
            e.stopPropagation();
          }}
          variant="ghost"
        />
      ),
    status: normalizeStatus(item.status),
  }));

  function normalizeStatus(status) {
    switch (status) {
      case 'completed':
        return 'closed';
      case 'onprogress':
        return 'on progress';
      default:
        return status;
    }
  }

  const action = () => {
    let button = [];
    button.push({
      onClick: handleRefresh,
      children: 'Refresh',
      loading: loading.tableRoot,
      leftIcon: Reload,
    });

    button.push({
      onClick: onClickDownload,
      children: 'Download',
      loading: loading.download,
    });

    return button;
  };

  const filter = () => {
    let filters = [];

    filters.push({
      maxWidth: 300,
      onChange: setFilterStatus,
      options: statusFilter,
      type: 'dropdown',
      value: filterStatus,
    });
    return filters;
  };

  const listProps = {
    breadcrumb: [{ label: 'Neucloud' }],
    onBottomPage: onBottomPage,
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Ticket Number..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      onClickRow: onClickRowTable,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      schema: tableHeader,
    },
  };

  const renderFormTicketNumber = () => {
    return (
      <Dialog
        maxWidth="xs"
        onClose={handleFormTicketNumber}
        open={openFormTicketNumber.open}
      >
        <TicketNumberForm
          clearConfirmation={clearConfirmation}
          maxLength={10}
          onClose={handleFormTicketNumber}
          onSubmit={updateTicketNumber}
          setConfirmation={setConfirmation}
          {...openFormTicketNumber}
        />
      </Dialog>
    );
  };

  return (
    <Fragment>
      <List {...listProps} />
      <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
      {renderFormTicketNumber()}
    </Fragment>
  );
};

NeucloudList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default NeucloudList;
