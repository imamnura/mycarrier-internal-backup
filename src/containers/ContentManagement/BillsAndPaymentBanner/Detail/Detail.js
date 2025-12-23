import React from 'react';
import PropTypes from 'prop-types';
import DetailBase from '@fragments/Detail';
import useActions from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { isHaveAccess } from '@utils/common';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';

const Detail = (props) => {
  const { feature } = props;
  const { data, isLoading, breadcrumb, onClickDelete, onClickEdit } =
    useActions(props);

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'delete_bills_&_payment_banner')) {
      actions.push({
        children: 'Delete',
        hideDivider: true,
        leftIcon: Trash,
        ml: 16,
        onClick: onClickDelete,
        variant: 'ghost',
      });
    }
    if (isHaveAccess(feature, 'update_bills_&_payment_banner')) {
      actions.push({
        children: 'Edit',
        hideDivider: true,
        leftIcon: Edit,
        ml: 16,
        onClick: onClickEdit,
        variant: 'ghost',
      });
    }

    return actions;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Banner Detail',
          properties: {
            data: data,
            schema: [
              { name: 'bannerId', label: 'BANNER ID' },
              {
                name: 'createdAt',
                label: 'DATE UPLOADED',
                converter: dateFormatConverter({
                  type: 'date-month-year-time',
                  empty: '-',
                }),
              },
              {
                name: 'updatedAt',
                label: 'LAST UPDATE',
                grid: 12,
                converter: dateFormatConverter({
                  type: 'date-month-year-time',
                  empty: '-',
                }),
              },
              { name: 'title', label: 'TITLE', grid: 12 },
              { name: 'bannerDesc', label: 'DESCRIPTION', grid: 12 },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Uploaded Image',
          properties: {
            data: data,
            schema: [
              {
                name: 'imageBanner',
                attachmentProps: {
                  previewCentered: true,
                },
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <DetailBase
      action={data && action()}
      breadcrumb={breadcrumb(data?.title)}
      loading={isLoading}
      notFound={!data}
      schema={detailSchema}
    />
  );
};

Detail.defaultProps = {};

Detail.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default Detail;
