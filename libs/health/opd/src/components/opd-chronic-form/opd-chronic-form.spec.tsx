import { render } from '@testing-library/react';

import OpdChronicForm from './opd-chronic-form';

describe('OpdChronicForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdChronicForm />);
    expect(baseElement).toBeTruthy();
  });
});
