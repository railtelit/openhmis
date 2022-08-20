import { render } from '@testing-library/react';

import BloodgroupEntry from './bloodgroup-entry';

describe('BloodgroupEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BloodgroupEntry />);
    expect(baseElement).toBeTruthy();
  });
});
