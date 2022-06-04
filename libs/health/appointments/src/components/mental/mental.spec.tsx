import { render } from '@testing-library/react';

import Mental from './mental';

describe('Mental', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mental />);
    expect(baseElement).toBeTruthy();
  });
});
