import './calendar.css';
import dayjs from 'dayjs';

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

const weekFront = (week, padWith = null) => {
    return [...Array(7 - week.length).fill(padWith), ...week];
}

const weekBack = (week, padWith = null) => {
    return [...week, ...Array(7 - week.length).fill(padWith)];
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar({month, year, prevMonth, nextMonth, events}) {
    const currMonthObject = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
    const weeks = splitWeeks(getDaysInMonth(currMonthObject));

    return (
        <div className='eventCalendar'>
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
                            <tr key={i} >
                                {displayWeek.map((dayObject, j) => dayObject
                                    ? <td className='dayCell'key={(dayObject.format('D'))}>
                                        {dayObject.format('D')}
                                        <div className='cellEvents'>
                                            {events.filter(event => dayObject.isSame(event.dateAndTime, 'day')).map(event =>(
                                                <div key = {event.id}>
                                                    {event.title}
                                                </div>
                                            )
                                                
                                            )}
                                        </div>
                                      </td>
                                    : <td className='nullCell' key={`${i}${j}`}></td>
                                )}
                            </tr>
                        );
                    })

                    }
                </tbody>
           </table>
        </div>
    );
}