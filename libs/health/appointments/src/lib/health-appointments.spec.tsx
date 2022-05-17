import { render } from '@testing-library/react';

import HealthAppointments from './health-appointments';

describe('HealthAppointments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthAppointments />);
    expect(baseElement).toBeTruthy();
  });
});
