import React from 'react';
import renderWithRedux from '../../testUtils/renderWithRedux';
import Alert from './Alert';

describe('Alert', () => {
  it('shows alert', () => {
    const { getByTestId } = renderWithRedux(<Alert />, {
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
  });

  it('hides alert', () => {
    const { getByTestId } = renderWithRedux(<Alert />);
    const alert = getByTestId('alert');

    expect(alert).not.toHaveClass('active');
  });
});
