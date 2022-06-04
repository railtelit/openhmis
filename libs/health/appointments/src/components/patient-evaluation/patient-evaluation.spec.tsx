import { render } from '@testing-library/react';

import PatientEvaluation from './patient-evaluation';

describe('PatientEvaluation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientEvaluation />);
    expect(baseElement).toBeTruthy();
  });
});
