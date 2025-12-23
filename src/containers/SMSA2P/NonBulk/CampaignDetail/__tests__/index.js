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
    quantity: '1',
    wording: 'Isi content messageddd',
    smsPerDayLocation: '10',
    religion: 'Protestant',
    maximumAge: '55',
    minimumAge: '44',
    gender: 'male',
    location: 'Bandung',
    campaignStartDate: '2022-08-31T04:00:00.000Z',
    campaignEndDate: '2022-08-31T06:00:00.000Z',
    description: 'ok',
    minimumARPU: 55,
    maximumARPU: 66,
    statusCampaignOrder: 'fail',
    campaignChildId: 'CobabuatbarudenganuseSubmit_LINTASJARINGANNUSANTARA_295',
    status: 'On Progress',
    sfId: '',
    documentAttachment: [
      {
        fileName: '',
        fileUrl:
          'https://storage-assurance-dev.mytens.id/nonbulk-request-activation/https%3A//storage-assurance-dev.mytens.id/nonbulk-request-activation/media/3806d8e7-9313-41a6-ab76-615122be58a6.png%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3Dq1dx5HaUIo76Ych3nXqy%252F20220824%252Fus-east-1%252Fs3%252Faws4_request%26X-Amz-Date%3D20220824T040353Z%26X-Amz-Expires%3D604800%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D3798edb5bf897ff33f47e6d2a426490f839bc43cc10d7d9f11147f69b440059c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=q1dx5HaUIo76Ych3nXqy%2F20230119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230119T063142Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=85c91425d505153682b5508df378dc0b016cb29fe0ce471f727b8a99c255653e',
        fileType: 'image',
        mediaPath:
          'https://storage-assurance-dev.mytens.id/nonbulk-request-activation/media/3806d8e7-9313-41a6-ab76-615122be58a6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=q1dx5HaUIo76Ych3nXqy%2F20220824%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220824T040353Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3798edb5bf897ff33f47e6d2a426490f839bc43cc10d7d9f11147f69b440059c',
      },
    ],
    isProduct: 'MMS',
  },
};

const props = { feature: [] };

describe('src/containers/SMSA2P/NonBulk/CampaignDetail', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
