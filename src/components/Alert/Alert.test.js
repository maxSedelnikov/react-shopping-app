import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';

jest.mock('react-redux');

describe('Alert', () => {
  it('shows alert', () => {
    useSelector.mockImplementation((cb) =>
      cb({
        alert: {
          showAlert: true,
          type: 'error',
          message: 'Some error appeared...',
        },
      })
    );
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(<Alert />);
    const alert = getByTestId('alert');

    expect(alert).toHaveClass('active');
    expect(alert).toHaveTextContent('Some error appeared...');
  });

  it('hides alert', () => {
    useSelector.mockImplementation((cb) =>
      cb({
        alert: {
          showAlert: false,
          type: 'error',
          message: 'Some error appeared...',
        },
      })
    );
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(<Alert />);
    const alert = getByTestId('alert');

    expect(alert).not.toHaveClass('active');
  });
});
