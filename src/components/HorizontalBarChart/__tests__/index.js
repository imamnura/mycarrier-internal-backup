import React from 'react';
import { render, act } from '@testing-library/react';
import HorizontalBarChart, { _tooltipLabel } from '../HorizontalBarChart';
import { ThemeProvider } from '@emotion/react';
import legionTheme from '@styles/legionTheme';

jest.useFakeTimers();

describe('src/components/Checkbox', () => {
  test('tooltipLabel', () => {
    expect(_tooltipLabel({ indexValue: 'x' })).toEqual('x');
  });

  test('render', () => {
    const { container, rerender } = render(
      <ThemeProvider theme={legionTheme}>
        <HorizontalBarChart data={[]} loading={true} />,
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={legionTheme}>
        <HorizontalBarChart
          data={[
            { value: 0, label: null },
            { value: 0, label: 'Sample Long Label' },
            { value: 0, label: 'Short' },
          ]}
          loading={false}
        />
      </ThemeProvider>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(container).toBeTruthy();
  });
});
