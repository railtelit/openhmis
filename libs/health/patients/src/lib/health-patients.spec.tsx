import { render } from '@testing-library/react';

import HealthPatients from './health-patients';

describe('HealthPatients', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthPatients />);
    expect(baseElement).toBeTruthy();
  });
});
