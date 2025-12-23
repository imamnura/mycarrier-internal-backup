import React from 'react';
import DetailBase from '@fragments/Detail';
import useActions from './hooks/useActions';
import { breadcrumb, handleSchema } from './constant';

const Detail = (props) => {
  const { loading, detailBrochure, editBrochure, confirmDelete } =
    useActions(props);

  const action = () => {
    const id = detailBrochure?.id;
    let actions = [];

    actions.push(
      {
        children: 'Delete',
        noDivider: true,
        loading: loading,
        onClick: () => confirmDelete(id),
        variant: 'ghost',
      },
      {
        // hideDivider: true,
        children: 'Edit',
        disabled: loading,
        loading: loading,
        onClick: () => editBrochure(id),
        variant: 'ghost',
      },
    );

    return actions;
  };

  return (
    <DetailBase
      action={action()}
      breadcrumb={breadcrumb(detailBrochure?.name)}
      loading={loading}
      notFound={!detailBrochure}
      schema={handleSchema(detailBrochure)}
    />
  );
};

export default Detail;
