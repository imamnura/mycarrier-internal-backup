import { camelCase } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@material-ui/core';
import { tableHeader } from '../../utils';
import Table from '@components/Table';
import ButtonMinimal from '@components/ButtonMinimal';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import color from '@styles/color';
import ReadMore from '@__old/components/elements/ReadMore';
import { Text } from '@legion-ui/core';
import useQueryParams from '@utils/hooks/useQueryParams';
import { IS_CDNAAS } from '@constants/env';

const ProductAndService = (props) => {
  const { products, fieldsProducts, setModalProduct } = props;
  const { queryParams } = useQueryParams();
  const orderType = camelCase(queryParams?.orderType);

  const tableData = products?.map((item = {}, idx) => {
    const orderTypeForm = item?.form?.[orderType] ?? [];

    let packages = item?.packages || item?.packagesSolutions || [];

    const isFabdSolution = [
      'fabd solution (without partner access)',
      'fabd solution',
    ].includes(item?.productFlow?.toLowerCase());

    const isCDNaas = item.productId === IS_CDNAAS

    if (isCDNaas) {
      packages = item?.packagesSolutions;
      packages = packages?.map((pkg) => ({
        ...pkg,
         packageName: `${pkg?.packageName} ${pkg?.subItem?.split(',')[1] || ''}`,
      })) || [];
    }

    const description = packages.map((v) => v?.packageName).join(', ') ?? '-';

    
    const hasSpecialField = orderTypeForm?.some((x) => x.isSpecialRequireField);
    const hasEditAccess = hasSpecialField || isFabdSolution;
    
    return {
      ...item,
      description:
        description?.length > 70 ? (
          <ReadMore
            readMoreCharacterLimit={70}
            showLessButton={true}
            text={description}
          />
        ) : (
          description
        ),
      operations: (
        <Box display="flex" justifyContent="flex-end" width="44px" gridGap={8}>
          {hasEditAccess && (
            <IconButton
              onClick={() => {
                setModalProduct({
                  open: true,
                  content: item,
                  type: 'edit',
                  index: idx,
                });
              }}
              size="small"
              style={{ color: color.yellow.main }}
            >
              <Edit fontSize="small" />
            </IconButton>
          )}
          <IconButton
            onClick={() => fieldsProducts.remove(idx)}
            size="small"
            style={{ color: color.primary.main }}
          >
            <Trash fontSize="small" />
          </IconButton>
        </Box>
      ),
    };
  });

  const tableProps = {
    data: tableData,
    loadingRoot: false,
    loading: false,
    schema: tableHeader,
    showPageInformation: false,
    meta: {
      page: 0,
    },
    maxHeight: 560,
    emptyMessage: {
      message: 'No products & services yet',
      size: 'small',
    },
    customEmptyMessage: (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={56}
        gridGap={8}
      >
        <Text>No products & services yet</Text>
      </Box>
    ),
  };

  return (
    <Grid container md={12} xs={12} spacing={2}>
      <Grid item xs={12}>
        <Table {...tableProps} />
      </Grid>
      <Grid item xs={12}>
        <Grid alignItems="center" container justifyContent="center">
          {products?.length >= 1 && (
            <Grid item style={{ flexGrow: 1 }}>
              <div style={{ borderTop: '2px dashed #B3C3CA' }} />
            </Grid>
          )}
          <Grid align="center" item>
            <ButtonMinimal
              label="add product & Service"
              onClick={() => setModalProduct({ open: true })}
              variant="add"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ProductAndService.propTypes = {
  control: PropTypes.object.isRequired,
};

export default ProductAndService;
