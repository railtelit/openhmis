import { render } from '@testing-library/react';

import OpdMedicationForm from './opd-medication-form';

describe('OpdMedicationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdMedicationForm />);
    expect(baseElement).toBeTruthy();
  });
});
