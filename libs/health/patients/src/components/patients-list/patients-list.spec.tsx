import { render } from '@testing-library/react';

import PatientsList from './patients-list';

describe('PatientsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientsList />);
    expect(baseElement).toBeTruthy();
  });
});
