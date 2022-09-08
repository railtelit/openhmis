import { render } from '@testing-library/react';

import AppLinkCard from './app-link-card';

describe('AppLinkCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppLinkCard />);
    expect(baseElement).toBeTruthy();
  });
});
