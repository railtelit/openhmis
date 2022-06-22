import { render } from '@testing-library/react';

import OpdHistoryForm from './opd-history-form';

describe('OpdHistoryForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdHistoryForm />);
    expect(baseElement).toBeTruthy();
  });
});
