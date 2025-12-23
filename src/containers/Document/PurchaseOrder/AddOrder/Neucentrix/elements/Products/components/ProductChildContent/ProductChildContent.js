import React from 'react';
import PropTypes from 'prop-types';
import useActions from './hooks/useActions';
import DynamicForm from '../DynamicForm';
import useStyles from './styles';
import Button from '@components/Button';
import CustomNoData from '@assets/ilustration-v2/CustomNoData';
import { Text } from '@legion-ui/core';
import ModalProductGrandchildConfig from '../ModalProductGrandchildConfig';
import { IconButton } from '@material-ui/core';
import color from '@styles/color';
import Edit from '@assets/icon-v2/Edit';
import Trash from '@assets/icon-v2/Trash';
import Information from '@components/Information';
import Add from '@assets/icon-v2/Add';

const ProductChildContent = (props) => {
  const { selectedProductChild } = props;

  const classes = useStyles();

  const {
    formProductConfig,
    fieldsProductGrandchild,
    modalProductGrandchildConfig,
    setModalProductGrandchildConfig,
    loading,
    options,
    fieldsAttributes,
  } = useActions(props);

  const renderGrandchild = () => {
    if (fieldsProductGrandchild?.fields?.length > 0) {
      return fieldsProductGrandchild?.fields?.map((field, index) => (
        <div className={classes.cardGrandchildContainer} key={field?.id}>
          <div className={classes.headerWrapper}>
            <Text
              children={field?.productName}
              color="secondary500"
              size="16px"
              height="24px"
              block
              weight={700}
            >
              {field?.productName}
              &nbsp;&nbsp;&nbsp;
              <Text
                children={`Qty: ${field?.qty}`}
                color="secondary500"
                size="14px"
                height="21px"
                weight={400}
              />
            </Text>
            <div className={classes.grandChildAction}>
              <div>
                <IconButton
                  size="small"
                  style={{
                    color: color.yellow.main,
                  }}
                  onClick={() =>
                    setModalProductGrandchildConfig({
                      open: true,
                      index: index,
                      defaultValues: field,
                    })
                  }
                  loading={loading?.productGrandchild}
                  disabled={
                    loading?.productGrandchild ||
                    !options?.productGrandchild?.length
                  }
                >
                  <Edit fontSize="small" />
                </IconButton>
              </div>
              <div>
                <IconButton
                  size="small"
                  style={{
                    color: color.primary.main,
                  }}
                  onClick={() => fieldsProductGrandchild?.remove(index)}
                  loading={loading?.productGrandchild}
                  disabled={
                    loading?.productGrandchild ||
                    !options?.productGrandchild?.length
                  }
                >
                  <Trash fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
          {field?.attributes
            ?.filter((attr) => attr?.attributeValue || attr?.required)
            ?.map((attr, index) => (
              <div key={index}>
                <Information
                  label={attr?.attributeName || '-'}
                  value={attr?.attributeValue || '-'}
                />
              </div>
            ))}
        </div>
      ));
    } else {
      return (
        <>
          <div className={classes.cardGrandchild}>
            <CustomNoData style={{ width: '112', height: 'auto' }} />
            <Text
              children="You need to add Grandchild Product"
              color="secondary500"
              size="16px"
              height="24px"
              weight={700}
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <DynamicForm
        {...props}
        dynamicForm={fieldsAttributes?.fields}
        useForm={formProductConfig}
        filters={{
          inputType: ['combobox', 'textarea', 'textfield'],
        }}
        normalizeFormName={(fieldProps) => {
          const indexSelectedAttribute = fieldsAttributes?.fields?.findIndex(
            (attr) => attr?.attributeName === fieldProps?.attributeName,
          );
          return `child.${selectedProductChild?.index}.attributes.${indexSelectedAttribute}.attributeValue`;
        }}
      />
      {renderGrandchild()}
      <div style={{ flexGrow: 1 }}></div>
      <div className={classes.addProductButton}>
        <Button
          children="add grandCHILD PRODUCT"
          onClick={(e) => {
            setModalProductGrandchildConfig({ open: true });
            e?.currentTarget?.blur();
          }}
          rounded="full"
          loading={loading?.productGrandchild}
          disabled={
            loading?.productGrandchild || !options?.productGrandchild?.length
          }
          variant="soft"
          color="success"
          leftIcon={Add}
        />
      </div>
      <ModalProductGrandchildConfig
        selectedProductChild={selectedProductChild}
        modalProductGrandchildConfig={modalProductGrandchildConfig}
        setModalProductGrandchildConfig={setModalProductGrandchildConfig}
        fieldsProductGrandchild={fieldsProductGrandchild}
        loading={loading}
        options={options}
      />
    </>
  );
};

ProductChildContent.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsProductConfigAccount: [],
  },
};

ProductChildContent.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default ProductChildContent;
