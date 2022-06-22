import { render } from '@testing-library/react';

import OpdInvestigationsForm from './opd-investigations-form';

describe('OpdInvestigationsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdInvestigationsForm />);
    expect(baseElement).toBeTruthy();
  });
});
