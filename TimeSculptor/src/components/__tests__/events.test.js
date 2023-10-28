const EventTable = require("../events")

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
test("creating an event in the future should work", () => {
  const{ daTest1 } = EventTable( testEvent1 );

  expect(daTest1).toEqual(testEvent1);
})

// test to see that a second event also works in the function
test("creating an event", () => {
  const{ daTest2 } = EventTable( testEvent2 );

  expect(daTest2).toEqual(testEvent2);
})
