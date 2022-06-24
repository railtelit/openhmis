import { render } from '@testing-library/react';

import Healthservices from './healthservices';

describe('Healthservices', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Healthservices />);
    expect(baseElement).toBeTruthy();
  });
});
