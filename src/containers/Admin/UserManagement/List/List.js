import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';
import { maskUserType } from './utils';
import DownloadForm from '@components/Form/DownloadForm/DownloadForm';

const UserManagmenentList = (props) => {
  const {
    feature,
    filterStatus,
    list,
    onClickAddUser,
    onClickRowTable,
    search,
    setFilterStatus,
    setSearch,
    setFilterRoleType,
    setFilterSegment,
    setFilterUserType,
    filterRoleType,
    filterSegment,
    filterUserType,
    optionsFilter,
    formDownload,
    setFormDownload,
    onSubmitDownload,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'create_user')) {
      actions.push({ children: 'ADD USER', onClick: onClickAddUser });
    }

    if (isHaveAccess(feature, 'read_download_user')) {
      actions.push({ children: 'DOWNLOAD', onClick: setFormDownload(true) });
    }

    return actions;
  };

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'Checking', value: 'Checking' },
        { label: 'Requested', value: 'Requested' },
        { label: 'Registered', value: 'Registered' },
        { label: 'Active', value: 'Active' },
        { label: 'Disabled', value: 'Non_active' },
        { label: 'Returned', value: 'Returned' },
        { label: 'Rejected', value: 'Rejected' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    filters.push({
      onChange: setFilterSegment,
      options: [{ label: 'All Segment', value: '' }, ...optionsFilter.segment],
      type: 'dropdown',
      value: filterSegment,
    });

    filters.push({
      onChange: setFilterRoleType,
      options: [
        { label: 'All Role Type', value: '' },
        ...optionsFilter.roleType,
      ],
      type: 'dropdown',
      value: filterRoleType,
    });

    filters.push({
      onChange: setFilterUserType,
      options: [
        { label: 'All User Type', value: '' },
        { label: 'Customer', value: 'customer' },
        { label: 'Internal Staff', value: 'internal_staff' },
        { label: 'Internal Non Staff', value: 'internal_non_staff' },
      ],
      type: 'dropdown',
      value: filterUserType,
    });

    return filters;
  };

  const tableData = useMemo(
    () =>
      (list.data &&
        list.data.map((d) => ({
          ...d,
          metaData: {
            ...d.metaData,
            status:
              d?.metaData?.status === 'Non_active'
                ? 'Disabled'
                : d?.metaData?.status,
          },
        }))) ||
      [],

    [list.data],
  );

  const listProps = {
    title: 'User Management',
    breadcrumb: [{ label: 'User Management' }],
    action: action(),
    filter: filter(),
    search: {
      placeholder: 'Search Company Name, Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      onPaginationChange: onPaginationChange,
      schema: [
        {
          cellStyle: {
            minWidth: 170,
          },
          label: 'ID USER',
          name: 'userId',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'NAME',
          name: 'metaData.fullName',
        },
        {
          cellStyle: {
            minWidth: 130,
          },
          label: 'EMAIL',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'COMPANY',
          name: 'metaData.customerAccountName',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'USER TYPE',
          name: 'metaData.userType',
          converter: maskUserType,
        },
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'ROLE TYPE',
          name: 'metaData.role.roleName',
        },
        {
          cellStyle: {
            minWidth: 140,
          },
          label: 'STATUS',
          name: 'metaData.status',
          schemaStatus: {
            Checking: 'primary',
            Requested: 'warning',
            Registered: 'success',
            Active: 'success',
            Disabled: 'orange',
            Returned: 'danger',
            Rejected: 'danger',
          },
          tooltip: {
            Checking: 'Account has been checking by Account Manager',
            Requested: 'Account has forwarded to WDM',
            Registered:
              'Account created successfully, customer has receive activation link via email',
            Active: 'Account has been Active',
            Disabled: 'Account has deactivated by WDM',
            Returned: 'Account has been returned',
            Rejected:
              'Request has rejected by WDM, customer will receive this notification',
          },
        },
      ],
    },
  };

  return (
    <>
      <List {...listProps} />
      <DownloadForm
        onClose={setFormDownload(false)}
        onSubmit={onSubmitDownload}
        open={formDownload}
      />
    </>
  );
};

UserManagmenentList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default UserManagmenentList;
