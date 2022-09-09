import { render } from '@testing-library/react';

import PageFooter from './page-footer';

describe('PageFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageFooter />);
    expect(baseElement).toBeTruthy();
  });
});
