import { render } from '@testing-library/react';

import CommonStore from './common-store';

describe('CommonStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonStore />);
    expect(baseElement).toBeTruthy();
  });
});
