import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';
import { ASSETS_URL } from '@constants/env';

jest.mock('../hooks/useActions');

const actions = {
  detailBrochure: {
    createdAt: '2023-02-08T05:03:48.328Z',
    description: 'sample 12 desc',
    fileType: 'pdf',
    id: 'DOC-32628418',
    name: 'sample-12.pdf',
    path: `${ASSETS_URL}/ewz-mycarrier-pub-dev/homepage/sample-12.pdf`,
    size: '0.00 MB',
  },
  loading: false,
  editBrochure: jest.fn(),
  confirmDelete: jest.fn(),
};

describe('src/containers/ContentManagement/Homepage/Detail/BrochureUpload/index', () => {
  test('render/feature empty', () => {
    useActions.mockReturnValue({ ...actions, feature: [''] });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();

    tree.props.action[0].onClick('id');
    tree.props.action[1].onClick('id');
  });

  test('render/data empty', () => {
    useActions.mockReturnValue({
      ...actions,
      detailBrochure: null,
      feature: [''],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
