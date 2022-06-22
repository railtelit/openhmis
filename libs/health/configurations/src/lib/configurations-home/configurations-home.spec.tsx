import { render } from '@testing-library/react';

import ConfigurationsHome from './configurations-home';

describe('ConfigurationsHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfigurationsHome />);
    expect(baseElement).toBeTruthy();
  });
});
