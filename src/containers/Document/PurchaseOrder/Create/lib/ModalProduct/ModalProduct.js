import React from 'react';
import clsx from 'clsx';
import Skeleton from '@components/Skeleton';
import { Card, Text, Flex, Box, Checkbox, Spinner } from '@legion-ui/core';
import { Dialog, IconButton } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useWording } from './ModalProduct.utils';
import Accordion from '../Accordion';
import Button from '@components/Button';
import Cancel from '@assets/icon-v2/Cancel';
import DynamicForm from '../DynamicForm';
import NoData from '@assets/ilustration-v2/NoData';
import SearchBox from '@components/SearchBox';
import StateMessage from '@components/StateMessage';
import useModalProduct from './ModalProduct.hook';
import useStyles from './ModalProduct.styles';
import { IS_CDNAAS } from '@constants/env';

const ModalProduct = (props) => {
  const { modalProduct } = props;
  const {
    category,
    filterCategory,
    formProduct,
    formValues,
    loadingCategory,
    onChangeCategory,
    onChangeProduct,
    onChangePagination,
    onClickClear,
    onClickBack,
    onClose,
    onSubmit,
    product,
    page,
    search,
    setSearch,
    step,
    schema,
    loadingProduct,
    mobileClient,
  } = useModalProduct(props);

  const classes = useStyles(mobileClient);
  const wording = useWording(formValues?.productName, step);

  const isCDNaas = formValues?.productId === IS_CDNAAS;
  const hasMainPackage = formValues.packagesSolutions?.some(
    (pkg) => pkg?.isMainPackage,
  );

  const renderProductCard = () => {
    if (loadingProduct) {
      return (
        <Flex alignX="center" alignY="center" className={classes.noData}>
          <Spinner />
        </Flex>
      );
    }

    if (!product?.data?.length) {
      return (
        <Flex alignX="center" alignY="center" className={classes.noData}>
          <StateMessage ilustration={NoData} message="No Product Found" />
        </Flex>
      );
    }

    return (
      <Box className={classes.productContainer}>
        {product.data.map((product, i) => (
          <Box key={`${product}-${i}`}>
            <Card
              bordered
              className={clsx(classes.productBox, {
                [classes.selectedBox]:
                  formValues?.productName === product?.productName,
              })}
              onClick={onChangeProduct(product)}
              radius="12px"
            >
              <Text
                block
                children={product.categoryName.toUpperCase()}
                color="secondary400"
                size="12px"
                weight={700}
              />
              <Text
                block
                children={product.productName}
                color="secondary600"
                size="18px"
                weight={700}
              />
            </Card>
          </Box>
        ))}
      </Box>
    );
  };

  const renderProduct = (
    <>
      <Flex alignX="space-between" alignY="top" style={{ gap: 36 }}>
        <Box>
          <Flex alignX="space-between" alignY="end">
            <Text
              children="Filter by"
              color="secondary600"
              size="20px"
              weight={700}
            />
            {filterCategory.length > 0 && (
              <Text
                children="CLEAR"
                color="primary500"
                onClick={onClickClear}
                size="14px"
                style={{ cursor: 'pointer' }}
                weight={700}
              />
            )}
          </Flex>
          <Accordion
            title="Category"
            content={
              <div>
                {loadingCategory ? (
                  <Skeleton height="16px" />
                ) : (
                  category.map((option, index) => (
                    <Box pt="8px" key={option[index]?.categoryId}>
                      <Checkbox
                        control={formProduct?.control}
                        checked={filterCategory.some(
                          (x) => x.categoryName === option.categoryName,
                        )}
                        customValue
                        onChange={(e) =>
                          onChangeCategory(e.target.checked, option)
                        }
                        label={option?.categoryName}
                        name="category"
                      />
                    </Box>
                  ))
                )}
              </div>
            }
          />
        </Box>
        <Box width={mobileClient ? '100%' : '700px'}>
          <Flex alignY="end" style={{ gap: 12 }}>
            <Text
              children="Product & Services"
              color="secondary600"
              size="20px"
              weight={700}
            />
            <Text
              children={`${product?.meta?.totalData || 0} Product & Services`}
              color="secondary500"
              size="14px"
              weight={400}
            />
          </Flex>
          <Box mt="16px" mb="12px">
            <SearchBox
              onChange={(v) => setSearch(v)}
              placeholder="Search products & services.."
              value={search}
            />
          </Box>
          <Box>{renderProductCard()}</Box>
          <Flex alignX="center" mt="16px" mb="8px">
            <Pagination
              color="primary"
              count={Math.ceil(
                product?.meta?.totalData / (product?.meta?.size || 9),
              )}
              onChange={onChangePagination}
              page={page + 1}
              shape="rounded"
            />
          </Flex>
        </Box>
      </Flex>
      <Flex alignX="space-between" alignY="flex-end">
        <Text color="secondary500" size="14px" weight={400}>
          {formValues?.productName ? (
            <>
              {<strong>{formValues?.productName}</strong> ?? 'No product'}
              {' selected'}
            </>
          ) : (
            'No product selected'
          )}
        </Text>
        <Flex mt="12px" style={{ gap: '12px' }}>
          <Button children="Cancel" onClick={onClose} variant="ghost" />
          <Button
            children="Add"
            disabled={!formValues.productName}
            onClick={onSubmit}
          />
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="xl"
        open={modalProduct.open}
      >
        <Flex alignX="space-between" alignY="center" mb="8px">
          <Text
            children={wording.title}
            color="secondary500"
            size="20px"
            weight={700}
          />
          <IconButton className={classes.closeButton}>
            <Cancel onClick={onClose} />
          </IconButton>
        </Flex>
        <Text
          children={wording.subtitle}
          color="secondary400"
          mb="20px"
          size="16px"
          weight={400}
        />
        {step === 1 ? (
          renderProduct
        ) : (
          <Box width={mobileClient ? '100%' : '950px'}>
            <DynamicForm
              {...props}
              useForm={formProduct}
              products={schema()}
              productId={formValues?.productId}
              filters={{
                formtype: [
                  'Text Field',
                  'Text Area',
                  'Dropdown',
                  'Upload File',
                  'Packages',
                  'Solutions',
                ],
                isSpecialRequireField: true,
              }}
            />
            <Flex alignX="flex-end" mt="30px" style={{ gap: '12px' }}>
              <Button children="Cancel" variant="ghost" onClick={onClose} />
              {modalProduct?.type !== 'edit' && (
                <Button children="Back" variant="ghost" onClick={onClickBack} />
              )}
              <Button
                children="Submit"
                disabled={
                  !formProduct?.formState.isValid ||
                  (isCDNaas && !hasMainPackage)
                }
                onClick={onSubmit}
              />
            </Flex>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default ModalProduct;
