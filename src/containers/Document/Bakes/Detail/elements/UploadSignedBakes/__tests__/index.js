import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UploadSignedBakes from '../UploadSignedBakes';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  control: {},
  onSubmit: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('src/pages/Document/Bakes/elements/UploadSignedBakes', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <UploadSignedBakes
        onClose={jest.fn()}
        onSubmit={jest.fn()}
        open={true}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
