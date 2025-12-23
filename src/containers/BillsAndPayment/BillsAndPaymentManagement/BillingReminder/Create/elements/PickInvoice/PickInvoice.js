import React, { useMemo } from 'react';
import Create from '@fragments/Create';
import useAction from './hooks/useAction';
import PropTypes from 'prop-types';
import StepperForm from '../StepperForm';
import { breadcrumb, schema } from '../../utils';
import List from '@fragments/List';
import Typography from '@components/Typography';
import { textLimit } from '@utils/text';

const PickInvoice = (props) => {
  const {
    data,
    bpNumber,
    count,
    // reminderId,
    loading,
    onStepperClick,
    onSubmit,
    submitLoading,
    list,
    loadingTable,
    useSelectedRow,
    search,
    setSearch,
    onPreviewDocument,
    filter,
    onPaginationChange,
    page,
  } = useAction(props);

  const tableData = useMemo(
    () =>
      list.data.map((d) => ({
        ...d,
        document: d.invoiceInternalFile ? (
          <Typography
            color="blue-main"
            onClick={onPreviewDocument({
              title: d.invoiceInternalFile.fileName,
              url: d.invoiceInternalFile.fileUrl,
            })}
            style={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            {textLimit(d?.invoiceInternalFile.fileName, 24)}
          </Typography>
        ) : (
          <>-</>
        ),
      })),
    [list],
  );

  const listProps = {
    title: 'Pick Invoice',
    noMargin: true,
    filter: filter,
    search: {
      onChange: setSearch,
      placeholder: 'Search Invoice..',
      value: search,
      noBorder: true,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      numbering: false,
      schema: schema,
      selectedRowKey: 'invoiceNumber',
      useSelectedRow: useSelectedRow,
      onPaginationChange: onPaginationChange,
      page: page,
    },
    withTopDivider: false,
  };

  return (
    <Create
      action={[
        {
          children: 'Save as Draft',
          onClick: onSubmit('draft'),
          variant: 'ghost',
          loading: submitLoading === 'draft',
        },
        {
          children: 'Discard',
          onClick: onSubmit('discard'),
          variant: 'ghost',
          loading: submitLoading === 'discard',
        },
        {
          children: 'Cancel',
          onClick: onSubmit('cancel'),
          variant: 'ghost',
          loading: submitLoading === 'cancel',
        },
        {
          children: 'Next Step',
          onClick: onSubmit('next'),
          loading: submitLoading === 'next',
          hideDivider: true,
          ml: 16,
          disabled: useSelectedRow[0]?.length < 1,
        },
      ]}
      breadcrumb={breadcrumb(bpNumber, count)}
      loading={loading}
      stepperTab={
        <StepperForm active={1} data={data} onStepperClick={onStepperClick} />
      }
    >
      <List {...listProps} />
    </Create>
  );
};

PickInvoice.defaultProps = {
  data: null,
};

PickInvoice.propTypes = {
  data: PropTypes.object,
  // loading: PropTypes.bool.isRequired,
  // paramsData: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired,
};

export default PickInvoice;
