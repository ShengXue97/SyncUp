import React from 'react'

const CalendarContext = React.createContext({
    calendarEvents: [],
    addEvent: (event) => { },
    removeEvent: (id) => { }
})
export const CalendarProvider = CalendarContext.Provider
export default CalendarContext