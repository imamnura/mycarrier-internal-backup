import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Box } from '@legion-ui/core';
import { isHaveAccess } from '@utils/common';
import color from '@styles/color';
// import ShowIcon from './ShowIcon';
import AddContent from './lib/AddContent';
import DeleteIcon from '@assets/Svg/Delete';
import EditIcon from '@assets/Svg/Pencil';
import List from '@fragments/List';
import Reload from '@assets/icon-v2/Reload';
import ReorderBanner from './lib/ReorderBanner';
import SwitchStatusPopUp from '../lib/SwitchStatusPopUp';
import useListStyles from './List.styles';
import useActions from './hooks/useActions';
import { tableHeader, searchPlaceholder, tabsHomepage } from './constant';
import SwitchStatusBanner from '../lib/SwitchStatusBanner';

const ListHomepage = (props) => {
  const { feature } = props;
  const classes = useListStyles();

  const {
    activeBtnGoAhead,
    addContent,
    filter,
    confirmDeleteBanner,
    confirmSaveReorder,
    list,
    listBannerActive,
    listBannerHide,
    loadingListBanner,
    loadingTable,
    normalizePeriod,
    onAddContent,
    onChangeStatusPopUp,
    onChangeStatusBanner,
    onClickRefresh,
    onClickRowTable,
    onDeletePopUp,
    onPaginationChange,
    onUpdateBanner,
    onUpdatePopUp,
    onReorderBanner,
    onCloseDialog,
    openDialog,
    // setOpenDialog,
    choosedContent,
    setChoosedContent,
    tab,
    setTab,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    setOpenDialogReorder,
    openDialogReorder,
    setListBannerActive,
    setListBannerHide,
    page,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    button.push({
      onClick: onClickRefresh,
      children: 'Refresh',
      loading: loadingTable,
      leftIcon: Reload,
    });

    tab === 'bannerHero' &&
      button.push({
        disabled: list?.data?.length < 1,
        onClick: onReorderBanner,
        children: 'REORDER BANNER HERO',
        loading: loadingListBanner,
        variant: 'ghost',
      });

    if (
      (tab === 'brochure' && isHaveAccess(feature, 'create_brochure')) ||
      (tab === 'bannerHero' && isHaveAccess(feature, 'create_banner')) ||
      (tab === 'popup' && isHaveAccess(feature, 'create_popup_banner'))
    ) {
      button.push({
        onClick: onAddContent,
        children: 'ADD CONTENT',
        loading: loadingTable,
      });
    }
    return button;
  };

  const filterProps = () => {
    let res = [];

    if (tab === 'bannerHero') {
      res.push({
        ...filter.dateRange,
        type: 'dateRange',
        variant: 'secondary',
      });
    } else if (tab === 'brochure') {
      res.push({
        ...filter.dateRange,
        type: 'dateRange',
        variant: 'secondary',
      });
      res.push({
        ...filter.type,
        maxwidth: 200,
        type: 'dropdown',
      });
    }

    return res;
  };

  const tabsProps = () => {
    let tabs = {
      options: tabsHomepage(feature),
      value: tab,
      onChange: setTab,
    };

    return tabs;
  };

  const tableList = (tab) => {
    switch (tab) {
      case 'bannerHero': {
        return list?.data?.map((item) => {
          return {
            ...item,
            status: (
              <SwitchStatusBanner
                data={item}
                meta={list?.meta}
                onClickUpdateStatus={onChangeStatusBanner(item)}
              />
            ),
            operations: (
              <Box className={classes.listAction}>
                {/* <ShowIcon
                  displayBanner={data?.isDisplay}
                  feature={feature}
                  id={data?.bannerId}
                /> */}
                <IconButton
                  id="updateBanner"
                  onClick={() => onUpdateBanner(item?.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  id="deleteBanner"
                  disabled={!!item?.isDisplay}
                  onClick={() => confirmDeleteBanner(item?.id)}
                >
                  <DeleteIcon
                    style={!!item?.isDisplay && { stroke: color.grey.main }}
                  />
                </IconButton>
              </Box>
            ),
          };
        });
      }
      case 'popup': {
        return list?.data?.map((item) => {
          const isActive = item?.status?.toLowerCase() === 'active';
          return {
            ...item,
            period: normalizePeriod(item),
            status: (
              <SwitchStatusPopUp
                data={item}
                onClickUpdateStatus={onChangeStatusPopUp({
                  isActive,
                  id: item?.id,
                  popUpName: item?.name,
                })}
              />
            ),
            action: (
              <Box className={classes.listAction}>
                <IconButton onClick={onUpdatePopUp(item?.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  disabled={isActive}
                  onClick={onDeletePopUp(item?.id)}
                >
                  <DeleteIcon style={isActive && { stroke: color.grey.main }} />
                </IconButton>
              </Box>
            ),
          };
        });
      }
      default:
        return list?.data;
    }
  };

  const listProps = {
    title: 'Homepage Management',
    breadcrumb: [{ label: 'Homepage Management' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: searchPlaceholder(tab),
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList(tab),
      hovering: true,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      numbering: true,
      onClickRow: tab === 'bannerHero' ? null : onClickRowTable,
      schema: tableHeader(tab),
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      onPaginationChange: onPaginationChange,
    },
    tabs: tabsProps(),
  };

  const orderProps = {
    listBannerActive,
    listBannerHide,
    setOpenDialogReorder,
    openDialogReorder,
    setListBannerActive,
    setListBannerHide,
    confirmSaveReorder,
    classes,
  };

  return (
    <>
      <List {...listProps} />
      <AddContent
        addContent={addContent}
        choosedContent={choosedContent}
        disabled={!activeBtnGoAhead}
        open={openDialog}
        onClose={onCloseDialog}
        setChoosedContent={setChoosedContent}
      />
      <ReorderBanner {...orderProps} />
    </>
  );
};

ListHomepage.defaultProps = {
  active: false,
  classes: {},
  feature: [],
};

ListHomepage.propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object,
  feature: PropTypes.array,
};

export default ListHomepage;
