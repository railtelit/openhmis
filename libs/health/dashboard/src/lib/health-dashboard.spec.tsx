import { render } from '@testing-library/react';

import HealthDashboard from './health-dashboard';

describe('HealthDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
