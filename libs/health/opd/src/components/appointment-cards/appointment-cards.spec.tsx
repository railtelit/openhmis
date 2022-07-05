import { render } from '@testing-library/react';

import AppointmentCards from './appointment-cards';

describe('AppointmentCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppointmentCards />);
    expect(baseElement).toBeTruthy();
  });
});
