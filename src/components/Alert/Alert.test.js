import { waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import React from 'react';

import renderWithRedux from 'testUtils/renderWithRedux';

import Alert from './Alert';

describe('Alert', () => {
  it('shows and autohides the alert', async () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<Alert />, {
      initialState: {
        alert: {
          showAlert: true,
          type: 'error',
          message: 'Some error appeared...',
        },
      },
    });
    const alert = getByTestId('alert');

    expect(alert).toHaveClass('active');
    expect(alert).toHaveTextContent(/Some error appeared/i);

    await act(() =>
      waitFor(() => expect(queryByTestId('alert')).not.toHaveClass('active'), {
        timeout: 3000,
      })
    );
  });
});
