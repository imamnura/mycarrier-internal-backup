import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AutoComplete, { AutoCompleteLoading } from '../AutoComplete';

jest.mock('@material-ui/lab/Autocomplete', () => {
  const originalModule = jest.requireActual('@material-ui/lab/Autocomplete');

  return {
    __esModule: true,
    ...originalModule,
    createFilterOptions: () => jest.fn(),
  };
});

describe('src/components/AutoComplete', () => {
  const props = {
    rightAdornment: 'R',
    options: ['satu', 'dua'],
    value: 'sa',
    loading: true,
  };

  test('render', () => {
    window.open = jest.fn();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AutoComplete {...props} />);
    AutoComplete.defaultProps.onChange();
    tree.props.onChange({}, 'val');
    tree.props.renderInput({ InputProps: { ref: {} } });
    tree.props.filterOptions(props.options, {});
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const customProps = {
      ...props,
      loading: false,
      rightAdornment: undefined,
    };
    window.open = jest.fn();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AutoComplete {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('auto complete loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AutoCompleteLoading />);
    expect(tree).toMatchSnapshot();
  });
});
