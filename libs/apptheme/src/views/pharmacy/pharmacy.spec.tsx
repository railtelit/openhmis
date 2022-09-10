import { render } from '@testing-library/react';

import Pharmacy from './pharmacy';

describe('Pharmacy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pharmacy />);
    expect(baseElement).toBeTruthy();
  });
});
