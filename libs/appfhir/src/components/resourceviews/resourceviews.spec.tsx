import { render } from '@testing-library/react';

import Resourceviews from './resourceviews';

describe('Resourceviews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Resourceviews />);
    expect(baseElement).toBeTruthy();
  });
});
