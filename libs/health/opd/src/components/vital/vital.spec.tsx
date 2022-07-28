import { render } from '@testing-library/react';

import Vital from './vital';

describe('Vital', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Vital />);
    expect(baseElement).toBeTruthy();
  });
});
