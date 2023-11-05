import moment from 'moment';
import './calendar.css';

export const getDaysInMonth = monthMoment => {
    const currMonth = monthMoment.clone();
    currMonth.startOf('month');

    let days = []

    while(currMonth.month() === monthMoment.month()) {
        days.push(currMonth.clone());
        currMonth.add(1, 'days');
    }

    return days;
}

export const splitWeeks = dayMoments => {
    let weeks = [];
    let currWeek = [];

    for (let day of dayMoments) {
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

export default function Calendar() {
    const currMonthMoment = moment();
    const weeks = splitWeeks(getDaysInMonth(currMonthMoment));

    return (
        <div className='eventCalendar'>
           <h1>
                {currMonthMoment.format('MMMM YYYY')}
           </h1> 

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
                            <tr key={i}>
                                {displayWeek.map((dayMoment, j) => dayMoment
                                    ? <td key={(dayMoment.format('D'))}>{dayMoment.format('D')}</td>
                                    : <td key={`${i}${j}`}></td>
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