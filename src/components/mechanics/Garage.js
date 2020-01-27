import React from 'react'
import { useAutoBodyContext } from '../../context'
import Mechanic from './Mechanic'

const Garage = () => {
    const { mechanics } = useAutoBodyContext()
    return(
        <div className = 'row garage'>
            <div className = 'col-12'>
            <h5>Garage</h5>
            </div>
            <div className = 'card-deck'>
            
            
                {mechanics.map((mechanic, index) => {
                    return(
                    <Mechanic details = {mechanic} key = {index + mechanic.name} indexPos = {index}/>
                    )
                })}
            </div>
        </div>
        
    )
}


export default Garage