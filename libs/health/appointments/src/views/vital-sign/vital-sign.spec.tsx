import { render } from '@testing-library/react';

import VitalSign from './vital-sign';

describe('VitalSign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VitalSign />);
    expect(baseElement).toBeTruthy();
  });
});
