import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import { configure, mount } from 'enzyme';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';
import legionTheme from '@styles/legionTheme';
import { ThemeProvider as LegionProvider } from '@emotion/react';

configure({ adapter: new Adapter() });

describe('src/containers/ContentManagement/InterestedList/Report/index', () => {
  test('Snapshoot for index page', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      interestedListReport: {
        listProduct: [],
        listSource: [],
        graphInterestedStatus: {
          data: [],
          params: {},
        },
        graphInterestedProduct: {
          data: [],
          params: {},
        },
        graphInterestedAM: {
          data: [],
          meta: {},
        },
        graphInterestedSegment: {
          data: [],
          meta: {},
        },
      },
      loading: {
        isLoading: false,
      },
      search: {
        search: '',
      },
    };
    const props = {
      actions: {},
      feature: [],
      classes: {},
    };
    const store = mockStore(initialState);
    const tree = mount(
      // <Provider store={store}>
      //   <MuiThemeProvider theme={theme}>
      //     <Index {...props} />
      //   </MuiThemeProvider>
      // </Provider>,
      <LegionProvider theme={legionTheme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Index {...props} />
          </Provider>
        </ThemeProvider>
      </LegionProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
