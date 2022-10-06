import { render } from '@testing-library/react';

import Viewutils from './viewutils';

describe('Viewutils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Viewutils />);
    expect(baseElement).toBeTruthy();
  });
});
