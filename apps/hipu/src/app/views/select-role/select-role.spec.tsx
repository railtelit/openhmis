import { render } from '@testing-library/react';

import SelectRole from './select-role';

describe('SelectRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectRole />);
    expect(baseElement).toBeTruthy();
  });
});
