import { render } from '@testing-library/react';

import DashboardCards from './dashboard-cards';

describe('DashboardCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardCards />);
    expect(baseElement).toBeTruthy();
  });
});
