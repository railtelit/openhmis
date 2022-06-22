import { render } from '@testing-library/react';

import PatientsEdit from './patients-edit';

describe('PatientsEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientsEdit />);
    expect(baseElement).toBeTruthy();
  });
});
