import { render } from '@testing-library/react';

import OtpTimeout from './otp-timeout';

describe('OtpTimeout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OtpTimeout />);
    expect(baseElement).toBeTruthy();
  });
});
