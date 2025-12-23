import React from 'react';
import Main from '../Main';
import { render } from '@testing-library/react';
import useResponsive from '@utils/hooks/useResponsive';

jest.mock('@utils/hooks/useResponsive');
jest.mock('../elements/Header', () => () => <div />);
jest.mock('../elements/Navigation', () => () => <div />);

describe('src/layouts/Main', () => {
  test('render', () => {
    useResponsive.mockReturnValue(true);
    const { asFragment } = render(<Main children={<div />} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render without token', () => {
    useResponsive.mockReturnValue(false);
    const { asFragment } = render(<Main children={<div />} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
