import useResponsive from '@utils/hooks/useResponsive';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LineChart from '../LineChart';
import { ySelector } from '../utils';

jest.mock('../../../utils/hooks/useResponsive');

describe('src/components/LineChart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <LineChart
        data={[{ id: '1', data: [{ x: 1, y: 1 }] }]}
        leftLabel="label"
      />,
    );
    tree.props.children[0].props.children[0].props.children.props.children[1].props.tooltip(
      {
        point: {
          data: { x: 1, y: 1 },
          serieColor: '#000',
          serieId: 'x',
        },
      },
    );
    expect(tree).toMatchSnapshot();
  });

  const data = [
    {
      id: '1',
      data: [
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 100 },
        { x: 1, y: 1 },
        { x: 1, y: 1.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
      ],
    },
  ];

  test('render long data', () => {
    useResponsive.mockReturnValueOnce(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineChart data={data} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineChart data={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it('ySelector', () => {
    expect(ySelector(1)(data)).toBeTruthy();
  });
});
