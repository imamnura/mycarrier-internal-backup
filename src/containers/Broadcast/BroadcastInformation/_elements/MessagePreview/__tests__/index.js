import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MessagePreview from '../MessagePreview';
import { cleanup, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useAction from '../MessagePreview.hooks';

describe('src/containers/Broadcast/BroadcastInformation/_elements/MessagePreview', () => {
  afterAll(cleanup);

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date(Date.UTC(2010, 10, 10, 0, 0, 0)));
  });

  const props = {
    media: {
      fileName: 'fileName',
      fileUrl: 'url.jpg',
    },
    message: ['1', '2', '3'],
    time: new Date(Date.UTC(2010, 10, 10, 0, 0, 0)).toString(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MessagePreview {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/empty media', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MessagePreview media={{}} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <MessagePreview
        media={{
          fileName: 'fileName',
          fileUrl: 'url.pdf',
        }}
        message=""
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('timer', async () => {
    let res;
    jest.advanceTimersByTime(50000);

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));
      await result.current.updateTime();
      res = await result;
    });

    expect(res.current.timeNow).not.toBeNull();
  });
});
