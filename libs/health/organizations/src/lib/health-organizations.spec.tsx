import { render } from '@testing-library/react';

import HealthOrganizations from './health-organizations';

describe('HealthOrganizations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthOrganizations />);
    expect(baseElement).toBeTruthy();
  });
});
