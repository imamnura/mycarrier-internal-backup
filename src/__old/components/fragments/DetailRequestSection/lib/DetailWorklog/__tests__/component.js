import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailWorklog from '../component';

describe('src/components/fragments/DetailRequestSection/lib/DetailWorklog', () => {
  const props = {
    classes: {},
    data: {
      worklog: [
        {
          dateTime: new Date(Date.UTC(2010, 10, 10)),
          note: 'note',
          worklogStatus: 'approved',
          createdBy: 'created by creator',
        },
      ],
      status: 'approved',
    },
    message: {},
    stepperProps: {
      stepperTitle: 'Stepper Title',
    },
    status: {
      value: 'value',
      custom: () => {
        return {
          note: 'note',
        };
      },
      customFunction: jest.fn(),
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailWorklog {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render negatif', () => {
    const customProps = {
      ...props,
      data: {
        worklog: [
          {
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: 'note',
            worklogStatus: 'returned',
            createdBy: 'created by creator',
          },
        ],
        status: 'returned',
      },
      message: {
        returned: {
          title: 'negatif',
          note: 'note negatif',
        },
      },
      status: {
        value: 'returned',
        custom: () => {
          return {
            note: 'createdBy',
          };
        },
        customFunction: jest.fn(),
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailWorklog {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render activation status', () => {
    const customProps = {
      ...props,
      data: {
        worklog: [
          {
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: 'note',
            worklogStatus: 'returned',
            createdBy: 'created by creator',
            activationStatus: 'activation status',
          },
          {
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: 'note',
            worklogStatus: 'returned',
            createdBy: 'created by creator',
            activationStatus: 'rejected',
          },
          {
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: 'note',
            worklogStatus: 'returned',
            createdBy: 'created by creator',
            activationStatus: 'returned',
          },
          {
            dateTime: new Date(Date.UTC(2010, 10, 10)),
            note: 'note',
            worklogStatus: 'returned',
            createdBy: 'created by creator',
            activationStatus: 'returned-updated',
          },
        ],
        status: 'returned',
      },
      message: {
        returned: {
          title: 'negatif',
          note: 'note negatif',
        },
      },
      status: {
        value: 'returned',
        custom: jest.fn(),
        customFunction: jest.fn(),
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailWorklog {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
