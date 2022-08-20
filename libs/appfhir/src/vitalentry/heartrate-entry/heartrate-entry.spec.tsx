import { render } from '@testing-library/react';

import HeartrateEntry from './heartrate-entry';

describe('HeartrateEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeartrateEntry />);
    expect(baseElement).toBeTruthy();
  });
});
