import React from 'react'
import { useAutoBodyContext } from '../../context'

const CustomerDetails = () => {
    const { customerDetails, setViewCustomerDetails } = useAutoBodyContext()


    return(
        <div className = 'myModal'>
            <div className = 'myModalContent'>
                <div className = 'row'>
                    <div className = 'col-12'>
                        <h5>Customer Details</h5>
                    </div>

                    {customerDetails ? 
                        <>
                            <div className = 'col-4'>
                            <h5>Personal Info:</h5>
                            Name: {`${customerDetails.firstName} ${customerDetails.lastName}`}
                            <br />
                            Phone: {customerDetails.phoneNumber}
                            <br />
                            Arrival Time: {customerDetails.timeOfArrival}
                            </div>
                            <div className = 'col-4'>
                            <h5>Vehicle Info: </h5>
                            Type: {customerDetails.vehicleType}
                            <br />
                            Color: {customerDetails.vehicleColor}
                            <br />
                            Year: {customerDetails.vehicleYear}
                            <br />
                            License Plate: {customerDetails.licensePlate}
                            </div>
                            <div className = 'col-4'>
                            <h5>Mechanic: </h5>
                            {customerDetails.mechanic}
                            </div>
                            
                            </>

                        
                    : null }
                    <button className = 'btn btn-outline-primary' onClick = {() => setViewCustomerDetails(false)}>Close</button>
                </div>

            </div>
        </div>
        
     
    )

}

export default CustomerDetails
