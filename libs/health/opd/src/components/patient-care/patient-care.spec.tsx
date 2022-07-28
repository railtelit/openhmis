import { render } from '@testing-library/react';

import PatientCare from './patient-care';

describe('PatientCare', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientCare />);
    expect(baseElement).toBeTruthy();
  });
});
