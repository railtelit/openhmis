import { render } from '@testing-library/react';

import ManageProfile from './manage-profile';

describe('ManageProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageProfile />);
    expect(baseElement).toBeTruthy();
  });
});
