import { render } from '@testing-library/react';

import HealthPractitioners from './health-practitioners';

describe('HealthPractitioners', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthPractitioners />);
    expect(baseElement).toBeTruthy();
  });
});
