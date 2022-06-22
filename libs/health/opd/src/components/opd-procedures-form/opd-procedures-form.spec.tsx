import { render } from '@testing-library/react';

import OpdProceduresForm from './opd-procedures-form';

describe('OpdProceduresForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdProceduresForm />);
    expect(baseElement).toBeTruthy();
  });
});
