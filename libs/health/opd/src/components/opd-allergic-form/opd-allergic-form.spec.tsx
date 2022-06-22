import { render } from '@testing-library/react';

import OpdAllergicForm from './opd-allergic-form';

describe('OpdAllergicForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdAllergicForm />);
    expect(baseElement).toBeTruthy();
  });
});
