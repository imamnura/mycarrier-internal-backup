import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';

const AmMappingList = (props) => {
  const { feature } = props;

  const {
    list,
    loading,
    filterCustomer,
    filterCustomerOptions,
    filterStatus,
    clearConfirmation,
    onClickAdd,
    onClickDownload,
    onClickRowTable,
    setFilterStatus,
    setFilterCustomer,
    confirmation,
    // setConfirmation,
    search,
    setSearch,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const actionButton = () => {
    let button = [];
    button.push({
      onClick: onClickDownload,
      children: 'Download',
      loading: loading.download,
    });

    if (isHaveAccess(feature, 'create_amMapping')) {
      button.push({ children: 'ADD NEW MAPPING', onClick: onClickAdd });
    }
    return button;
  };

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Unhandled', value: 'unhandled' },
        { label: 'Handled', value: 'handled' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    filters.push({
      isLoading: loading.filterCustomer,
      isSearchable: true,
      maxWidth: 200,
      onChange: setFilterCustomer,
      options: filterCustomerOptions,
      type: 'dropdown',
      value: filterCustomer,
    });

    return filters;
  };

  // const tableData = list.data.map((item) => ({
  //   ...item,
  //   name: item.metaData.fullName,
  //   nik: item.metaData.nik,
  //   segment: item.metaData.segment,
  //   corporateClientName:
  //     item?.metaData?.ccHandled ?
  //       item?.metaData?.ccHandled[0]?.corporateClientName :
  //       null,
  //   bpNumber: item?.metaData?.bpNumber || null,
  //   product: item?.metaData?.product || null,
  // }));

  const listProps = {
    title: 'Account Manager Mapping',
    breadcrumb: [{ label: 'Account Manager Mapping' }],
    action: actionButton(),
    filter: filter(),
    search: {
      placeholder: 'Search Customer or CA Number...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      onPaginationChange: onPaginationChange,
      schema: tableHeader,
    },
  };

  return (
    <Fragment>
      <List {...listProps} />
      <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
    </Fragment>
  );
};

AmMappingList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default AmMappingList;
