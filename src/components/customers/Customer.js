import React from 'react'
import { useAutoBodyContext } from '../../context'

const Customer = (props) => {

    const { customerList, setCustomerList, setCustomerDetails, setMechanics, mechanics, setViewCustomerDetails, backendURL } = useAutoBodyContext()

    // ability to remove a customer - then updates state based on the new lists
    const removeCustomer = (id) => {
        
        fetch(backendURL + id, {
            method: 'DELETE'
          })
          .then( data => {
            console.log('deleted')
            const newMechanics = [...mechanics]
            const mechanicIndex = newMechanics.findIndex(mechanic => mechanic.name === props.details.mechanic)
            const queueIndex = newMechanics[mechanicIndex].queue.findIndex(customer => customer._id === id)
            
            newMechanics[mechanicIndex].queue.splice(queueIndex,1)
         
            
            
            const newCustomerList = [...customerList]
            const myIndex = newCustomerList.findIndex(customer => customer._id === id)
            newCustomerList.splice(myIndex,1)

            setMechanics(newMechanics)
            setCustomerList(newCustomerList)
            
          })
        
    }
    // just a toggle so we can see the full customer details
    const toggleCustomerDetails = (customer) => {
        setViewCustomerDetails(true)
        setCustomerDetails(customer)
    }

    return(
        <li>
            <div className = 'row'>
                <div className = 'col-12 col-md-3 '>
                    {props.details.firstName} {props.details.lastName}
                </div>
                <div className = 'col-12 col-md-2'>
                    <button className = 'btn btn-outline-primary btn-sm' onClick = {() => removeCustomer(props.details._id)}>X</button>
                
                    <button className = 'btn btn-outline-primary btn-sm' onClick = {() => toggleCustomerDetails(props.details)}>Details</button>
                </div>
            </div>
        </li>
    )
}

export default Customer