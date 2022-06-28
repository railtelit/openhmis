import { render } from '@testing-library/react';

import NameFormField from './name-form-field';

describe('NameFormField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NameFormField />);
    expect(baseElement).toBeTruthy();
  });
});
