import { render } from '@testing-library/react';

import HealthCalendar from './health-calendar';

describe('HealthCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
