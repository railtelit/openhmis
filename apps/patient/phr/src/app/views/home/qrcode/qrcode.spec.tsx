import { render } from '@testing-library/react';

import Qrcode from './qrcode';

describe('Qrcode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Qrcode />);
    expect(baseElement).toBeTruthy();
  });
});
