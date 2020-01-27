import React, { useState } from 'react'
import CustomerInputs from './CustomerInputs'
import { useAutoBodyContext } from '../../context'

const AddCustomerForm = () => {

    const { customerList, setCustomerList, mechanics, setMechanics, setShowAddCustomer, backendURL } = useAutoBodyContext()
    // initializing and setting state for the form
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehicleYear, setVehicleYear] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectMechanic, setSelectMechanic] = useState('First')

    
    // a function to help pick the mechanic to assign a customer to - creates an array of the mechanic.queues and then returns the index of the shortest one

    const setShortIndex = (aMechanicList) => {
        if (selectMechanic === 'First') {
            const mechanicQueues = []

            aMechanicList.forEach(mechanic => mechanicQueues.push(mechanic.queue))

            return mechanicQueues.reduce((prev, current, index, array) => array[prev].length < current.length ? prev : index, 0)
            
            
        } else {
            
            return aMechanicList.findIndex(mechanic => mechanic.name === selectMechanic)
        }
    }

    // one big function to add customers to DB and mechanics queue
    const handleSubmit = (e) => {
        e.preventDefault()
       
        const newCustomerList = [...customerList]
        const myDate = new Date()
        const minutes = myDate.getMinutes()
        let hours = myDate.getHours()
        let amPM = 'AM'
        if (hours === 0) {
            hours = 12
        } else if(hours === 12) {
            amPM = 'PM'
        } else if(hours > 12 ) {
            hours = hours - 12
            amPM = 'PM'
        }

        const newCustomer = {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            vehicleType: vehicleType,
            vehicleColor: vehicleColor,
            vehicleYear: vehicleYear,
            licensePlate: licensePlate,
            phoneNumber: phoneNumber,
            timeOfArrival: `${hours}:${minutes} ${amPM}`,
            mechanic: selectMechanic
        }
        const newMechanicList = [...mechanics]

        const shortestQueueIndex = setShortIndex(newMechanicList)

        // this is sort of annoying - but resetting mechanic name here to make sure auto assigned ones work correctly

        newCustomer.mechanic = newMechanicList[shortestQueueIndex].name

        // fetch to add the customer to the DB and then reset form as well as update state

        fetch(backendURL, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error) {
                alert('Bad Info')
            } else {
            newCustomer._id = data._id

            newCustomerList.push(newCustomer)
            newMechanicList[shortestQueueIndex].queue.push(newCustomer)  
            
            // resetting form and updating Mechanic and Customer list
            setCustomerList(newCustomerList)
            setMechanics(newMechanicList)
            setFirstName('')
            setLastName('')
            setVehicleType('')
            setVehicleColor('')
            setVehicleYear('')
            setLicensePlate('')
            setPhoneNumber('')
            setSelectMechanic('First')
            setShowAddCustomer(false)
            }

        }).catch(err => console.log(err))

        
    }

    return(
        <div className = 'myModal'>
            <div className = 'myModalContent'>
                <div className = 'row'>
                    <div className = 'col-12'>
                    <h5>Add Customer</h5>
                    </div>
                    <form onSubmit = {handleSubmit}>
                        <div className = 'form-row'>
                        <CustomerInputs 
                            inputType = {"text"}
                            description={"First Name:"}
                            inputValue = { firstName }
                            inputFunc = { setFirstName }
                        />
                        <CustomerInputs 
                            inputType = {"text"}
                            description={"Last Name:"}
                            inputValue = { lastName }
                            inputFunc = { setLastName }
                        />
                        <CustomerInputs 
                            inputType = {"text"}
                            description={"Vehicle Type:"}
                            inputValue = { vehicleType }
                            inputFunc = { setVehicleType }
                        />
                        <CustomerInputs 
                            inputType = {"text"}
                            description={"Vehicle Color:"}
                            inputValue = { vehicleColor }
                            inputFunc = { setVehicleColor }
                        />
                        <CustomerInputs 
                            inputType = {"number"}
                            description={"Vehicle Year:"}
                            inputValue = { vehicleYear }
                            inputFunc = { setVehicleYear }
                        />
                        <CustomerInputs 
                            inputType = {"text"}
                            description={"License Plate:"}
                            inputValue = { licensePlate }
                            inputFunc = { setLicensePlate }
                        />
                        <CustomerInputs 
                            inputType = {"tel"}
                            description={"Phone Number:"}
                            inputValue = { phoneNumber }
                            inputFunc = { setPhoneNumber }
                        />
                        <div className = 'col-6'>
                            <label htmlFor="myMechanicSelect" ></label>
                                Pick a mechanic:
                                <select id = "myMechanicSelect" className = 'form-control' value={selectMechanic} onChange={e => setSelectMechanic(e.target.value)}>
                                    <option value="First" key = {'selectFirst'}>First Available</option>
                                    {mechanics.map(mechanic => {
                                        return(
                                            <option value={mechanic.name} key={'select'+ mechanic.name}>{mechanic.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                            <input className = 'btn btn-outline-primary' type='submit' value='Add Customer to Queue' />
                            <button className = 'btn btn-outline-primary' onClick = {() => setShowAddCustomer(false)}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCustomerForm

