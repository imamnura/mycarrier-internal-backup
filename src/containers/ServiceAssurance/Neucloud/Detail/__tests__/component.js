import React, { useEffect, useState } from 'react';
import Component from '../component';
import ShallowRenderer from 'react-test-renderer/shallow';
import { useRouter } from 'next/router';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

jest.mock('next/router');

describe('src/containers/ServiceAssurance/Neucloud/Detail/component', () => {
  let props = {
    actions: {
      getDetailServiceAssuranceNeucloud: jest.fn(),
      cleanUp: jest.fn(),
    },
    classes: {},
    feature: [],
  };
  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({ query: { id: '' } });
  });

  test('render', () => {
    const customProps = {
      ...props,
      detailServiceAssurance: {},
      isLoading: false,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render 2', () => {
    const customProps = {
      ...props,
      detailServiceAssurance: {},
      isLoading: false,
      feature: ['read_detail_ticket_neucloud'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render isLoading', () => {
    const customProps = {
      ...props,
      detailServiceAssurance: {},
      isLoading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  // test('render category LBA', () => {
  //   const  customProps= {
  //     ...props,
  //     detailServiceAssurance: {
  //       category : 'LBA'
  //     },
  //     isLoading: false,
  //   };
  //   const shallow = new ShallowRenderer();
  //   const tree = shallow.render(<Component {...customProps}/>);
  //   expect(tree).toMatchSnapshot();
  // });

  // test('render category LBA', () => {
  //   const  customProps= {
  //     ...props,
  //     detailServiceAssurance: {
  //       category : 'LBA',
  //       historyWorklog : [
  //         {
  //           status : 'checking'
  //         },
  //         {
  //           status : 'checking'
  //         },
  //         {
  //           status : 'returned'
  //         },
  //         {
  //           status : 'checking'
  //         },
  //         {
  //           status : 'checking'
  //         },
  //       ]
  //     },
  //     isLoading: false,
  //   };
  //   const shallow = new ShallowRenderer();
  //   const tree = shallow.render(<Component {...customProps}/>);
  //   expect(tree).toMatchSnapshot();
  // });

  // test('render loading', () => {
  //   const customProps = {
  //     ...props,
  //     isLoading: true,
  //   };
  //   const shallow = new ShallowRenderer();
  //   const tree = shallow.render(<Component {...customProps}/>);
  //   expect(tree).toMatchSnapshot();
  // });
});
