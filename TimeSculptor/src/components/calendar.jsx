import './calendar.css';
import dayjs from 'dayjs';
import ExpandedDay from './expanded_day';
import {useState} from 'react';


export const getDaysInMonth = monthDay => {
    let currMonth = monthDay.clone();
    currMonth.startOf('month');

    let days = [];

    while(currMonth.month() === monthDay.month()) {
        days.push(currMonth.clone());
        currMonth = currMonth.add(1, 'day');
    }

    return days;
}


export const splitWeeks = dayObjects => {
    let weeks = [];
    let currWeek = [];

    for (let day of dayObjects) {
        currWeek.push(day.clone());

        if (day.format('dddd') == 'Saturday') {
            weeks.push(currWeek);
            currWeek = []
        }
    }

    if (currWeek.length > 0) {
        weeks.push(currWeek);
    }

    return weeks;
}

// add "null" days to the front of the week if the week doesn't start on Sunday
const weekFront = (week, padWith = null) => {
    return [...Array(7 - week.length).fill(padWith), ...week];
}

// add "null" days to the end of the week if the week doesn't end on Saturday
const weekBack = (week, padWith = null) => {
    return [...week, ...Array(7 - week.length).fill(padWith)];
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar({month, year, prevMonth, nextMonth, events, getTextColor}) {
    const currMonthObject = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
    const weeks = splitWeeks(getDaysInMonth(currMonthObject));

    const [expandDialogOpen, setExpandDialogOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(dayjs(null));
    const [selectedEvents, setSelectedEvents] = useState([]);

    function closeExpandDialog()
        {
            setExpandDialogOpen(false);
        }

    return (
        <div key = {'evencalen'}className='eventCalendar'>
           <h1 className='monthHeading'>
                {currMonthObject.format('MMMM YYYY')}
           </h1> 
           
           <div className='changeMonthButtons'>
                <button onClick={prevMonth}> Prev </button>
                <button onClick={nextMonth}> Next </button>
           </div>
           
           <table className='calendarTable'>
                <thead>
                    <tr>{weekDays.map(day => <th key={day}>{day}</th>)}</tr>
                </thead>
                <tbody>
                    {weeks.map((week, i) => {
                        const displayWeek = i === 0
                        ? weekFront(week)
                        : i === weeks.length - 1
                            ? weekBack(week)
                            : week;
                        
                        return (
                            // Process each day
                            <tr key={i}>
                                {displayWeek.map((dayObject, j) => {
                                    let currEvents = []

                                    if (dayObject) {
                                        currEvents = events
                                            .filter(event => dayObject.isSame(event.dateAndTime, 'day'))
                                            .sort((first_event, second_event) =>
                                                dayjs(first_event.dateAndTime).isBefore(second_event.dateAndTime) ? -1 : 1
                                            );
                                    }

                                    return dayObject ? (
                                        <td 
                                            className='dayCell' 
                                            onClick={() =>{
                                                console.log(currEvents)
                                                setExpandDialogOpen(true);
                                                setSelectedDay(dayObject);
                                                setSelectedEvents(currEvents);
                                                console.log(selectedEvents); 
                                            }} 
                                            key={(dayObject.format('D'))}
                                        >

                                            {/* Print the numerical value of the day */}
                                            {dayObject.format('D')}

                                            {/* Print the events associated with current day */}
                                            <div className='cellEvents'>
                                                {/*match all events that are on the same day, then sort them by time*/}
                                                {currEvents.map(event =>(
                                                        <div key = {event.id} className='cellEvent' style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                                                           <img src={event.icon} alt={event.id} /> <div className='cellEventText'>{event.title} @ {dayjs(event.dateAndTime).format('LT')}</div>
                                                        </div>
                                                    )
                                                    
                                                )}
                                            </div>
                                        </td>
                                    ) : (
                                        <td className='nullCell' key={`${i}${j}`}></td>
                                    );
                                })} 
                            </tr>
                            
                        );
                    })

                    }
                </tbody>
           </table>
           <ExpandedDay key = {'expandday'} open={expandDialogOpen} close={closeExpandDialog} day={selectedDay} events={selectedEvents} getTextColor={getTextColor}/>
        </div>
    );
}