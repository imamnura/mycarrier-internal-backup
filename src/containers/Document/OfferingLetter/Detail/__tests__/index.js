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

const actions = {
  feature: [
    'read_detail_offering_letter',
    'create_new_offerinng_letter',
    'read_download_doc_attachment_offering_letter',
    'update_offering_letter_returned',
    'update_offering_letter_draft',
  ],
  filterStatus: [{ label: 'All Status', value: '' }],
  data: {
    quotationId: 'SPH-1638236037412',
    companyName: 'PT JASA MARGA INDONESIA',
    contact: [
      {
        phoneNumber: '+6282116515155',
        name: 'dena',
        position: 'manager',
        email: 'aa@mailinator.com',
      },
    ],
    products: [
      {
        productId: '1',
        productParam: 'METRO E',
        productName: 'Metro Ethernet',
        epicProduct: true,
        slg: '98',
      },
    ],
    worklog: [
      {
        step: 1,
        status: 'draft',
        dateTime: null,
        note: '',
        createdBy: '945982@telkom.co.id',
      },
      {
        step: 2,
        status: 'telkom approval',
        dateTime: null,
        note: '',
        createdBy: '945982@telkom.co.id',
      },
      {
        step: 2,
        status: 'telkom approval',
        dateTime: null,
        note: '-',
        createdBy: 'telkom approval 1',
      },
      {
        step: 3,
        status: 'approved',
        dateTime: null,
        note: '',
        createdBy: 'telkom approval 2',
      },
    ],
    agreement: [
      {
        name: 'syahrul',
        position: 'Chief',
        email: 'denacoba@getnada.com',
        phoneNumber: '+6282115346660',
        status: 'approved',
        note: '-',
      },
      {
        name: 'dena',
        phoneNumber: '+6282116515155',
        position: 'GM',
        email: 'dena.hardianto@telkom.co.id',
        status: 'waiting approval',
        note: '',
      },
    ],
    status: 'returned',
    document: {
      fileName: 'SPH-1638236037412-signed.pdf',
      fileUrl:
        'https://storage-assurance-dev.mytens.id/mycarrier-quotation/quotation/SPH-1638236037412/SPH-1638236037412-signed.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=q1dx5HaUIo76Ych3nXqy%2F20220103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220103T072749Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d30c61d6542d31835daec5c1dc677b089ad004d996e3220d263236d139ad9f98',
    },
    createdAt: '2021-11-30T01:33:57.412Z',
    updatedAt: '2021-11-30T01:35:25.552Z',
    reason: '',
  },
  loading: false,
  onEdit: jest.fn(),
};

describe('src/pages/Document/Quotation/Detail', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={['update_returned']} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useActions.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={['update_returned']} />);
    expect(tree).toMatchSnapshot();
  });
});
