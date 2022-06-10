import { render } from '@testing-library/react';

import OpdComplaintForm from './opd-complaint-form';

describe('OpdComplaintForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdComplaintForm />);
    expect(baseElement).toBeTruthy();
  });
});
