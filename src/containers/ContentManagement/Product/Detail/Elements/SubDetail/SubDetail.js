import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useRouter } from 'next/router';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Detail from '@fragments/Detail';
import useActions from '../../hooks/useActions';
import { isHaveAccess } from '@utils/common';
import { schema, breadcrumb } from './utils';
import PreviewPage from '../PreviewPage';

export default function Component(props) {
  const { feature } = props;
  const {
    pathname,
    query: { id, params },
  } = useRouter();
  const [level, setLevel] = useState('l2');

  const {
    clearConfirmation,
    confirmation,
    detail,
    isLoading,
    onDelete,
    onEdit,
    levelDetail,
    stepDetail,
    openPreviewState,
  } = useActions({ id: params, feature });

  const { name, category = [], catId } = detail;

  useEffect(() => {
    pathname.includes('level1') && setLevel('l1');
  }, []);

  const action = () => {
    let actions = [];

    actions.push({
      children: 'PREVIEW PAGE',
      onClick: () => openPreviewState.setOpenPreview(true),
      variant: 'ghost',
    });
    if (isHaveAccess(feature, 'delete_product')) {
      actions.push({
        children: 'DELETE',
        onClick: () =>
          onDelete({ id: params, parentId: id, level, fromChild: true }),
        variant: 'ghost',
      });
    }
    if (isHaveAccess(feature, 'update_product')) {
      actions.push({
        children: 'EDIT',
        onClick: () => onEdit(level, params),
        variant: 'ghost',
      });
    }

    return actions;
  };

  return (
    <div>
      <Detail
        action={action()}
        breadcrumb={breadcrumb(name, category[0]?.title, id)}
        loading={isLoading}
        notFound={!catId || _.isEmpty(detail)}
        schema={schema(detail)}
      />
      <ConfirmationDialog
        {...confirmation}
        onClose={() => clearConfirmation()}
      />
      {Object.keys(detail).length > 0 && (
        <PreviewPage
          data={detail}
          levelDetail={levelDetail}
          openPreviewState={openPreviewState}
          stepDetail={stepDetail}
        />
      )}
    </div>
  );
}

Component.defaultProps = {
  feature: [],
  match: {},
};

Component.propTypes = {
  feature: PropTypes.array,
  match: PropTypes.object,
};
