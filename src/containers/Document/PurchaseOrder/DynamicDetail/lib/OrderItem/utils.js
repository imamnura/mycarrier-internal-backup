export const schemaTable = {
  'ncx product integration': [
    {
      cellStyle: {
        minWidth: 240,
        width: 213,
      },
      label: 'Root Product',
      name: 'productName',
    },
    {
      cellStyle: {
        minWidth: 240,
        width: 213,
      },
      label: 'Child',
      name: 'childName',
    },
    {
      cellStyle: {
        minWidth: 240,
        width: 213,
      },
      label: 'Grand Child',
      name: 'grandchildName',
    },
    {
      cellStyle: {
        minWidth: 300,
        width: 213,
      },
      label: 'DESCRIPTION',
      name: 'description',
    },
    {
      cellStyle: {
        minWidth: 100,
        width: 133,
      },
      label: 'QUANTITY',
      name: 'qty',
    },
    {
      cellStyle: {
        minWidth: 160,
        width: 168,
      },
      label: 'PAYMENT TYPE',
      name: 'paymentType',
    },
    {
      cellStyle: {
        minWidth: 120,
        width: 174,
      },
      label: 'Total Price',
      name: 'totalPrice',
      currency: true,
      hasTooltipHeader: true,
      tooltipHeader:
        'This is the total price (after multiplying by the quantity)',
    },
  ],
  default: [
    {
      cellStyle: {
        minWidth: 240,
      },
      label: 'ITEM',
      name: 'packageName',
    },
    {
      cellStyle: {
        minWidth: 160,
      },
      label: 'PAYMENT TYPE',
      name: 'paymentType',
    },
    {
      cellStyle: {
        minWidth: 300,
      },
      label: 'DESCRIPTION',
      name: 'description',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'QUANTITY',
      name: 'quantity',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'PRICE/ITEM',
      name: 'price',
      currency: true,
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'DISCOUNT',
      name: 'discount',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'SUB TOTAL',
      name: 'subTotal',
      currency: true,
    },
  ],
};
