// import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import { breadcrumb, normalizeDetail } from './constant';
import PreviewPrivilege from './elements/PreviewPrivilege';
import useAction from './hooks/useAction';

const DetailPrivilege = (props) => {
  const { isLoading, data, onDelete, onEdit, previewPrivilege } =
    useAction(props);

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

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Privilege Profile',
          properties: {
            data: normalizeDetail(data),
            schema: [
              { name: 'journeyId', label: 'Id Privilege', grid: 6 },
              { name: 'journey', label: 'Privilege Name', grid: 6 },
              { name: 'categories', label: 'Category', grid: 12 },
              { name: 'type', label: 'Type', grid: 12 },
              { name: 'updatedAt', label: 'Last Update', grid: 12 },
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
          render: <PreviewPrivilege {...previewPrivilege} />,
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb(data?.journey)}
        loading={isLoading}
        notFound={!data}
        schema={detailSchema}
      />
    </>
  );
};

DetailPrivilege.defaultProps = {};

DetailPrivilege.propTypes = {};

export default DetailPrivilege;
