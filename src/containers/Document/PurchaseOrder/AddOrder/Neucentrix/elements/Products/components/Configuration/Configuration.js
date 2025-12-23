import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import useStyles from './styles';
import { Text } from '@legion-ui/core';
import useActions from './hooks/useActions';
import Trash from '@assets/icon-v2/Trash';
import color from '@styles/color';
import clsx from 'clsx';
import CustomNoData from '@assets/ilustration-v2/CustomNoData';
import Button from '@components/Button';
import ModalProductChildConfig from '../ModalProductChildConfig';
import ProductChildContent from '../ProductChildContent';
import Add from '@assets/icon-v2/Add';

const Configuration = (props) => {
  const classes = useStyles();

  const {
    selectedProductChild,
    setSelectedProductChild,
    fieldsProductChild,
    modalProductChildConfig,
    setModalProductChildConfig,
    loading,
    options,
  } = useActions(props);

  const renderTabProductChild = () => {
    if (fieldsProductChild?.fields?.length > 0) {
      return (
        <>
          {fieldsProductChild?.fields?.map((field, index) => (
            <div
              key={field?.id}
              className={clsx(classes.tabItem, {
                [classes.tabItemActive]:
                  selectedProductChild?.productId === field?.productId,
              })}
              onClick={() => setSelectedProductChild({ ...field, index })}
            >
              <Text
                children={field?.productName}
                color="secondary500"
                size="16px"
                height="24px"
                weight={700}
              />
              <div>
                <IconButton
                  size="small"
                  style={{
                    color: color.primary.main,
                  }}
                  onClick={() => fieldsProductChild?.remove(index)}
                >
                  <Trash fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}
          <div style={{ flexGrow: 1 }}></div>
          <div className={classes.addProductButton}>
            <Button
              rounded="full"
              size="sm"
              children="add child product"
              onClick={(e) => {
                setModalProductChildConfig({ open: true });
                e?.currentTarget?.blur();
              }}
              leftIcon={Add}
              variant="soft"
              color="success"
              disabled={loading?.productChild || !options?.productChild?.length}
              loading={loading?.productChild}
            />
          </div>
        </>
      );
    } else {
      return (
        <div className={classes.notFoundContainer}>
          <CustomNoData style={{ width: '112', height: 'auto' }} />
          <Text
            children="You need to add Child Product first"
            color="secondary500"
            size="16px"
            height="24px"
            weight={700}
          />
          <Button
            rounded="full"
            size="sm"
            children="add CHILD PRODUCT"
            onClick={(e) => {
              setModalProductChildConfig({ open: true });
              e?.currentTarget?.blur();
            }}
            variant="soft"
            color="success"
            leftIcon={Add}
            disabled={loading?.productChild || !options?.productChild?.length}
            loading={loading?.productChild}
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className={classes.childProductBox}>
        <div className={classes.tabContainer}>{renderTabProductChild()}</div>
        <div
          className={classes.contentProductContainer}
          key={selectedProductChild?.id}
        >
          {selectedProductChild?.productId && (
            <ProductChildContent
              selectedProductChild={selectedProductChild}
              fieldsProductChild={fieldsProductChild}
            />
          )}
        </div>
      </div>
      <ModalProductChildConfig
        modalProductChildConfig={modalProductChildConfig}
        setModalProductChildConfig={setModalProductChildConfig}
        fieldsProductChild={fieldsProductChild}
        loading={loading}
        options={options}
      />
    </>
  );
};

Configuration.defaultProps = {
  control: {},
  state: {
    optionsBillingAccount: [],
    optionsProductConfigAccount: [],
  },
};

Configuration.propTypes = {
  control: PropTypes.object,
  state: PropTypes.object,
};

export default Configuration;
