import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';
import { getGameqooStepper, getGameqooWorklog } from '../utils';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/Gameqoo/Detail', () => {
  const returnValueData = {
    referenceId: '123',
    fetchDetail: jest.fn(),
    data: null,
    loading: false,
    modalReturn: null,
    modalApproveIssue: null,
    modalChooseCategory: null,
    setModalReturn: jest.fn(),
    setModalApproveIssue: jest.fn(),
    setModalChooseCategory: jest.fn(),
    onClickModalReturn: jest.fn(),
    onClickValidation: jest.fn(),
    onPreviewWorklog: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no id', () => {
    useActions.mockReturnValueOnce({ ...returnValueData, referenceId: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status checking no feature', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        status: 'Checking',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status checking with feature', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        status: 'Checking',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Detail
        feature={[
          'update_reject_ticket_gameqoo',
          'update_approve_ticket_gameqoo',
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('get gameqoo stepper', () => {
    expect(getGameqooStepper('Checking', 'nonNetwork')).toMatchObject({
      active: 0,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Onprogress', 'nonNetwork')).toMatchObject({
      active: 1,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Onhold', 'nonNetwork')).toMatchObject({
      active: 2,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Solved', 'nonNetwork')).toMatchObject({
      active: 3,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Closed', 'nonNetwork')).toMatchObject({
      active: 5,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Rejected', 'nonNetwork')).toMatchObject({
      active: 1,
      errors: 'rejected',
      errorsLabel: 'Report Rejected',
    });

    expect(getGameqooStepper('Checking', 'network')).toMatchObject({
      active: 0,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Approved', 'network')).toMatchObject({
      active: 1,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Queued', 'network')).toMatchObject({
      active: 2,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Backend', 'network')).toMatchObject({
      active: 3,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Finalchecked', 'network')).toMatchObject({
      active: 4,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Resolved', 'network')).toMatchObject({
      active: 4,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Salamsim', 'network')).toMatchObject({
      active: 4,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Closed', 'network')).toMatchObject({
      active: 6,
      errors: null,
      errorsLabel: null,
    });
    expect(getGameqooStepper('Rejected', 'network')).toMatchObject({
      active: 1,
      errors: 'rejected',
      errorsLabel: 'Report Rejected',
    });
  });

  test('get gameqoo worklog', () => {
    const onPreviewWorklog = jest.fn();
    const baseWorklogItem = {
      status: '',
      dateTime: '',
      note: '',
      description: '',
      noteProgress: '',
      class: '',
      file: {},
    };

    expect(getGameqooWorklog([baseWorklogItem], onPreviewWorklog, '')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: '',
          status: '',
        }),
      ]),
    );
    expect(
      getGameqooWorklog(
        [{ ...baseWorklogItem, class: 'tes' }],
        onPreviewWorklog,
        '',
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: '',
          status: '',
        }),
      ]),
    );
    expect(
      getGameqooWorklog(
        [
          {
            ...baseWorklogItem,
            noteProgress: 'progress',
            note: 'note',
            file: {
              fileUrl: 'url',
            },
          },
        ],
        onPreviewWorklog,
        '',
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          status: '',
        }),
      ]),
    );
    expect(
      getGameqooWorklog(
        [
          {
            ...baseWorklogItem,
            noteProgress: 'progress',
            description: 'desc',
            file: {
              fileUrl: 'url',
            },
          },
        ],
        onPreviewWorklog,
        '',
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          status: '',
        }),
      ]),
    );
    expect(
      getGameqooWorklog(
        [{ ...baseWorklogItem, note: 'note' }],
        onPreviewWorklog,
        '',
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: 'note',
          status: '',
        }),
      ]),
    );
    expect(
      getGameqooWorklog(
        [{ ...baseWorklogItem, description: 'desc' }],
        onPreviewWorklog,
        '',
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: 'desc',
          status: '',
        }),
      ]),
    );
  });
});
