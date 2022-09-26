import { render } from '@testing-library/react';

import AppToolbar from './app-toolbar';

describe('AppToolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppToolbar />);
    expect(baseElement).toBeTruthy();
  });
});
