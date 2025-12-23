import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import { Box } from '@material-ui/core';
import useAction from './hooks/useActions';
import CustomerInfo from './lib/CustomerInfo';
import ProductAndService from './lib/ProductAndService';
import DynamicForm from './lib/DynamicForm';
import ModalProduct from './lib/ModalProduct/ModalProduct';
import BaseForm from '@components/Form/UpdateStatus';

const Create = (props) => {
  const {
    action,
    breadcrumb,
    fieldsProducts,
    formPO,
    watchProducts,
    watchCustomer,
    modalProduct,
    setModalProduct,
    onClickSubmit,
    modalUpdateStatus,
    setModalUpdateStatus,
  } = useAction(props);

  const formRender = () => (
    <>
      <Box mt={2}>
        <CustomerInfo {...props} useForm={formPO} />
      </Box>
      <Box mt={2}>
        <ProductAndService
          {...props}
          products={watchProducts}
          fieldsProducts={fieldsProducts}
          setModalProduct={setModalProduct}
        />
      </Box>
      <Box mt={2}>
        <DynamicForm
          {...props}
          useForm={formPO}
          customer={watchCustomer}
          products={watchProducts}
          filters={{
            formtype: [
              'Text Field',
              'Text Area',
              'Dropdown',
              'Upload File',
              'Upload BAKES',
            ],
            isSpecialRequireField: false,
          }}
        />
      </Box>
    </>
  );
  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'Purchase Order - New Order',
          render: formRender(),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={false}
        notFound={false}
        schema={detailSchema}
      />
      <ModalProduct
        fieldsProducts={fieldsProducts}
        modalProduct={modalProduct}
        setModalProduct={setModalProduct}
        customer={watchCustomer}
      />
      <BaseForm
        content={modalUpdateStatus}
        fetchUpdateStatus={onClickSubmit}
        setContent={setModalUpdateStatus}
      />
    </>
  );
};

Create.defaultProps = {
  feature: [],
};

Create.propTypes = {
  feature: PropTypes.array,
};

export default Create;
