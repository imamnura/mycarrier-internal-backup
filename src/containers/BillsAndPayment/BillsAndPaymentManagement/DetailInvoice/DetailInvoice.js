import Table from '@components/Table';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import color from '@styles/color';
import { onDownloadFile } from '@utils/common';
import { currencyConverter, dateFormatConverter } from '@utils/converter';
import { dateFormat } from '@utils/parser';
import { useMemo } from 'react';
import DocumentStage from './elements/DocumentStage';
import useAction from './hooks/useAction';
import { getInvoiceStatus } from './utils';

const DetailInvoice = (props) => {
  const {
    data,
    loading,
    switchValue,
    paymentHistory,
    fetcherUploadAttachment,
    onUploadAttachment,
    onDeleteAttachment,
    onRefreshDocument,
    onSwitch,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Bills & Payment Management', url: route.billsAndPayment('list') },
    {
      label: data?.bpNumber || '-',
      // url: route.billsAndPayment('detail', data?.bpNumber),
      back: true,
    },
    { label: data?.invoiceNumberFormat || '-' },
  ];

  const validateIBSSInvoice = data?.invoiceIbssAttachment?.invoice?.fileUrl;
  const validateIBSSInvoiceAttachment =
    data?.invoiceIbssAttachment?.invoiceAttachment?.fileUrl;
  const validateIBSSTaxInvoice =
    data?.invoiceIbssAttachment?.invoiceEfaktur?.fileUrl;

  const validateInvoice = data?.invoiceInternalFile?.fileUrl;
  const validateTaxInvoice = data?.invoiceTaxFile?.fileUrl;
  const validateInvoiceAttachment = data?.invoiceAttachment?.fileUrl;

  const convertCurrencyWithColor = (number) => {
    return number ? (
      <span style={{ color: color.primary.main, fontWeight: '600' }}>
        {currencyConverter(number)}
      </span>
    ) : (
      currencyConverter(number)
    );
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Bills Information',
          properties: {
            data: data || {},
            schema: [
              {
                grid: 12,
                label: 'INVOICE NUMBER',
                name: 'invoiceNumberFormat',
              },
              {
                converter: dateFormatConverter({
                  type: 'date',
                  empty: '-',
                }),
                label: 'INVOICE DATE',
                name: 'releasedDate',
              },
              {
                converter: dateFormatConverter({
                  type: 'date',
                  empty: '-',
                }),
                label: 'DUE DATE',
                name: 'invoiceDueDate',
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Bills Detail',
          properties: {
            data: data || {},
            schema: [
              {
                converter: currencyConverter,
                label: 'BILLS',
                name: 'bill',
              },
              {
                converter: currencyConverter,
                label: 'PPN',
                name: 'ppn',
              },
              {
                converter: currencyConverter,
                label: 'Cash Payment',
                name: 'cashPayment',
              },
              {
                converter: currencyConverter,
                label: 'PPH23',
                name: 'pph23',
              },
              {
                converter: convertCurrencyWithColor,
                grid: 12,
                label: 'TOTAL BILLS',
                name: 'totalBills',
              },
              {
                converter: currencyConverter,
                grid: 12,
                label: 'TOTAL PAYMENT',
                name: 'totalPaid',
              },
            ],
          },
        },
        {
          type: 'custom',
          title: 'Payment History',
          hidden: !paymentHistory.length,
          render: (
            <div style={{ paddingTop: 24 }}>
              <Table
                data={paymentHistory}
                schema={[
                  {
                    label: 'Paid Amount',
                    name: 'paidAmount',
                    currency: true,
                  },
                  {
                    label: 'Paid Date',
                    name: 'paidDate',
                  },
                ]}
                meta={{ page: 0 }}
              />
            </div>
          ),
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'INVOICE',
                name: validateInvoice
                  ? 'invoiceInternalFile'
                  : 'invoiceIbssAttachment.invoice',
                upload: {
                  accept: ['.pdf'],
                  onChange: onUploadAttachment,
                  fetcher: fetcherUploadAttachment({
                    ...data,
                    type: 'invoice',
                  }),
                  helperText: 'Upload .pdf document, max 50 MB',
                  maxSize: 52428800,
                  placeholder: 'Example: invoice.pdf',
                },
                action: validateIBSSInvoice
                  ? {
                      children: data?.invoiceIbssAttachment?.invoice
                        ?.refreshProperties?.isProgress
                        ? 'Requested'
                        : 'Refresh',
                      disabled:
                        !!data?.invoiceIbssAttachment?.invoice
                          ?.refreshProperties?.isProgress,
                      variant: data?.invoiceIbssAttachment?.invoice
                        ?.refreshProperties?.isProgress
                        ? 'filled'
                        : 'ghost',
                      onClick: onRefreshDocument('invoiceDocument'),
                    }
                  : validateInvoice && {
                      children: 'Delete',
                      onClick: onDeleteAttachment('invoice'),
                    },
                desc: `Last updated on ${dateFormat({
                  date:
                    data?.invoiceIbssAttachment?.invoice?.updateAt ||
                    data?.invoiceInternalFile?.updateAt,
                  type: 'full-date-time-month-short',
                  empty: '-',
                })}`,
                attachmentProps: {
                  previewAction: !validateInvoice
                    ? [{ children: 'download', onClick: onDownloadFile }]
                    : [
                        { children: 'download', onClick: onDownloadFile },
                        {
                          children: 'delete',
                          ml: 8,
                          onClick: onDeleteAttachment('invoice')(),
                          withDivider: true,
                        },
                      ],
                },
              },
              {
                label: 'TAX INVOICE',
                name: validateTaxInvoice
                  ? 'invoiceTaxFile'
                  : 'invoiceIbssAttachment.invoiceEfaktur',
                upload: {
                  accept: ['.pdf'],
                  onChange: onUploadAttachment,
                  fetcher: fetcherUploadAttachment({
                    ...data,
                    type: 'tax_invoice',
                  }),
                  helperText: 'Upload .pdf document, max 50 MB',
                  maxSize: 52428800,
                  placeholder: 'Example: taxinvoice.pdf',
                },
                action: validateIBSSTaxInvoice
                  ? {
                      children: data?.invoiceIbssAttachment?.invoiceEfaktur
                        ?.refreshProperties?.isProgress
                        ? 'Requested'
                        : 'Refresh',
                      variant: data?.invoiceIbssAttachment?.invoiceEfaktur
                        ?.refreshProperties?.isProgress
                        ? 'filled'
                        : 'ghost',
                      disabled:
                        !!data?.invoiceIbssAttachment?.invoiceEfaktur
                          ?.refreshProperties?.isProgress,
                      onClick: onRefreshDocument('taxDocument'),
                    }
                  : validateTaxInvoice && {
                      children: 'Delete',
                      onClick: onDeleteAttachment('tax_invoice'),
                    },
                desc: `Last updated on ${dateFormat({
                  date:
                    data?.invoiceIbssAttachment?.invoiceEfaktur?.updateAt ||
                    data?.invoiceTaxFile?.updateAt,
                  type: 'full-date-time-month-short',
                  empty: '-',
                })}`,
                attachmentProps: {
                  previewAction: !validateTaxInvoice
                    ? [{ children: 'download', onClick: onDownloadFile }]
                    : [
                        { children: 'download', onClick: onDownloadFile },
                        {
                          children: 'delete',
                          ml: 8,
                          onClick: onDeleteAttachment('tax_invoice')(),
                          withDivider: true,
                        },
                      ],
                },
              },
              {
                label: 'INVOICE ATTACHMENT',
                // name: validateInvoiceAttachment ? 'invoiceAttachment' : 'invoiceIbssAttachment.invoiceAttachment',
                name: switchValue
                  ? 'invoiceIbssAttachment.invoiceAttachment'
                  : 'invoiceAttachment',
                upload: {
                  accept: ['.pdf'],
                  onChange: onUploadAttachment,
                  fetcher: fetcherUploadAttachment({
                    ...data,
                    type: 'invoiceAttachment',
                  }),
                  helperText: 'Upload .pdf document, max 50 MB',
                  maxSize: 52428800,
                  placeholder: 'Example: invoice.pdf',
                },
                action: validateInvoiceAttachment &&
                  !switchValue && {
                    children: 'Delete',
                    onClick: onDeleteAttachment('invoiceAttachment'),
                  },
                switch: {
                  value: switchValue,
                  onChange: onSwitch,
                  hidden: !validateIBSSInvoiceAttachment,
                },
                attachmentProps: {
                  previewAction: !validateInvoiceAttachment
                    ? [{ children: 'download', onClick: onDownloadFile }]
                    : [
                        { children: 'download', onClick: onDownloadFile },
                        {
                          children: 'delete',
                          ml: 8,
                          onClick: onDeleteAttachment('invoiceAttachment')(),
                          withDivider: true,
                        },
                      ],
                },
              },
              {
                label: 'OTHERS',
                name: 'invoiceOtherFile',
                upload: {
                  accept: ['.pdf', '.xls', '.xlsx'],
                  onChange: onUploadAttachment,
                  fetcher: fetcherUploadAttachment({ ...data, type: 'other' }),
                  helperText: 'Upload .pdf and .xls document, max 50 MB',
                  maxSize: 52428800,
                  placeholder: 'Example: others-doc.pdf',
                },
                action: {
                  children: 'Delete',
                  onClick: onDeleteAttachment('other'),
                },
                attachmentProps: {
                  previewAction: [
                    { children: 'download', onClick: onDownloadFile },
                    {
                      children: 'delete',
                      ml: 8,
                      onClick: onDeleteAttachment('other')(),
                      withDivider: true,
                    },
                  ],
                },
              },
              {
                label: 'BUNDLE DOCUMENT',
                name: 'invoiceIbssAttachment.bundleDocument',
                action: {
                  children: 'Delete',
                  onClick: onDeleteAttachment('bundling'),
                },
                attachmentProps: {
                  previewCentered: true,
                  previewAction: [
                    { children: 'download', onClick: onDownloadFile },
                    {
                      children: 'delete',
                      ml: 8,
                      onClick: onDeleteAttachment('bundling')(),
                      withDivider: true,
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Customer Upload',
          hidden: !data?.invoiceCustomer || !data?.invoiceCustomer.length,
          properties: {
            data: data || {},
            schema: [{ name: 'invoiceCustomer' }],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'custom',
          title: 'Document Stage',
          hidden: !data?.documentStage,
          render: <DocumentStage data={data?.documentStage} />,
        },
      ],
    },
  ];

  const status = useMemo(
    () => getInvoiceStatus(data?.ibssStatus),
    [data?.ibssStatus],
  );

  return (
    <Detail
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={!data}
      schema={detailSchema}
      status={status}
    />
  );
};

export default DetailInvoice;
