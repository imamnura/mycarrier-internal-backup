import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import States from '../States';

jest.mock('@utils/hooks/useResponsive');

describe('src/fragments/States/elements/States', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <States action={{ children: 'btn' }} type="approved" />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/mobile', () => {
    useResponsive.mockReturnValue(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<States type="returned" />);
    expect(tree).toMatchSnapshot();
  });
});
