import { render } from '@testing-library/react';

import ApiActionButton from './api-action-button';

describe('ApiActionButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiActionButton />);
    expect(baseElement).toBeTruthy();
  });
});
