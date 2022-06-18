import React from 'react'

const AppContext = React.createContext({
    pageTitle: "",
    changePageTitle: (title) => { }
})
export const AppProvider = AppContext.Provider
export default AppContext