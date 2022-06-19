import React from 'react'

const CalendarContext = React.createContext({
    calendarEvents: [],
    addEvent: (event) => { },
    removeEvent: (id) => { },
    editEvent: (id, newEvent) => { }
})
export const CalendarProvider = CalendarContext.Provider
export default CalendarContext