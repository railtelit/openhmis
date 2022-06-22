import { render } from '@testing-library/react';

import HealthOpd from './health-opd';

describe('HealthOpd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthOpd />);
    expect(baseElement).toBeTruthy();
  });
});
