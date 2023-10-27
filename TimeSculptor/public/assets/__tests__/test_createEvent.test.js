import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddEvent from './AddEvent';

describe('AddEvent component', () => {
  it('renders the AddEvent component with a button', () => {
    render(<AddEvent addEventFunction={() => {}} />);

    // Check if the "Add Event" button is in the window
    const addButton = screen.getByText('Add Event');
    expect(addButton).toBeInTheDocument();
  });

  it('opens the event dialog when the button is clicked', () => {
    render(<AddEvent addEventFunction={() => {}} />);

    // Get the "Add Event" button
    const addButton = screen.getByText('Add Event');

    // Click the button
    fireEvent.click(addButton);

    // Check if the event dialog is opened
    const eventDialog = screen.getByTestId('event-dialog');
    expect(eventDialog).toBeInTheDocument();
  });

  it('closes the event dialog when the close function is called', () => {
    render(<AddEvent addEventFunction={() => {}} />);

    // Get the "Add Event" button
    const addButton = screen.getByText('Add Event');

    // Click the button to open the dialog
    fireEvent.click(addButton);

    // Check if the event dialog is opened
    const eventDialog = screen.getByTestId('event-dialog');
    expect(eventDialog).toBeInTheDocument();

    // Close the dialog by calling the close function
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    // Check if the event dialog is closed
    expect(eventDialog).not.toBeInTheDocument();
  });
});