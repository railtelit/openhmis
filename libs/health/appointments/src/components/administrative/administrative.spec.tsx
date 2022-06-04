import { render } from '@testing-library/react';

import Administrative from './administrative';

describe('Administrative', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Administrative />);
    expect(baseElement).toBeTruthy();
  });
});
