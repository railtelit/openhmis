import { render } from '@testing-library/react';

import OpdNoteForm from './opd-note-form';

describe('OpdNoteForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpdNoteForm />);
    expect(baseElement).toBeTruthy();
  });
});
