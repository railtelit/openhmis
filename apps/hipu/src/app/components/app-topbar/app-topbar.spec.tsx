import { render } from '@testing-library/react';

import AppTopbar from './app-topbar';

describe('AppTopbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppTopbar />);
    expect(baseElement).toBeTruthy();
  });
});
