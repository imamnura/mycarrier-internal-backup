import Worklog from '@components/Worklog';

const numberingOverview = {
  component: Worklog,
  variant: [
    {
      name: 'Default',
      grid: 6,
      props: {
        data: [
          {
            date: '21/05/2020 11:42:31',
            status: 'TELKOMREG-AM | APPROVED',
            note: 'Document approved',
          },
          {
            date: '21/05/2020 11:42:51',
            status: 'TELKOMREG-AM | APPROVED',
            note: 'Document approved',
          },
        ],
      },
    },
  ],
};

export default numberingOverview;
