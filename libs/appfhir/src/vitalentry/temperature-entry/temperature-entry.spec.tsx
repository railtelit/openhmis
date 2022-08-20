import { render } from '@testing-library/react';

import TemperatureEntry from './temperature-entry';

describe('TemperatureEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TemperatureEntry />);
    expect(baseElement).toBeTruthy();
  });
});
