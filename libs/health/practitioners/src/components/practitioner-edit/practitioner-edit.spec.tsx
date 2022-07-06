import { render } from '@testing-library/react';

import PractitionerEdit from './practitioner-edit';

describe('PractitionerEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PractitionerEdit />);
    expect(baseElement).toBeTruthy();
  });
});
