import { render } from '@testing-library/react';

import CodeInput from './code-input';

describe('CodeInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CodeInput />);
    expect(baseElement).toBeTruthy();
  });
});
