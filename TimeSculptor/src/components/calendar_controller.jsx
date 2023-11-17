import Calendar from './calendar';
import {useState} from 'react';
import dayjs from 'dayjs';

export default function CalendarController({events, getTextColor = null, updateViewType = null, setSelectedDay = null}) {
    const today = dayjs();
    const [currMonthObject, setCurrMonthObject] = useState(today);

    const nextMonth = () => {
        setCurrMonthObject(currMonthObject.add(1, 'month'))
    }

    const prevMonth = () => {
        setCurrMonthObject(currMonthObject.subtract(1, 'month'));
    }

    const handleDayClick = (day) => {
        setSelectedDay(day);
        updateViewType("daily");
    }


    return (
        <Calendar 
            month={currMonthObject.format('MM')}
            year={currMonthObject.format('YYYY')}
            prevMonth={prevMonth} 
            nextMonth={nextMonth} 
            events={events}
            getTextColor={getTextColor}
            dayClick ={handleDayClick}
        />
    )
}