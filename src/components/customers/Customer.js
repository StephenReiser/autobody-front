import React from 'react'
import { useAutoBodyContext } from '../../context'

const Customer = (props) => {

    const { customerList, setCustomerList, setCustomerDetails, setMechanics, mechanics, setViewCustomerDetails, backendURL } = useAutoBodyContext()

    const removeCustomer = (id) => {
        
        fetch(backendURL + id, {
            method: 'DELETE'
          }).then( data => {
              console.log('deleted')
              const newMechanics = [...mechanics]
            const mechanicIndex = newMechanics.findIndex(mechanic => mechanic.name === props.details.mechanic)
            const queueIndex = newMechanics[mechanicIndex].queue.findIndex(customer => customer._id === id)
            
            newMechanics[mechanicIndex].queue.splice(queueIndex,1)
         
            // console.log(newMechanics)
            
            const newCustomerList = [...customerList]
            const myIndex = newCustomerList.findIndex(customer => customer._id === id)
            newCustomerList.splice(myIndex,1)

            setMechanics(newMechanics)
            setCustomerList(newCustomerList)
            
          })
        
    }

    const toggleCustomerDetails = (customer) => {
        setViewCustomerDetails(true)
        setCustomerDetails(customer)
    }

    return(
        <li>
            <div className = 'row'>
                <div className = 'col-6 col-md-8 '>
                    {props.details.firstName} {props.details.lastName}
                </div>
                <div className = 'col-3 col-md-2'>
                    <button className = 'btn btn-outline-primary' onClick = {() => removeCustomer(props.details._id)}>X</button>
                </div>
                <div className = 'col-3 col-md-2'>
                    <button className = 'btn btn-outline-primary' onClick = {() => toggleCustomerDetails(props.details)}>Details</button>
                </div>
                
            
            
            
            {/* for whatever reason I passed the whole details customer object here as props.details - not sure how I want to display yet so this is fine - but will need a button to show full details on click - materialize accordion could be an option though not sure if that will get in the way of simple buttons here (remove from line - move to Mechanic) */}
            </div>
        </li>
    )
}

export default Customer