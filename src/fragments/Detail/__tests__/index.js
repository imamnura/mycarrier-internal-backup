import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';

describe('src/fragments/Detail', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Detail
        notFound={false}
        schema={[{ gridProps: { xs: 12 }, content: [[]] }]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
