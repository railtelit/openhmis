import { render } from '@testing-library/react';

import PatientsHome from './patients-home';

describe('PatientsHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientsHome />);
    expect(baseElement).toBeTruthy();
  });
});
