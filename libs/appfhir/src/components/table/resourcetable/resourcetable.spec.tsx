import { render } from '@testing-library/react';

import Resourcetable from './resourcetable';

describe('Resourcetable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Resourcetable />);
    expect(baseElement).toBeTruthy();
  });
});
