import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LinkBakes from '../LinkBakes';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionReturn = {
  BAKESName: '',
  bakesOptions: [{ value: 'test' }],
  control: {},
  loadingBakesOptions: false,
  formState: {
    isValid: false,
    isDirty: false,
  },
  step: 0,
  chooseBakes: '',
  handleSubmit: jest.fn(),
};

describe('src/pages/Document/ModificationOrder/Detail/lib/forms/LinkBakes', () => {
  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });

  test('render with step', () => {
    const actionReturn = {
      ...useActionReturn,
      step: 0,
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });

  test('render with other step', () => {
    const actionReturn = {
      ...useActionReturn,
      BAKESName: 'test',
      chooseBakes: 'existing',
      step: 1,
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });

  test('render with other chooseBakes', () => {
    const actionReturn = {
      ...useActionReturn,
      chooseBakes: 'upload',
      step: 1,
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });

  test('render with other chooseBakes 2', () => {
    const actionReturn = {
      ...useActionReturn,
      chooseBakes: 'create',
      step: 1,
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });

  test('render while Valid', () => {
    const actionReturn = {
      ...useActionReturn,
      formState: {
        isValid: true,
        isDirty: true,
      },
    };
    useActions.mockReturnValue(actionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LinkBakes />);
    expect(tree).toMatchSnapshot();
  });
});
