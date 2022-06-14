import { render } from '@testing-library/react';

import OpdRegister from './opd-register';

describe('OpdRegister', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdRegister />);
    expect(baseElement).toBeTruthy();
  });
});
