import { render } from '@testing-library/react';

import HealthConfigurations from './health-configurations';

describe('HealthConfigurations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HealthConfigurations />);
    expect(baseElement).toBeTruthy();
  });
});
