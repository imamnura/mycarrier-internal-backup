import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../utils');

const useActionReturn = {
  orderNumber: 'test123',
  loading: false,
  data: {
    orderInformation: {
      orderNumber: 'NB-1662455547159',
      orderDate: '2022-09-06T16:12:46+07:00',
      status: 'On Progress',
      custAccntName: 'LINTAS JARINGAN NUSANTARA',
      lastUpdate: '2022-09-06T16:12:46+07:00',
    },
    brandAndproductOrder: {
      companyName: 'PT. Telekomunikasi Indonesia',
      brandName: 'BrandNew',
      industryCategory: 'ban',
      campaignName: 'campaign3334',
      campaignType: 'LBA',
      channel: 'SMS LBA',
      senderId: 'SUPER INDO',
      whitelistUATInternal: '0852786611',
      whitelistUATExternal: '0852786612',
    },
    campaignList: [
      {
        location: 'Benowo - Benowo, Surabaya City, East Java, Indonesia',
        quantity: '250',
        campaignStartDate: '2022-06-15T01:00:00.000Z',
        campaignEndDate: '2022-06-15T06:00:00.000Z',
        wording:
          'Arek - Arek Suroboyo, Super Indo Citraland Utara Segera Buka 16 Juni 2022, Promo Pesta Seafood Udang Vaname AK 55-60 Rp 8.990/100gr, Berlaku 16-19 Juni 2022',
        campaignChild: 'campaign3334_LINTASJARINGANNUSANTARA_304',
      },
      {
        location: 'Benowo - Benowo, Surabaya City, East Java, Indonesia',
        quantity: '250',
        campaignStartDate: '2022-06-16T01:00:00.000Z',
        campaignEndDate: '2022-06-16T06:00:00.000Z',
        wording:
          'Arek - Arek Suroboyo, Super Indo Citraland Utara Segera Buka 16 Juni 2022, Promo Pesta Seafood Udang Vaname AK 55-60 Rp 8.990/100gr, Berlaku 16-19 Juni 2022',
        campaignChild: 'campaign3334_LINTASJARINGANNUSANTARA_305',
      },
      {
        location: 'Benowo - Benowo, Surabaya City, East Java, Indonesia',
        quantity: '250',
        campaignStartDate: '2022-06-16T01:00:00.000Z',
        campaignEndDate: '2022-06-16T01:00:00.000Z',
        wording:
          'Telah Buka Super Indo Citraland Utara 16 Juni 2022, Akeh Promo Seger Udang Vaname A5 55-60 Rp 8.990/100gr , Ikan Bawal Hitam Rp 6.490 Berlaku 16-19 Juni22',
        campaignChild: 'campaign3334_LINTASJARINGANNUSANTARA_306',
      },
      {
        location: 'Benowo - Benowo, Surabaya City, East Java, Indonesia',
        quantity: '250',
        campaignStartDate: '2022-06-18T01:00:00.000Z',
        campaignEndDate: '2022-06-18T06:00:00.000Z',
        wording:
          'Telah Buka Super Indo Citraland Utara 16 Juni 2022, Akeh Promo Seger Udang Vaname A5 55-60 Rp 8.990/100gr , Ikan Bawal Hitam Rp 6.490 Berlaku 16-19 Juni22',
        campaignChild: 'campaign3334_LINTASJARINGANNUSANTARA_307',
      },
    ],
    worklog: [
      {
        step: 1,
        status: 'On Progress',
        note: 'Request Non Bulk activation',
        noteProgress: 'test',
        dateTime: '2022-09-06T16:12:46+07:00',
        createdBy: '',
      },
    ],
  },
  action: jest.fn(),
};

const props = { feature: [] };

describe('src/containers/SMSA2P/NonBulk/Detail', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
