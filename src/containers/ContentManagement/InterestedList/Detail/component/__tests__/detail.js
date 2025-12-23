import React from 'react';
import Detail from '../detail';
import { unwrap } from '@material-ui/core/test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const ComponentNaked = unwrap(Detail);
describe('src/components/containers/ContentManagement/InterestedList/Detail/component/detail', () => {
  const props = {
    classes: {
      subtitle: '',
      content: '',
      subitem: '',
    },
    tab: {
      activeTab: 2,
      setActiveTab: jest.fn(),
    },
    tabList: {
      dataList: { data: [{ name: 'name', fileUrl: 'fileUrl' }] },
      loadingTabList: { row: false, root: false },
    },
    scIntegrationStatus: true,
  };
  test('render loading true', () => {
    const customProps = {
      ...props,
      loading: true,
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading false no fill', () => {
    const customProps = {
      ...props,
      loading: false,
      data: {
        data: {
          interestId: '',
          createdAt: '',
          orderDesc: {
            productName: '',
          },
          companyName: '',
          contactPerson: {
            name: '',
            occupation: '',
            phone: '',
            email: '',
          },
          businessType: '',
          source: '',
          description: '',
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
        },
      },
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading false fill', () => {
    const customProps = {
      ...props,
      loading: false,
      data: {
        data: {
          interestId: 'tes',
          createdAt: 'tes',
          orderDesc: {
            productName: 'tes',
          },
          companyName: 'tes',
          contactPerson: {
            name: 'tes',
            occupation: 'tes',
            phone: 'tes',
            email: 'tes',
          },
          businessType: 'tes',
          source: 'tes',
          description: 'tes',
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
        },
      },
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render loading false no data', () => {
    const customProps = {
      ...props,
      loading: false,
      data: {},
    };
    const tree = shallow(<ComponentNaked {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('function test', () => {
    const customProps = {
      ...props,
      loading: false,
      data: {
        data: {
          interestId: 'tes',
          createdAt: 'tes',
          orderDesc: {
            productName: 'tes',
          },
          companyName: 'tes',
          contactPerson: {
            name: 'tes',
            occupation: 'tes',
            phone: 'tes',
            email: 'tes',
          },
          businessType: 'tes',
          source: 'tes',
          description: 'tes',
          isNetworkConnectivity: true,
          statusStarClick: 'Qualify',
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
        },
      },
    };
    shallow(<ComponentNaked {...customProps} />);
    // tree.find('#sectionScroll').props().onScroll();
    // tree.find('#attachmentName').props().onClick();
    // tree.find(Tabs).props().onChange(0);
  });
  //   test('render isloading false', () => {
  //     const customProps = {
  //       ...props,
  //       isLoading: false
  //     };
  //     const tree = shallow(<ComponentNaked {...customProps} />);
  //     expect(tree).toMatchSnapshot();
  //   });
  //   test('render isloading true', () => {
  //     const customProps = {
  //       ...props,
  //       isLoading: true
  //     };
  //     const tree = shallow(<ComponentNaked {...customProps} />);
  //     expect(tree).toMatchSnapshot();
  //   });
});
