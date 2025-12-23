import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const actions = {
  detail: {
    brochureId: 'BD-06654796',
    contactNumber: '081324008164',
    dateDownload: '2022-10-18T15:24:14.796Z',
    email: 'laras@getnada.com',
    location: '',
    name: 'laras',
    newsLetterStatus: true,
    product: 'Homepage',
    source: 'https://mycarrier-staging.telkomdigitalsolution.co/',
    typeOfLogin: 'After Login',
  },
  feature: ['read_detail_user_downloaded_brochure'],
  isLoading: false,
};

describe('src/containers/ContentManagement/Brochure/Detail/index', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty', () => {
    useActions.mockReturnValue({ ...actions, data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
