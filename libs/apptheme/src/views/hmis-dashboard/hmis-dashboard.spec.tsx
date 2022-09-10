import { render } from '@testing-library/react';

import HmisDashboard from './hmis-dashboard';

describe('HmisDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HmisDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
