import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Worklog from '../Worklog';

describe('src/components/Worklog', () => {
  const props = {
    data: [
      {
        date: '21/05/2020 11:42:31',
        status: 'TELKOMREG-AM | APPROVED',
        note: 'Document approved',
      },
      {
        date: '21/05/2020 11:42:51',
        status: 'TELKOMREG-AM | APPROVED',
        note: 'Document approved',
      },
      {
        date: '21/05/2020 11:42:51',
        status: 'TELKOMREG-AM | APPROVED',
        note: 0,
        child: [{ activity: 'Activity', date: '21/05/2020 11:42:51' }],
      },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Worklog {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
