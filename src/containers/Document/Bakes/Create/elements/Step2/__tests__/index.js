import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import Component from '../component';
import { configure, mount, shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
}));

const props = {
  classes: {},
  data: {
    products: [{ productName: 'x', productId: 'x' }],
    typeField: {
      fileUrl: 'x',
    },
  },
  handleSubmit: jest.fn(),
  invalid: true,
  submitting: false,
  getServiceOption: jest.fn(),
  disableButton: jest.fn(),
  loadingButton: jest.fn(),
  change: jest.fn(),
  removeServiceDoc: jest.fn(),
  uploadServiceDoc: jest.fn(),
};

describe('src/pages/GeneralProduct/BakesCreate/elements/Step2', () => {
  it('Snapshots for index page step 2', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: {},
      },
      loading: {
        isLoadingLazy: false,
      },
    };
    const store = mockStore(initialState);
    const customProps = { ...props, data: { ...props.data, products: [] } };
    const tree = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Index {...customProps} />
        </MuiThemeProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('props change/click', () => {
    const customProps = { ...props };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#reqsbr').props().onChange({});
    tree.find('#sbr').props().onChange({});
    tree.find('#otherdoc').props().onChange({});
    tree
      .find('#hjmPercentage')
      .props()
      .onChange({ target: { value: 90 } });
    tree.find('#deleteService').props().onClick();
    tree
      .find('#addService')
      .props()
      .onChange({ data: { productId: 'z' } });
  });
});
