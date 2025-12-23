import React from 'react';
import color from '@styles/color';
import Typography from '@components/Typography';
import { clamp, floor } from 'lodash';

const labelComponent = (required, label) => (
  <>
    {required && (
      <Typography
        children="*"
        color="primary-main"
        variant="subtitle2"
        weight="bold"
      />
    )}
    {label && <Typography children={label} variant="subtitle2" weight="bold" />}
  </>
);

export const schema = ({ isCDNaas = false }) => {
  const subItem = {
    cellStyle: {
      width: 180,
      backgroundColor: color.white,
    },
    headStyle: {
      borderBottom: `1px solid ${color.general.light}`,
      justifyContent: 'left',
    },
    label: labelComponent(true, 'Sub Item'),
    name: 'subItem',
  };

  const regularSchema = [
    {
      cellStyle: {
        width: 180,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
        justifyContent: 'left',
      },
      label: labelComponent(true, 'Item'),
      name: 'item',
    },

    {
      cellStyle: {
        width: 240,
        minWidth: 240,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(true, 'Payment Type'),
      name: 'paymentType',
    },
    {
      cellStyle: {
        minWidth: 240,
        width: 320,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(true, 'Description'),
      name: 'description',
    },
    {
      cellStyle: {
        width: 80,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(true, 'Quantity'),
      name: 'quantity',
    },
    {
      cellStyle: {
        width: 180,
        minWidth: 180,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(true, 'Price/Item'),
      name: 'price',
    },
    {
      cellStyle: {
        width: 60,
        minWidth: 60,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(false, 'Discount (%)'),
      name: 'discount',
    },
    {
      cellStyle: {
        width: 120,
        minWidth: 120,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(false, 'Sub Total'),
      name: 'subTotal',
    },
    {
      cellStyle: {
        width: 80,
        backgroundColor: color.white,
      },
      headStyle: {
        borderBottom: `1px solid ${color.general.light}`,
      },
      label: labelComponent(false, 'Action'),
      name: 'action',
    },
  ];
  
  if (isCDNaas) {
    regularSchema.splice(1, 0, subItem);
  }

  return regularSchema;
};

export const calculateOccurrance = (bakesDuration = 0, divider) => {
  const occurrance_final = clamp(floor(bakesDuration / divider), 1, Infinity);
  return occurrance_final;
};
