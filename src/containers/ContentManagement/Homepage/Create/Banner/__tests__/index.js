import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Add from '../Create';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  id: 'id',
  control: {},
  handleSubmit: jest.fn(),
  confirmAdd: jest.fn(),
  optionsProduct: [],
  loadingProduct: false,
  watchTypeBanner: 'internal',
  languages: [],
  tab: 'id',
  setTab: jest.fn(),
  handleSwap: jest.fn(),
  isLoading: false,
  handleCancel: jest.fn(),
  validateForm: false,
};

describe('src/containers/ContentManagement/Homepage/Banner/Create', () => {
  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={['']} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state tab id', () => {
    const props = {
      ...actions,
      id: '',
      watchType: 'eksternal',
    };
    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);

    expect(tree).toMatchSnapshot();
  });
});
