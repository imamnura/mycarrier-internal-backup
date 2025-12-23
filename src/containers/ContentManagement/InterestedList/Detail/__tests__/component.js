import React, { useState, useEffect } from 'react';
import Component from '../component';
import { useRouter } from 'next/router';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import ShallowRenderer from 'react-test-renderer/shallow';

configure({ adapter: new Adapter() });

jest.mock('next/router');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/ContentManagement/InterestedList/Detail/component', () => {
  let props = {
    action: {
      getInterestedDetail: jest.fn(),
      submitInterestMapping: jest.fn(),
      // searchAMMappingProfile: jest.fn(),
    },
  };
  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({ query: { id: 'id' } });
  });

  test('render component no interestedlistdetail', () => {
    const customProps = {
      ...props,
      search: '',
      feature: [''],
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render component with interestedlistdetail', () => {
    const customProps = {
      ...props,
      search: '',
      feature: [''],
      interestedListDetail: {
        data: {
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
          companyDetail: {
            companyName: 'tes',
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render component with interestedlistdetail data', () => {
    const customProps = {
      ...props,
      search: '',
      feature: [''],
      interestedListDetail: {
        data: {
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
          companyDetail: {
            companyName: 'tes',
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render interestedlistdetail with fetch tabList', () => {
    const customProps = {
      ...props,
      search: '',
      feature: [''],
      initLoading: false,
      initScIntegrationStatus: true,
      interestedListDetail: {
        data: {
          isNetworkConnectivity: true,
          statusStarClick: 'Qualify',
          worklog: [
            {
              status: 'Waiting',
              timestamp: '2021-11-10 19:42:20',
            },
          ],
          companyDetail: {
            companyName: 'tes',
          },
        },
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle refresh', () => {
    const customProps = {
      ...props,
      search: '',
      feature: [''],
      initLoading: false,
      initScIntegrationStatus: true,
      interestedListDetail: {
        data: {
          isNetworkConnectivity: true,
          statusStarClick: 'Qualify',
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
          companyDetail: {
            companyName: 'tes',
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#btnRefresh').props().onClick();
  });

  test('handle chooseoption', () => {
    const customProps = {
      ...props,
      search: '',
      feature: ['update_assignAM'],
      initLoading: false, // for showing content
      initConfirmInvalid: true, // for show confirmation invalid
      initChooseOption: true, // for show option after valid button
      interestedListDetail: {
        data: {
          status: 'Waiting',
          contactPerson: { email: 'test@gmail.com' },
          sendEmail: { statusEmail: 'failed' },
          worklog: [
            {
              status: 'tes',
              timestamp: 'tes',
            },
          ],
          companyDetail: {
            companyName: 'tes',
          },
        },
      },
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find('#btnInvalid').props().onClick();
    tree.find('#btnYesInvalid').props().onClick();
    tree.find('#btnNoInvalid').props().onClick();

    tree.find('#btnValid').props().onClick();
    tree.find('#btnAssign').props().onClick();
    tree.find('#btnEmail').props().onClick();
    tree.find('#btnCancel').props().onClick();
  });

  //   test('render component with interestedlistdetail data status Waiting click yes', () => {
  //     const customProps = {
  //       ...props,
  //       search: '',
  //       feature: ['update_assignAM'],
  //       interestedListDetail: {
  //         data: {
  //           status: 'Waiting',
  //         }
  //       }
  //     };
  //     const tree = shallow(<Component {...customProps} />);
  //     tree.find('#yesbutton').props().onClick();
  //     expect(tree).toMatchSnapshot();
  //   });
  //   test('render component with interestedlistdetail data status Waiting click no', () => {
  //     const customProps = {
  //       ...props,
  //       search: '',
  //       feature: ['update_assignAM'],
  //       interestedListDetail: {
  //         data: {
  //           status: 'Waiting',
  //         }
  //       }
  //     };
  //     const tree = shallow(<Component {...customProps} />);
  //     tree.find('#nobutton').props().onClick();
  //     expect(tree).toMatchSnapshot();
  //   });
  //   test('render Reassign AM', () => {
  //     const customProps = {
  //       ...props,
  //       search: '',
  //       feature: ['update_reassignAM'],
  //       interestedListDetail: {
  //         data: {
  //           status: 'Valid',
  //           sendEmail: {},
  //           amMapping: 'test'
  //         }
  //       }
  //     };
  //     const tree = shallow(<Component {...customProps} />);
  //     expect(tree).toMatchSnapshot();
  //     tree.find('#reassignbutton').props().onClick();
  //   });
});
