import { render } from '@testing-library/react';

import Vitalform from './vitalform';

describe('Vitalform', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Vitalform />);
    expect(baseElement).toBeTruthy();
  });
});
