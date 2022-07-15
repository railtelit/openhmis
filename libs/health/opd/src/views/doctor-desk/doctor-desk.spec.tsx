import { render } from '@testing-library/react';

import DoctorDesk from './doctor-desk';

describe('DoctorDesk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoctorDesk />);
    expect(baseElement).toBeTruthy();
  });
});
