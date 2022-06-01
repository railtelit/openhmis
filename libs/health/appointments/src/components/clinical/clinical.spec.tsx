import { render } from '@testing-library/react';

import Clinical from './clinical';

describe('Clinical', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Clinical />);
    expect(baseElement).toBeTruthy();
  });
});
