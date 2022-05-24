import { render } from '@testing-library/react';

import AppointmentsEdit from './appointments-edit';

describe('AppointmentsEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppointmentsEdit />);
    expect(baseElement).toBeTruthy();
  });
});
