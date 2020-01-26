import {createContext, useContext} from 'react'






export const AutoBodyContext = createContext({
    
    mechanics: 0,
    setMechanics: () => {},
    customerList: {},
    setCustomerList: () => {},
    customerDetails: {},
    setCustomerDetails: () => {},
    showAddCustomer: {},
    setShowAddCustomer: () => {},
    viewCustomerDetails: {},
    setViewCustomerDetails: () => {},
    backendURL: ""
    
    
})

export function useAutoBodyContext() {
    const {mechanics, setMechanics, customerList, setCustomerList, customerDetails, setCustomerDetails, showAddCustomer, setShowAddCustomer, viewCustomerDetails, setViewCustomerDetails, backendURL} = useContext(AutoBodyContext)
    return {mechanics, setMechanics, customerList, setCustomerList, customerDetails, setCustomerDetails, showAddCustomer, setShowAddCustomer, viewCustomerDetails, setViewCustomerDetails, backendURL}
}