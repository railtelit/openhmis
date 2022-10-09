import { render } from '@testing-library/react';

import ManageWorker from './manage-worker';

describe('ManageWorker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageWorker />);
    expect(baseElement).toBeTruthy();
  });
});
