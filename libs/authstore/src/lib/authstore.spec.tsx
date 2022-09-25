import { render } from '@testing-library/react';

import Authstore from './authstore';

describe('Authstore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Authstore />);
    expect(baseElement).toBeTruthy();
  });
});
