import { render } from '@testing-library/react';

import Projectimages from './projectimages';

describe('Projectimages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Projectimages />);
    expect(baseElement).toBeTruthy();
  });
});
