import { render } from '@testing-library/react';

import DxProcedures from './dx-procedures';

describe('DxProcedures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DxProcedures />);
    expect(baseElement).toBeTruthy();
  });
});
