import { render } from '@testing-library/react';

import Forbidden from './forbidden';

describe('Forbidden', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Forbidden />);
    expect(baseElement).toBeTruthy();
  });
});
