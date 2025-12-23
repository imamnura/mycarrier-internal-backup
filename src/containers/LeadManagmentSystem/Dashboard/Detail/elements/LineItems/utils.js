const schemaQuote = [
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'LINE',
    name: 'hierarchy',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'ACTION',
    name: 'action',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'PRODUCT',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'PRODUCT VENDOR',
    name: 'partnerFlag',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'ORDER NOW FLAG',
    name: 'orderNowFlag',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'ORDER NUMBER',
    name: 'orderNumber',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'QTY',
    name: 'qty',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'SERVICE ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'NET PRICE',
    name: 'netPrice',
  },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'EXTENDED QTY',
  //   name: 'x'
  // },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'EXTENDED NET PRICE',
  //   name: 'x'
  // },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'NRC SUBTOTAL',
    name: 'nrcTotal',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'MRC SUBTOTAL',
    name: 'mrcTotal',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'TERMIN FLAG',
    name: 'terminFlag',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'TERMIN VALUE',
    name: 'terminValue',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'OWNER ACCOUNT',
    name: 'caName',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'BILLING ACCOUNT',
    name: 'baNumber',
  },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'BILLING PROFILE',
  //   name: 'x'
  // },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'TERM OF PAYMENT',
    name: 'termOfPayment',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'EXPECTED DELIVERY',
    name: 'expectedDeliveryDate',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'CURRENCY',
    name: 'currency',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'SERVICE ACCOUNT',
    name: 'saName',
  },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'SERVICE ADDRESS',
  //   name: 'x'
  // },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'TSQ STATUS',
    name: 'tsqStatus',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'WHITELIST FLAG',
    name: 'whitelistFlag',
  },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'SUB ACTION',
  //   name: 'x'
  // },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'RESERVATION ID',
    name: 'reservationId',
  },
  // {
  //   cellStyle: {
  //     minWidth: 150,
  //     width: 150
  //   },
  //   label: 'MRC SUBTOTAL DISC AMOUNT',
  //   name: 'x'
  // },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'NEED INTEGRATION',
    name: 'needIntegrationFlag',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'BUILT ON CUSTOMER ASSET',
    name: 'builtOnCustomer',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'GOODS/SERVICE',
    name: 'goodsService',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'LEASED',
    name: 'leased',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'NEED LICENSE',
    name: 'needLicense',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'CAN BE SOLD TO OTHER CUSTOMER',
    name: 'canBeSoldToOtherCust',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'MANAGE SERVICE FLAG',
    name: 'msFlag',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'LINE ID',
    name: 'lineId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'TTD Bakes Days',
    name: 'ttdBakesDays',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'FEASIBILITY FLAG',
    name: 'feasibilityFlag',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'DEVICE ID',
    name: 'deviceId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'DEVICE NAME',
    name: 'deviceName',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'STO',
    name: 'stoCode',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'LATITUDE',
    name: 'latitude',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'LONGITUDE',
    name: 'longitude',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'SPECIFICATION',
    name: 'specification',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'NETWORK ROLE',
    name: 'networkRole',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'END DATE',
    name: 'endDate',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'PRODUCT ID',
    name: 'productId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'PRODUCT CODE',
    name: 'productCode',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'PRODUCT TYPE',
    name: 'productType',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'ID',
    name: 'scLineId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'ASYNC ID',
    name: 'asyncId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    label: 'ASYNC STATUS',
    name: 'asyncStatus',
  },
];

const schemaOrder = [
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'LINE',
    name: 'hierarchy',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'ACTION',
    name: 'action',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Line #',
    name: 'lineId',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'PRODUCT',
    name: 'product',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'Status',
    name: 'status',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Service ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Billing Account',
    name: 'ba',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Service Account',
    name: 'sa',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'MRC',
    name: 'mrc',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 128,
    },
    currency: true,
    label: 'MRC Subtotal',
    name: 'mrcSubTotal',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'NRC',
    name: 'nrc',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'NRC SUBTOTAL',
    name: 'nrcSubTotal',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'Bundle ID',
    name: 'bundleId',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    currency: true,
    label: 'Net Price',
    name: 'netPrice',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'Qty',
    name: 'qty',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Expected Delivery Date',
    name: 'expected',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Billing Effective Date',
    name: 'billingEffectiveDate',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Asset Activation Date',
    name: 'assetActivationDate',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Provisioning Activation Date',
    name: 'provisioningActivationDate',
  },
  {
    cellStyle: {
      minWidth: 128,
      width: 128,
    },
    label: 'SC Line ID',
    name: 'scLineId',
  },
];

export const schema = (status) => {
  return (
    {
      Quote: schemaQuote,
      Order: schemaOrder,
    }[status] || []
  );
};
