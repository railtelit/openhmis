import { render } from '@testing-library/react';

import EditOrganization from './edit-organization';

describe('EditOrganization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditOrganization />);
    expect(baseElement).toBeTruthy();
  });
});
