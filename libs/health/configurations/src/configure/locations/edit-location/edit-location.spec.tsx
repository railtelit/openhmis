import { render } from '@testing-library/react';

import EditLocation from './edit-location';

describe('EditLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditLocation />);
    expect(baseElement).toBeTruthy();
  });
});
