import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../NewInstall';
import { useRouter } from 'next/router';

jest.mock('next/router');

const productContainer = [
  'ip transit',
  'msight',
  'gameqoo',
  'antares iot',
  'neucentrix cndc',
];

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall', () => {
  productContainer.map((v) => {
    test(`render properly as ${v}`, () => {
      useRouter.mockReturnValue({ query: { productName: v }, push: jest.fn() });
      const shallow = new ShallowRenderer();
      const tree = shallow.render(<Detail />);
      expect(tree).toMatchSnapshot();
    });
  });
});
