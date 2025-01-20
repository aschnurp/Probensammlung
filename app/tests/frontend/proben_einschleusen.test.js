/**
 * @file proben_einschleusen.test.js
 * This shows how to test a Next.js page that uses axios
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SampleForm from '../src/pages/proben_einschleusen'; // adjust path
import '@testing-library/jest-dom';

// Mock the entire axios module
jest.mock('axios');

describe('SampleForm (proben_einschleusen.js) page tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the form fields', () => {
    render(<SampleForm />);
    
    // Check for a form input
    expect(screen.getByLabelText(/Patienten ID \(Intern\)/i)).toBeInTheDocument();
    // or check for the Select
    expect(screen.getByLabelText(/Probenart/i)).toBeInTheDocument();
  });

  it('shows errors if trying to submit empty form', async () => {
    render(<SampleForm />);

    // Click the send button
    fireEvent.click(screen.getByRole('button', { name: /senden/i }));
    
    // Wait for validation errors to appear
    expect(await screen.findByText(/Probenart ist erforderlich/i)).toBeInTheDocument();
    expect(await screen.findByText(/Patienten ID ist erforderlich/i)).toBeInTheDocument();
  });

  it('submits data and shows success snackbar', async () => {
    // Mock a successful response from axios
    axios.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<SampleForm />);

    // Fill out required fields
    fireEvent.change(screen.getByLabelText(/Patienten ID \(Intern\)/i), {
      target: { value: 'P1234' },
    });
    fireEvent.mouseDown(screen.getByLabelText(/Probenart/i)); // for MUI Select
    fireEvent.click(screen.getByRole('option', { name: /Gewebeproben/i }));
    
    // Provide other required fields (like created_at)
    const dateField = screen.getByLabelText(/Datum/i);
    fireEvent.change(dateField, { target: { value: '2025-01-01' } });
    
    // ... fill the rest of the required fields as needed, e.g.:
    fireEvent.change(screen.getByLabelText(/Raum/i), { target: { value: '1029' } });
    fireEvent.change(screen.getByLabelText(/Boxnummer/i), { target: { value: '3' } });
    // etc.

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /senden/i }));

    // Wait for axios.post to have been called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    // We can check the arguments of axios.post
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/new_data/gewebe', 
      expect.any(Object), // We could do a deeper check with the exact object
      expect.any(Object)
    );

    // Wait for the success snackbar
    expect(await screen.findByText(/Daten erfolgreich gesendet!/i)).toBeInTheDocument();
  });

  it('handles error response from the server', async () => {
    // Mock an error response
    axios.post.mockRejectedValueOnce({
      response: { data: { detail: 'Some error from server' } },
    });

    render(<SampleForm />);

    // Fill out the required fields quickly
    fireEvent.change(screen.getByLabelText(/Patienten ID \(Intern\)/i), {
      target: { value: 'P9999' },
    });
    // fill other fields similarly ...
    fireEvent.mouseDown(screen.getByLabelText(/Probenart/i));
    fireEvent.click(screen.getByRole('option', { name: /Serumproben/i }));
    const dateField = screen.getByLabelText(/Datum/i);
    fireEvent.change(dateField, { target: { value: '2025-05-01' } });
    // etc.

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /senden/i }));

    // Check if axios was called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    // Check that we show an error notification
    expect(await screen.findByText(/Fehler beim Senden der Daten/i)).toBeInTheDocument();
  });
});
