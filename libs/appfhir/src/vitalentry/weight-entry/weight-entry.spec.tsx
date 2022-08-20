import { render } from '@testing-library/react';

import WeightEntry from './weight-entry';

describe('WeightEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeightEntry />);
    expect(baseElement).toBeTruthy();
  });
});
