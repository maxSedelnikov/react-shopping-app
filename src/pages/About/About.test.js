import React from 'react';
import { render } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders About page', () => {
    const { getByText } = render(<About />);
    const heading = getByText(/About page/i);

    expect(heading).toBeInTheDocument();
  });
});
