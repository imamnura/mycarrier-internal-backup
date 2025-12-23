import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Generator from '../Generator';

describe('src/fragments/elements/Generator', () => {
  const props = {
    data: [
      { type: 'stepper', title: 'stepper' },
      { type: 'worklog', title: 'worklog' },
      { type: 'information', title: 'information' },
      { type: 'numbering', title: 'numbering' },
      { type: 'attachment', title: 'attachment', action: { children: 'Btn' } },
      { type: 'custom', title: 'custom', render: <span /> },
      { type: 'custom', render: <span /> },
      {
        type: 'level2',
        title: 'title1',
        properties: {
          data: [
            { type: 'information', title: 'information', titleVariant: 'h5' },
          ],
        },
      },
      { type: 'other', title: 'other' },
    ],
  };
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Generator {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
