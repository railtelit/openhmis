import { render } from '@testing-library/react';

import SnomedSearch from './snomed-search';

describe('SnomedSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnomedSearch />);
    expect(baseElement).toBeTruthy();
  });
});
