import { render } from '@testing-library/react';

import ManagePractitioner from './manage-practitioner';

describe('ManagePractitioner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManagePractitioner />);
    expect(baseElement).toBeTruthy();
  });
});
