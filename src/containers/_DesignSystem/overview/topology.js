import Topology from '@components/Topology';

const topologyOverview = {
  component: Topology,
  variant: [
    {
      name: 'Default',
      grid: 12,
      props: {
        data: [
          {
            message: 'PE-D1-PUB-VPN',
            info: 'Status: UP',
          },
          {
            message: 'GigabitEthernet0/0',
            info: '',
          },
          {
            message: 'ME3-D1-PUBA',
            info: '',
          },
          {
            message: 'port2/2/7:3309',
            info: '',
          },
          {
            message: 'port2/2/7:3309',
            info: '',
          },
          {
            message: 'lag-6:3309',
            info: '',
          },
          {
            message: '172.29.121.37',
            info: '',
          },
          {
            message: 'GPON02-D1-TKN',
            info: '',
          },
          {
            message: 'gpon-onu_0/1/0:3',
            info: 'Status: OK',
          },
          {
            message: '48575443AC4AFC',
            info: 'Status: ONLINE',
          },
        ],
      },
    },
  ],
};

export default topologyOverview;
