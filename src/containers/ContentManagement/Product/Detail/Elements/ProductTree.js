import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AddCircle } from '@material-ui/icons';
import { Box, Divider, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import Switch from '@components/Switch';
import StarIcon from '@assets/Svg/Star';
import StarOutlineIcon from '@assets/Svg/StarOutline';
import Typography from '@components/Typography';
import useStyles from '../styles';

export default function Component(props) {
  const {
    data,
    onDelete,
    handleOpenSubDetail,
    onChangeDisplay,
    onAddPage,
    handleSpecialPage,
    initialAction,
    initialData,
  } = props;
  const classes = useStyles(props);

  const {
    query: { id },
  } = useRouter();
  const categoryDisabled = !data.isDisplay;
  const isSpecialPage = data?.specialCase?.isSpecialCase;
  const isNotSingleProduct = data?.type !== 'single';

  const actionAdd = ({ disabled, label, level, parentId }) => {
    return (
      <Box
        className={clsx(classes.insertBtn, { [classes.disabled]: disabled })}
        ml={3}
        onClick={() => onAddPage(level, disabled, parentId)}
      >
        <AddCircle />
        <Typography children={label} color="green-main" variant="buttonM" />
      </Box>
    );
  };

  const renderBase = (params) => {
    const {
      action = initialAction,
      data = initialData,
      disableRow,
      label,
      name,
      onClickRow,
    } = params;
    const { toggle, remove, edit, special } = action;
    const { id, isDisplay, isSpecial, level, parentId, parentDisabled } = data;

    return (
      <Box py={2}>
        <Grid
          className={clsx({ [classes.disabled]: disableRow })}
          container
          item
          justifyContent="space-between"
          md={12}
          xs={12}
        >
          <Grid
            className={clsx({
              [classes.clickableRow]: !!onClickRow && !disableRow,
            })}
            item
            md={8}
            onClick={() => {
              if (onClickRow) {
                onClickRow(data, disableRow);
              }
            }}
          >
            <Typography
              children={label}
              color="general-mid"
              inline
              variant="caption"
            />
            <Typography children={name} variant="h5" weight="medium" />
          </Grid>
          <Grid
            alignItems="center"
            container
            item
            justifyContent="flex-end"
            md={4}
            spacing={2}
          >
            {toggle && (
              <Grid item>
                <Switch
                  disabled={parentDisabled}
                  onChange={() => onChangeDisplay(id, !isDisplay, name)}
                  value={isDisplay}
                />
              </Grid>
            )}
            {Object.keys(action).length > 2 && (
              <Divider
                className={classes.verticalDivider}
                orientation="vertical"
                variant="middle"
              />
            )}
            {special && (
              <Grid
                className={clsx({ [classes.button]: !disableRow })}
                item
                onClick={() =>
                  handleSpecialPage(id, name, parentId, !isSpecial, disableRow)
                }
              >
                {isSpecial ? <StarIcon /> : <StarOutlineIcon />}
              </Grid>
            )}
            {edit && (
              <Grid
                className={clsx({ [classes.button]: !disableRow })}
                item
                onClick={() => handleOpenSubDetail(data, disableRow)}
              >
                <EditIcon />
              </Grid>
            )}
            {remove && (
              <Grid
                className={clsx({ [classes.button]: !disableRow })}
                item
                onClick={() =>
                  onDelete({ id, level, disabled: disableRow, fromTree: true })
                }
              >
                <DeleteIcon />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderChild = (params) => {
    const { secondLevel, data } = params;
    const disableL1 = isSpecialPage || categoryDisabled || !data.isDisplay;
    return (
      <Box>
        {renderBase(params)}
        {secondLevel?.map((l2, idx) => {
          return (
            <Box key={`lv2-${idx}`} pl={4}>
              <Divider />
              {renderBase({
                label: 'L2 Category',
                name: l2.title,
                disableRow: disableL1,
              })}
              <Box pl={4}>
                <Divider />
                {l2 &&
                  l2.detailProduct.map((productDetail) => {
                    const disableL2 =
                      categoryDisabled ||
                      !data.isDisplay ||
                      (isSpecialPage && !productDetail.isSpecialCase);

                    return renderBase({
                      action: {
                        toggle: true,
                        remove: true,
                        edit: true,
                        special: true,
                      },
                      data: {
                        category: l2.title,
                        id: productDetail.catId,
                        isDisplay: productDetail.isDisplay,
                        isSpecial: productDetail.isSpecialCase,
                        level: 'l2',
                        parentId: id,
                        parentDisabled: categoryDisabled || disableL2,
                      },
                      // disableRow: !productDetail.isDisplay || disableL2,
                      disableRow: disableL2,
                      label: 'Product Detail Page',
                      name: productDetail.name,
                      onClickRow: handleOpenSubDetail,
                    });
                  })}
                {actionAdd({
                  label: 'ADD PRODUCT DETAIL PAGE',
                  level: 'l2',
                  disabled: disableL1,
                  parentId: l2.title,
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderMultipleProduct = () => {
    return (
      <Box mb={2} pl={4}>
        <Divider />
        {data.child?.map((level1) => {
          const disableL1 =
            categoryDisabled ||
            !data.isDisplay ||
            (isSpecialPage && !level1.isSpecialCase);

          return renderChild({
            action: {
              toggle: true,
              remove: true,
              edit: true,
              special: level1?.isSingleProduct,
            },
            data: {
              id: level1.catId,
              isDisplay: level1.isDisplay,
              isSingleProduct: level1?.isSingleProduct,
              isSpecial: level1?.isSpecialCase,
              level: 'l1',
              parentId: level1.parentId,
              // parentDisabled: categoryDisabled || isSpecialPage,
              parentDisabled: categoryDisabled || disableL1,
            },
            disableRow: disableL1,
            label: 'L1 Page',
            name: level1.name,
            onClickRow: handleOpenSubDetail,
            secondLevel: level1.child,
          });
        })}
        <Divider />
        {isNotSingleProduct &&
          actionAdd({
            disabled: isSpecialPage || categoryDisabled,
            label: 'ADD L1 PAGE',
            level: 'l1',
          })}
      </Box>
    );
  };

  return (
    <div>
      {renderBase({
        action: {
          toggle: true,
        },
        data: {
          id: id,
          isDisplay: data.isDisplay,
          level: 'l0',
          parentDisabled: isSpecialPage,
        },
        disableRow: isSpecialPage,
        label: 'L0 Page (Product Category)',
        name: data.name,
      })}
      {isNotSingleProduct && renderMultipleProduct()}
    </div>
  );
}

Component.defaultProps = {
  data: {},
  handleOpenSubDetail: () => {},
  handleSpecialPage: () => {},
  initialAction: {},
  initialData: {},
  onAddPage: () => {},
  onChangeDisplay: () => {},
  onDelete: () => {},
};

Component.propTypes = {
  data: PropTypes.object,
  handleOpenSubDetail: PropTypes.func,
  handleSpecialPage: PropTypes.func,
  initialAction: PropTypes.object,
  initialData: PropTypes.object,
  onAddPage: PropTypes.func,
  onChangeDisplay: PropTypes.func,
  onDelete: PropTypes.func,
};
