import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Add from '../Create';
import useActions from '../hooks/useActions';
import { ASSETS_URL } from '@constants/env';

jest.mock('../hooks/useActions');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  control: {},
  file: {},
  setFile: jest.fn(),
  handleSubmit: jest.fn(),
  handleUploadFile: jest.fn(),
  confirmUpload: jest.fn(),
  detail: {
    description: 'sample 14 desc',
    fileType: 'pdf',
    id: 'DOC-32756808',
    name: 'sample-14.pdf',
    path: `${ASSETS_URL}/ewz-mycarrier-pub-dev/catalogpublic/`,
    size: '0.00 MB',
  },
  disableBtnUpload: false,
  handleCancel: jest.fn(),
  isLoading: false,
};

describe('src/containers/ContentManagement/Homepage/BrochureUpload/Create', () => {
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
      path: '',
      detail: {},
      file: null,
    };
    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);

    expect(tree).toMatchSnapshot();

    // tree.props.children.props.children[2].props.children[0].props.handleDelete();
    // tree.props.children.props.children[2].props.children[0].props.onChange();
  });
});
