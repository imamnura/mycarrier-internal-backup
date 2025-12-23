import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  control: {},
  handleSubmit: jest.fn(),
  isSendNow: false,
  loading: false,
  loadingContactGroup: false,
  media: {},
  onSubmit: jest.fn(),
  optionContactGroup: [],
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  remainingParagraphLength: {
    paragraph1: 900,
    paragraph2: 900,
    paragraph3: 900,
  },
  scheduleTime: '',
};

describe('src/containers/Broadcast/BroadcastInformation/Create', () => {
  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
