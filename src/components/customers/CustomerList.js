import React from 'react'
import { useAutoBodyContext } from '../../context'
import Customer from './Customer'

const CustomerList = () => {

    const { customerList } = useAutoBodyContext()
    return(
        <div className = 'row'>
            <div className='col-12'>
                <h5>Waiting Room</h5>
            </div>
            
            {customerList.length === 0 ? <div className = 'col-12'><h5>No Customers in line</h5> </div> : null}
            <div className = 'col-12'>
            <ol>
                {customerList.map(customer => {
                    return(
                        <Customer key = {customer._id} details = {customer}/>
                    )
                })}
                
            </ol>
            </div>
        </div>
    )
}

export default CustomerList