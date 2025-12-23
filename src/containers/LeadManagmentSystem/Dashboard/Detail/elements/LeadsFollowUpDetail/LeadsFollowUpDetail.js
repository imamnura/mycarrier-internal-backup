import SearchFile from '@assets/ilustration-v2/SearchFile';
import List from '@fragments/List';
import { Box } from '@material-ui/core';
import { capitalize } from '@utils/text';
import React, { useMemo } from 'react';
import useFormFollowUp from './hooks/useFormFollowUp';
import { Text } from '@legion-ui/core';
import { normalizeList, schemaList } from './utils';
import PropTypes from 'prop-types';
import FormFollowUp from './elements/FormFollowUp';
// import PickupProductItems from './elements/PickupProductItems';

const LeadsFollowUpDetail = (props) => {
  const { variant } = props;

  const {
    tab,
    setTab,
    data,
    dashboardId,
    fetchDetail,
    categoryForm,
    followUpForm,
    setCategoryForm,
    setFollowUpForm,
    onDeleteFollowUp,
    onEditFollowUp,
    onPreviewDocument,
    // pickupProductModal,
    // setPickupProductModal,
    onAddProductToQuote,
    // prerequisite,
    listFollowUp,
    loadingTable,
    fetchList,
  } = useFormFollowUp(props);

  // let _status = data?.status === 'Valid' ? 'qualify' : data?.status?.toLowerCase();
  // const visibleCrud = _status === variant;
  // const visibleCrud = true;

  const visibleCrud = useMemo(() => {
    const status = data?.status.toLowerCase();

    if (status == variant) return true;
    if (status == 'valid' && variant == 'qualify') return true;
    if (status == 'quote' && variant == 'opportunity') return true;

    return false;
  }, [variant, data?.status]);

  const action = useMemo(() => {
    let res = [];

    // if (variant === 'opportunity') {
    //   res.push({
    //     children: 'pickup product items',
    //     variant: 'ghost',
    //     onClick: setPickupProductModal({ open: true })
    //   });
    // }

    // if (data?.status !== 'Retired') {
    if (visibleCrud) {
      res.push({
        children: 'add follow up',
        variant: 'ghost',
        onClick: setCategoryForm({ open: true }),
      });
    }

    if (
      data?.status === 'Quote' &&
      variant === 'opportunity' &&
      tab === 'product'
    ) {
      res.push({
        children: 'Add product to quote',
        onClick: onAddProductToQuote,
        disabled: !data?.isAllowedToQuote,
      });
    }

    return res;
  }, [variant, tab, data?.status]);

  const optionsTab = useMemo(() => {
    let res = [];

    // dummy
    const condition = true;

    if (condition) {
      res.push({ label: 'Activities', value: 'activities' });
    }

    if (condition) {
      res.push({ label: 'Notes', value: 'notes' });
    }

    if (condition) {
      res.push({ label: 'Attachments', value: 'attachments' });
    }

    if (variant === 'opportunity') {
      if (condition) {
        res.push({ label: 'Product', value: 'product' });
      }

      if (condition) {
        res.push({ label: 'Contact', value: 'contact' });
      }

      // if (condition) {
      //   res.push({ label: 'Quote', value: 'quote' });
      // }
    }

    return res;
  }, [variant]);

  const dataFromDetail = useMemo(() => {
    const res = {
      qualify: {
        // activities: data?.qualify?.activity,
        // notes: data?.qualify?.note,
        // attachments: data?.qualify?.attachment,
      },
      opportunity: {
        // activities: data?.opportunity?.activity,
        // notes: data?.opportunity?.note,
        // attachments: data?.opportunity?.attachment,
        product: data?.opportunity?.product,
        contact: data?.opportunity?.contact,
        quote: data?.opportunity?.quote,
      },
    };

    return res[variant][tab] || [];
  }, [data, variant, tab, listFollowUp]);

  const tableData = ['activities', 'notes', 'attachments'].includes(tab)
    ? listFollowUp
    : dataFromDetail;

  const listProps = {
    noMargin: true,
    noPadding: true,
    // breadcrumb: [{ label: 'Leads Follow Up Detail', color: 'general-mid' }],
    action: action,
    tabs: {
      options: optionsTab,
      value: tab,
      onChange: setTab,
    },
    table: {
      numbering: false,
      data: normalizeList(tableData, tab, {
        onEditFollowUp,
        onDeleteFollowUp,
        onPreviewDocument,
      }),
      meta: { totalPage: 0 },
      schema: schemaList(tab, visibleCrud, data?.status),
      loadingRoot: ['activities', 'notes', 'attachments'].includes(tab)
        ? loadingTable
        : false,
      emptyMessage: {
        description: `${capitalize(
          tab,
        )} list is not currently created by the Account Manager`,
        message: `${capitalize(tab)} list doesn't exist yet`,
        icon: SearchFile,
      },
      size: 5,
    },
  };

  return (
    <>
      <Box sx={{ mt: -8 }}>
        <Text
          children="Leads Follow Up Detail"
          size="20px"
          weight="700"
          color="secondary500"
        />
        <List {...listProps} />
      </Box>
      <FormFollowUp
        categoryForm={categoryForm}
        dashboardId={dashboardId}
        fetchDetail={fetchDetail}
        fetchList={fetchList}
        followUpForm={followUpForm}
        onCloseCategory={setCategoryForm({ open: false })}
        setFollowUpForm={setFollowUpForm}
        status={data?.status}
        tab={tab}
        variant={variant}
      />
      {/* <PickupProductItems
        onClosePickupProduct={setPickupProductModal({ open: false })}
        {...pickupProductModal}
      /> */}
    </>
  );
};

LeadsFollowUpDetail.propTypes = {
  variant: PropTypes.oneOf(['qualify', 'opportunity']).isRequired,
};

export default React.memo(LeadsFollowUpDetail);
