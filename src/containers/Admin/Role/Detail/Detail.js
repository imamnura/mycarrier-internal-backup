import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useAction';
import { dateFormatConverter } from '@utils/converter';
import PreviewPrivilege from './elements/PreviewPrivilege';

const DetailRole = (props) => {
  const { data, isLoading, onDelete, onEdit } = useAction(props);

  const action = () => {
    let actions = [];

    actions.push(
      {
        children: 'Delete',
        onClick: onDelete,
        variant: 'ghost',
      },
      {
        children: 'Edit',
        onClick: onEdit,
      },
    );

    return actions;
  };

  const breadcrumb = (roleName) => [
    { label: 'Role Management', url: '/role-management' },
    { label: roleName },
  ];

  const previewPrivilege = {
    data: data?.privileges,
    isDisabled: true,
    isLabelActive: true,
    previewFrom: 'journey',
  };

  const detailSchema = (data) => {
    const schema = [
      {
        gridProps: { xs: 12, md: 6 },
        content: [
          {
            type: 'information',
            title: 'Role Profile',
            properties: {
              data: data,
              schema: [
                { name: 'roleId', label: 'Id Role', grid: 12 },
                { name: 'roleName', label: 'Role Name', grid: 12 },
                { name: 'type', label: 'User Type', grid: 12 },
                {
                  name: 'updatedAt',
                  label: 'Last Update',
                  grid: 12,
                  converter: dateFormatConverter({
                    type: 'date-month-year-time',
                    empty: '-',
                  }),
                },
              ],
            },
          },
        ],
      },
      {
        gridProps: { xs: 12, md: 12 },
        content: [
          {
            type: 'custom',
            title: 'Preview Privilege',
            render: Object.keys(data).length > 0 && (
              <PreviewPrivilege {...previewPrivilege} />
            ),
          },
        ],
      },
    ];

    return schema;
  };

  return (
    <Detail
      action={action()}
      breadcrumb={breadcrumb(data?.roleName)}
      loading={isLoading}
      notFound={!data}
      schema={detailSchema(data)}
    />
  );
};

DetailRole.defaultProps = {
  feature: [],
};

DetailRole.propTypes = {
  feature: PropTypes.array,
};

export default DetailRole;
