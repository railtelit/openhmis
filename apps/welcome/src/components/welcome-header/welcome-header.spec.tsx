import { render } from '@testing-library/react';

import WelcomeHeader from './welcome-header';

describe('WelcomeHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeHeader />);
    expect(baseElement).toBeTruthy();
  });
});
