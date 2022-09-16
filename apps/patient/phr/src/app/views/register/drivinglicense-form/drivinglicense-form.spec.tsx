import { render } from '@testing-library/react';

import DrivinglicenseForm from './drivinglicense-form';

describe('DrivinglicenseForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrivinglicenseForm />);
    expect(baseElement).toBeTruthy();
  });
});
