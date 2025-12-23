import React from 'react';
import Button from '@components/Button';
import DetailedList from '@components/DetailedList';

const data = [
  {
    location: 'Bandung',
    quantity: '9999',
    campaignDate: '21/11/2020  08:00 - 23/11/2020  08:00',
    wording:
      'Info promo erigo 06 November 2021. Cek info belanja hemat dan berbagai diskon...',
    action: <Button variant="ghost">View Details</Button>,
  },
  {
    location: 'Bandung',
    quantity: '9999',
    campaignDate: '21/11/2020  08:00 - 23/11/2020  08:00',
    wording:
      'Info promo erigo 06 November 2021. Cek info belanja hemat dan berbagai diskon...',
    action: <Button variant="ghost">View Details</Button>,
  },
];

const schema = [
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Location',
    name: 'location',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'Quantity',
    name: 'quantity',
  },
  {
    label: 'CampaignDate',
    name: 'campaignDate',
  },
  {
    label: 'Wording',
    name: 'wording',
  },
  {
    cellStyle: {
      alignItems: 'center',
      display: 'grid',
      height: '100%',
      justifyContent: 'flex-end',
      minWidth: 124,
    },
    label: '',
    name: 'action',
  },
];

const DetailedListOverview = {
  component: DetailedList,
  variant: [
    {
      grid: 12,
      name: 'Default',
      props: {
        schema,
        data,
      },
    },
  ],
};

export default DetailedListOverview;
