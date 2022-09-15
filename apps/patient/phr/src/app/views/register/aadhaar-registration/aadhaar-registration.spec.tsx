import { render } from '@testing-library/react';

import AadhaarRegistration from './aadhaar-registration';

describe('AadhaarRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AadhaarRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
