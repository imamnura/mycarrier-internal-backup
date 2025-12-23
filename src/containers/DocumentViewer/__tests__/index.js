import React, { useEffect, useContext } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DocumentViewer from '../index';
import { cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';

jest.mock('next/router');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useContext: jest.fn(),
}));

describe('src/containers/DocumentViewer', () => {
  afterEach(() => cleanup());

  beforeAll(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: {
        url: 'test',
        name: 'test',
      },
    });
    useEffect.mockImplementation((func) => func());
    useContext.mockReturnValue({ setData: () => {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DocumentViewer />);
    expect(tree).toMatchSnapshot();
  });
});
