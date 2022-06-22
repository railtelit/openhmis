import { render } from '@testing-library/react';

import AppointmentsList from './appointments-list';

describe('AppointmentsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppointmentsList />);
    expect(baseElement).toBeTruthy();
  });
});
