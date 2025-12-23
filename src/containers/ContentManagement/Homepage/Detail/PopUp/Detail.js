import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import { isHaveAccess } from '@utils/common';
import SwitchStatusPopUp from '../../lib/SwitchStatusPopUp';

const PopUpDetail = (props) => {
  const { feature } = props;
  const {
    data,
    loading,
    breadcrumb,
    onClickDelete,
    onClickEdit,
    onClickUpdateStatus,
  } = useAction(props);

  const action = () => {
    let actions = [];

    if (isHaveAccess(feature, 'update_popup_banner')) {
      actions.push({
        custom: (
          <SwitchStatusPopUp
            label="Set to active"
            onClickUpdateStatus={onClickUpdateStatus(data?.id, data?.status)}
            data={data}
          />
        ),
      });
    }
    if (isHaveAccess(feature, 'delete_popup_banner')) {
      actions.push({
        children: 'Delete',
        hideDivider: true,
        leftIcon: Trash,
        ml: 16,
        onClick: onClickDelete,
        variant: 'ghost',
        disabled: data?.status === 'active',
      });
    }
    if (isHaveAccess(feature, 'update_popup_banner')) {
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
          title: 'Pop Up Details',
          properties: {
            data: data,
            schema: [
              { name: 'name', label: 'POP UP NAME' },
              {
                name: 'createdAt',
                label: 'CREATED DATE',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              { name: 'period', label: 'PERIOD', grid: 12 },
              { name: 'link', label: 'ACTION BUTTON LINK', grid: 12 },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Pop Up Image',
          properties: {
            data: data,
            schema: [
              {
                name: 'imageUrl',
                imageType: true,
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <Detail
      action={data && action()}
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={!data}
      schema={detailSchema}
    />
  );
};

export default PopUpDetail;
