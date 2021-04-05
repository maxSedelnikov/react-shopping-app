import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders home page', () => {
    const { getByText } = render(<Home />);
    const heading = getByText(/Home page/i);

    expect(heading).toBeInTheDocument();
  });
});
