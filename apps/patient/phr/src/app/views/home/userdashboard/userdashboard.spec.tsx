import { render } from '@testing-library/react';

import Userdashboard from './userdashboard';

describe('Userdashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Userdashboard />);
    expect(baseElement).toBeTruthy();
  });
});
