import { render } from '@testing-library/react';

import DashboardCharts from './dashboard-charts';

describe('DashboardCharts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardCharts />);
    expect(baseElement).toBeTruthy();
  });
});
