import React from 'react'

const CalendarContext = React.createContext({
    calendarEvents: [],
    addEvent: (event) => {}
})
export const CalendarProvider = CalendarContext.Provider
export default CalendarContext