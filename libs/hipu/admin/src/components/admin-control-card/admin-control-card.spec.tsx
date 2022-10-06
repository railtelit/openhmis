import { render } from '@testing-library/react';

import AdminControlCard from './admin-control-card';

describe('AdminControlCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminControlCard />);
    expect(baseElement).toBeTruthy();
  });
});
