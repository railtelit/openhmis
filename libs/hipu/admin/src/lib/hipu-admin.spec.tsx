import { render } from '@testing-library/react';

import HipuAdmin from './hipu-admin';

describe('HipuAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HipuAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
