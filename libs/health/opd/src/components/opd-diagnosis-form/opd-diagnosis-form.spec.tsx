import { render } from '@testing-library/react';

import OpdDiagnosisForm from './opd-diagnosis-form';

describe('OpdDiagnosisForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdDiagnosisForm />);
    expect(baseElement).toBeTruthy();
  });
});
