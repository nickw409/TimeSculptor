import React from 'react';
import { render } from '@testing-library/react';
import Event from './Event';

// set a test event 
const eventProps = {
  image: 'test-image-url',
  title: 'Test Event',
  time: '12:00 PM',
  date: '2023-10-24',
};

describe('Event component', () => {
  it('renders the event component with props', () => {
    const { container } = render(<Event {...eventProps} />);

    // Check if time, date and event title copy correctly
    expect(container.querySelector('h2')).toHaveTextContent(eventProps.title);
    expect(container.querySelector('p[data-testid="time"]')).toHaveTextContent(`Time: ${eventProps.time}`);
    expect(container.querySelector('p[data-testid="date"]')).toHaveTextContent(`Date: ${eventProps.date}`);

    // Check the event image
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveAttribute('src', eventProps.image);
  });

  it('renders a checkbox input', () => {
    const { container } = render(<Event {...eventProps} />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Event {...eventProps} />);
    expect(container).toMatchSnapshot();
  });
});
