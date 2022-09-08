import { render } from '@testing-library/react';

import WelcomeMain from './welcome-main';

describe('WelcomeMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeMain />);
    expect(baseElement).toBeTruthy();
  });
});
