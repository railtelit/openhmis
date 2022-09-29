import { render } from '@testing-library/react';

import ManageAdmin from './manage-admin';

describe('ManageAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
