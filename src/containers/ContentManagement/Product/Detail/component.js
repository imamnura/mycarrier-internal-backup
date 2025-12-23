import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useRouter } from 'next/router';
import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import Detail from '@fragments/Detail';
import ProductTree from './Elements/ProductTree';
import useActions from './hooks/useActions';
import { breadcrumb, productTypeList, handleSchema } from './utils';
import { isHaveAccess } from '@utils/common';
import ModalChooseProduct from '../Fragment/ModalChooseProduct/ChooseProduct';
import PreviewPage from './Elements/PreviewPage';

export default function Component(props) {
  const { feature } = props;
  const {
    query: { id },
  } = useRouter();
  const {
    choosedContent,
    setChoosedContent,
    clearConfirmation,
    confirmation,
    detail,
    handleOpenSubDetail,
    handleSpecialPage,
    isLoading,
    onAddPage,
    onChangeDisplay,
    onDelete,
    onEdit,
    addProduct,
    onCloseDialog,
    openDialog,
    levelDetail,
    stepDetail,
    openPreviewState,
  } = useActions({ id, feature });

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
        onClick: () => onDelete({ id }),
        variant: 'ghost',
      });
    }
    if (isHaveAccess(feature, 'update_product')) {
      actions.push({
        children: 'EDIT',
        onClick: () => onEdit('l0', id),
        variant: 'ghost',
      });
    }

    return actions;
  };

  const productTree = (
    <ProductTree
      data={detail}
      handleOpenSubDetail={handleOpenSubDetail}
      handleSpecialPage={handleSpecialPage}
      onAddPage={onAddPage}
      onChangeDisplay={onChangeDisplay}
      onDelete={onDelete}
    />
  );

  return (
    <div>
      <Detail
        action={action()}
        breadcrumb={breadcrumb(detail.name)}
        loading={isLoading}
        notFound={!detail?.catId || _.isEmpty(detail)}
        schema={handleSchema(detail, productTree)}
      />
      <ModalChooseProduct
        choosedContent={choosedContent}
        data={productTypeList}
        onClose={onCloseDialog}
        onSubmit={addProduct}
        open={openDialog}
        setChoosedContent={setChoosedContent}
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
