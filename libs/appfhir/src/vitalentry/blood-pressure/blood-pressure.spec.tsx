import { render } from '@testing-library/react';

import BloodPressure from './blood-pressure';

describe('BloodPressure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BloodPressure />);
    expect(baseElement).toBeTruthy();
  });
});
