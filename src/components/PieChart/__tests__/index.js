import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PieChart from '../PieChart';

jest.mock('../../../utils/hooks/useResponsive');

describe('src/components/PieChart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <PieChart data={[{ label: 'Label', value: 90 }]} />,
    );
    tree.props.children[0].props.children[0].props.children.props.colors({
      data: { color: '#000' },
    });
    expect(tree).toMatchSnapshot();
  });

  test('render data > 5', () => {
    useResponsive.mockReturnValueOnce(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <PieChart
        data={[
          { label: 'Label1', value: 90 },
          { label: 'Label2', value: 90 },
          { label: 'Label3', value: 90 },
          { label: 'Label4', value: 90 },
          { label: 'Label5', value: 90 },
          { label: 'Label6', value: 90 },
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render empty', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PieChart data={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
