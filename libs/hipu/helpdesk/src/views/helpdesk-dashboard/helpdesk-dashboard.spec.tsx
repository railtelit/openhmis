import { render } from '@testing-library/react';

import HelpdeskDashboard from './helpdesk-dashboard';

describe('HelpdeskDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HelpdeskDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
