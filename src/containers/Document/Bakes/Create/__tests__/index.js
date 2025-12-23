import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index, { checkLastChange } from '../index';
import { configure, mount } from 'enzyme';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';
import legionTheme from '@styles/legionTheme';
import { ThemeProvider as LegionProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core/styles';

configure({ adapter: new Adapter() });

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe('src/pages/GeneralProduct/BakesCreate/index', () => {
  it('Snapshots for index page', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: {},
      },
      loading: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);
    const tree = mount(
      <LegionProvider theme={legionTheme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Index feature={['']} />
          </Provider>
        </ThemeProvider>
      </LegionProvider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('checkLastChange function', () => {
    expect(checkLastChange({ approvalType: 'x' })).toEqual(4);
    expect(checkLastChange({ termOfPayment: 'x' })).toEqual(3);
    expect(checkLastChange({ toc: ['x'] })).toEqual(2);
    expect(checkLastChange({ valueAgreement: 'x' })).toEqual(1);
    expect(checkLastChange({ telkomPic: { name: 'x' } })).toEqual(0);
  });
});
