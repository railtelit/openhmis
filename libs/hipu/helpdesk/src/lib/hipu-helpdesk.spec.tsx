import { render } from '@testing-library/react';

import HipuHelpdesk from './hipu-helpdesk';

describe('HipuHelpdesk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HipuHelpdesk />);
    expect(baseElement).toBeTruthy();
  });
});
