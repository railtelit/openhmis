import { render } from '@testing-library/react';

import LabReport from './lab-report';

describe('LabReport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LabReport />);
    expect(baseElement).toBeTruthy();
  });
});
