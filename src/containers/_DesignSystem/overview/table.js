/* eslint-disable no-alert */
import Table from '@components/Table';

const alert = (x) => window.alert(JSON.stringify(x));

const schemaSample = [
  {
    name: 'a',
    label: 'With Sort & Custom Width',
    sort: true,
    cellStyle: { width: '50%' },
  },
  { name: 'b', label: 'Date Time', formatDate: 'date-time' },
  { name: 'c', label: 'Currency', currency: true },
  {
    name: 'd',
    label: 'Status',
    schemaStatus: {
      Completed: 'success',
      Rejected: 'danger',
    },
  },
];

const dataSample = [
  {
    a: 'Data A',
    b: new Date('10/10/2010').toJSON(),
    c: 20000000,
    x: 'Title Header',
    d: 'Completed',
  },
  {
    a: 'Data B',
    b: new Date('10/10/2010').toJSON(),
    c: 20000000,
    x: 'Title Header',
    d: 'Rejected',
  },
];

const tableOverview = {
  component: Table,
  variant: [
    {
      grid: 12,
      name: 'Default',
      props: {
        data: dataSample,
        schema: schemaSample,
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
      },
    },
    {
      grid: 12,
      name: 'Clickable Row',
      props: {
        data: dataSample,
        onClickRow: alert,
        schema: schemaSample,
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
      },
    },
    {
      grid: 12,
      name: 'Tooltip Status',
      props: {
        data: dataSample,
        schema: [
          schemaSample[0],
          {
            ...schemaSample[3],
            tooltip: {
              Completed: 'success',
              Rejected: 'danger',
            },
          },
        ],
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
      },
    },
    {
      grid: 12,
      name: 'Loading Root',
      props: {
        data: dataSample,
        loadingRoot: true,
        onClickRow: alert,
        schema: schemaSample,
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
      },
    },
    {
      grid: 12,
      name: 'Loading + Without Numbering',
      props: {
        data: dataSample,
        loading: true,
        onClickRow: alert,
        schema: schemaSample,
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
        numbering: false,
      },
    },
    {
      grid: 12,
      name: 'Data Empty + Custom Empty Message',
      props: {
        data: [],
        emptyMessage:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        schema: schemaSample,
        useOrderBy: ['a', alert],
        useOrderDirection: ['desc', alert],
      },
    },
  ],
};

export default tableOverview;
