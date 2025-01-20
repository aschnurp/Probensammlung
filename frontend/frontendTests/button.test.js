import React from 'react';
import { render, screen } from '@testing-library/react';
import ReusableButton from '../src/components/button';  // adjust path to your file
import '@testing-library/jest-dom';

describe('ReusableButton component', () => {
  it('renders the correct text', () => {
    render(
      <ReusableButton
        buttonVariant="contained"
        buttonColor="primary"
        buttonText="Click Me"
      />
    );

    // The button should appear with text "Click Me"
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies the correct variant and color props', () => {
    render(
      <ReusableButton
        buttonVariant="outlined"
        buttonColor="secondary"
        buttonText="Test Button"
      />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('MuiButton-outlinedSecondary'); 
    // Typically Material UI applies classes like 'MuiButton-outlined' and 'MuiButton-outlinedSecondary'
  });
});
