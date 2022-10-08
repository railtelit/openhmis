import { render } from '@testing-library/react';

import SetupOrg from './setup-org';

describe('SetupOrg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetupOrg />);
    expect(baseElement).toBeTruthy();
  });
});
