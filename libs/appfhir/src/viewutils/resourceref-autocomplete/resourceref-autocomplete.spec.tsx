import { render } from '@testing-library/react';

import ResourcerefAutocomplete from './resourceref-autocomplete';

describe('ResourcerefAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResourcerefAutocomplete />);
    expect(baseElement).toBeTruthy();
  });
});
