import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EventDetails from '../EventDetails';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/EventDetails/index', () => {
  const props = {
    previewMode: false,
    tab: 'id',
    useForm: { _control: jest.fn() },
  };

  const useActionReturn = {
    getStartDate: 'test',
    getEndDate: 'test',
    handleChangeDate: jest.fn(),
    getStartTimeRundown: 'tests',
    getEndTimeRundown: 'test',
  };

  test('render default', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventDetails {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = {
      ...props,
      tab: 'en',
    };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventDetails {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
