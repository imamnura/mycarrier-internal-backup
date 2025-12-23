import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RespondenChart from '../RespondenChart';

describe('src/components/RespondenChart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <RespondenChart
        data={[
          { label: '0', value: 90 },
          { label: '1', value: 90 },
          { label: '2', value: 90 },
          { label: '3', value: 90 },
          { label: '4', value: 90 },
          { label: '5', value: 90 },
          { label: '6', value: 90 },
          { label: '7', value: 90 },
          { label: '8', value: 90 },
          { label: '9', value: 90 },
          { label: '10', value: 90 },
        ]}
      />,
    );
    const treeProps = tree.props.children[0].props.children[0].props;
    treeProps.colors({ data: { color: '#000' } });
    treeProps.tooltipLabel({ index: 0 });
    treeProps.axisLeft.format(1);
    expect(tree).toMatchSnapshot();
  });

  test('render empty', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RespondenChart data={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
