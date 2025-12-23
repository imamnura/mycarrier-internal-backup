import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const feature = [
  'read_list_visiting_neucentrix',
  'read_detail_visiting_neucentrix',
  'update_assign_to_am_visiting_neucentrix',
  'update_reject_visiting_neucentrix_am',
  'update_forward_to_sigma_witel_arnet_visiting_neucentrix',
  'update_reject_visiting_neucentrix_marketing',
  'read_list_visiting_neucentrix_am',
];

const actions = {
  action: jest.fn(),
  visitId: 'VST-9439158986',
  data: {
    forwardedTo: ['test', 'test', 'test'],
    visitId: 'VST-9439158986',
    companyName: 'PT TELEKOMUNIKASI SELULAR',
    picVisitorName: 'Customer NeuCentrix',
    visitPurpose: ['Survey'],
    visitStartDate: '2022-08-02T11:30:00.000Z',
    visitEndDate: '2022-08-02T16:00:00.000Z',
    status: 'completed',
    location: 'Neucentrix Mattoangin',
    room: [
      {
        roomName: 'Candi 001',
        locationName: 'neuCentrix Semarang Candi',
        roomDesc: '-',
        roomId: 'CND_001',
      },
    ],
    additionalVisitor: [
      {
        name: 'Aaron',
        email: 'aaron@gmail.com',
        qrCode:
          'http://10.62.164.142/visiting/checkin-detail/VlNULTk0MzkxNTg5ODYjMzIwNDI4MDUwNDkxNTQ0NA==',
      },
    ],
    worklog: [],
    rejectReason: '',
    isForwarded: true,
    isAssigned: true,
    historyActivity: [
      {
        name: 'Aaron',
        activity: 'CHECKOUT',
      },
      {
        name: 'Aaron',
        activity: 'VISITING',
      },
    ],
    document: [
      {
        type: 'SPK',
        fileUrl:
          'https://storage-assurance-dev.mytens.id/tdscustomer/neucentrix_visit/8808512-additional.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=q1dx5HaUIo76Ych3nXqy%2F20220826%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220826T062105Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b553b552e198e1e02bfd57b3a5089a68e1c7f4a016eac80bbcdf10fd1098112e',
        fileName: '8808512-additional.pdf',
      },
    ],
  },
  tableData: [
    {
      name: 'Aaron',
      activity: 'CHECKOUT',
    },
    {
      name: 'Aaron',
      activity: 'VISITING',
    },
  ],
  loading: false,
  fetchDetail: jest.fn(),
  modalUpdateStatus: null,
  setModalUpdateStatus: jest.fn(),
};

const additionalVisitor = [
  {
    name: 'Test',
    email: 'test@gmail.com',
    qrCode: 'http://test',
  },
];

describe('src/pages/Neucentrix/VisitNeucentrix/Detail-v2', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={feature} />);
    expect(tree).toMatchSnapshot();

    //render additional visitor
    tree.props.children[0].props.schema[1].content[0].properties.schema[4].converter(
      additionalVisitor,
    );
  });

  test('render w/ other conditions', () => {
    useActions.mockReturnValue({
      ...actions,
      tableData: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={feature} />);
    expect(tree).toMatchSnapshot();

    //render additional visitor
    tree.props.children[0].props.schema[1].content[0].properties.schema[4].converter(
      [],
    );
  });

  test('render/empty', () => {
    useActions.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={feature} />);
    expect(tree).toMatchSnapshot();
  });
});
