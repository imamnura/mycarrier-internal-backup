import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MessagePreview from '../MessagePreview';
import useActions from '../hooks/useActions';
import useStyles from '../styles';

jest.mock('../styles');
jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/MessagePreview', () => {
  const returnValueData = {
    message: [
      {
        title: 'staff',
        email: 'test',
        createdDate: 'test',
        chat: 'test',
        username: 'test',
        evidence: [
          { file: { fileName: 'test', fileUrl: 'test' }, fileId: 'test' },
          { file: { fileName: 'test', fileUrl: 'test' }, fileId: 'test' },
        ],
      },
    ],
    loading: false,
    modalMessage: false,
    onClose: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MessagePreview />);
    expect(tree).toMatchSnapshot();
  });

  test('render title not staff', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      message: [
        {
          title: 'test',
          email: 'test',
          createdDate: 'test',
          chat: 'test',
          username: 'test',
          evidence: [
            { file: { fileName: 'test', fileUrl: 'test' }, fileId: 'test' },
            { file: { fileName: 'test', fileUrl: 'test' }, fileId: 'test' },
          ],
        },
      ],
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MessagePreview />);
    expect(tree).toMatchSnapshot();
  });

  test('render title not staff 2', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      loading: true,
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MessagePreview />);
    expect(tree).toMatchSnapshot();
  });
});
