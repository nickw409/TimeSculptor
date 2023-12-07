import React from 'react';
import { render } from '@testing-library/react';
import Event from '../Event';

// create a test event to input into the table 
const testEvent1 = {
  title: "test event 1",
  time: "12:00 PM",
  date: "2057-10-24",
};
// create another test event to input into the table
const testEvent2 = {
  title: "test event 2",
  time: "1:59 PM",
  date: "2001-9-10",
};

// test to see that an event can be added to the table 
it("should create a new event with the same data as the created event", () => {
  const { event1 } = render(<Event {...testEvent1} />);

  // see that the inputted event matches the event created at start
  expect(daTest1).toEqual(testEvent1);
})

// test to see that a second event also works in the function
it("should create an event with matching data", () => {
  const{ daTest2 } = render(<Event {...testEvent2} />);

  // see that the inputted event matches the event created at start
  expect(daTest2).toEqual(testEvent2);
})
