import { render } from '@testing-library/react';

import SetupLocation from './setup-location';

describe('SetupLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetupLocation />);
    expect(baseElement).toBeTruthy();
  });
});
