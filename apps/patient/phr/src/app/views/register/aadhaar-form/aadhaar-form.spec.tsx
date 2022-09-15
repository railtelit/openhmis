import { render } from '@testing-library/react';

import AadhaarForm from './aadhaar-form';

describe('AadhaarForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AadhaarForm />);
    expect(baseElement).toBeTruthy();
  });
});
