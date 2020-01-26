import React, {useState} from 'react'
import { useAutoBodyContext } from '../../context'

const Mechanic = (props) => {
    const { customerList, setCustomerList, mechanics, setMechanics, backendURL } = useAutoBodyContext()

    const [showQueue, setShowQueue] = useState(true)

    
// this function moves the first customer from queue into mechanics active customer. Deletes the customer from db and removes from the waiting room as well as from mechanic queue
    const addCustomerToCurrentCustomer = () => {
        // simple logic here to make sure there is some one in queue to be added!
        if (props.details.queue.length > 0) {
        const newMechanics = [...mechanics]
        const newCustomerList = [...customerList]
        // this function is sort of a repeat - should be able to reuse a delete fucntion some where
        newMechanics[props.indexPos].currentCustomer = props.details.queue[0]
        
        newMechanics[props.indexPos].busy = true

        newMechanics[props.indexPos].queue.shift()

        const currentCustomerIndex = newCustomerList.findIndex(customer => customer._id === newMechanics[props.indexPos].currentCustomer._id)

        newCustomerList.splice(currentCustomerIndex, 1)

        

        fetch(backendURL + newMechanics[props.indexPos].currentCustomer._id, {
            method: 'PUT',
            body: JSON.stringify({status: true}),
            headers: {
        'Content-Type': 'application/json'
      }
          }).then( data => {
            setCustomerList(newCustomerList)
            setMechanics(newMechanics)
            
            
          })
        
        } else {
            alert('Business is Slow')
        }
        

    }

    // quick little function to empty the current customer and update status and time
    const finishWork = () => {
        
        fetch(backendURL + props.details.currentCustomer._id, {
            method: 'DELETE',
            })
            .then(data => {
                const newMechanics = [...mechanics]
                newMechanics[props.indexPos].currentCustomer = {}
                newMechanics[props.indexPos].busy = false
                setMechanics(newMechanics)
            })
            .catch(err => console.log(err))
        
    }


    return(

        

        // Second Version
        // Second Version
        // Second Version
        <div className = 'card '>
           <div className="card-body">
                <h5 className="card-title">{props.details.name}'s Bay</h5>
                <h5 className="card-title">Status: {props.details.busy ? "Busy" : "Free"}</h5>
                <div className="card-text">Currently With:  {props.details.currentCustomer.firstName}
                    <br />
                
                    Wait time: {props.details.currentCustomer.firstName ? `${(props.details.queue.length ) * 30} - ${(props.details.queue.length + 1) * 30}`: props.details.queue.length * 30} mins
                </div>
                <div className = 'card-text'>
                {showQueue ? 
                    <div> Current Queue:
                        <ol>
                            {props.details.queue.map(customer => <li key = {customer._id}>{customer.firstName}</li>)}
                        </ol> 
                    </div>
                : null}
                </div>
            </div>
            <div className="card-footer">
            {props.details.busy ?
                <button className = 'btn btn-outline-primary btn-sm' onClick = {() => finishWork()}>Finish Work</button> 
                : 
                <button className = 'btn btn-outline-primary btn-sm' onClick = {() => addCustomerToCurrentCustomer()}>
                Start Work
            </button>}
            <button className = 'btn btn-outline-primary btn-sm' onClick = {() => {setShowQueue(!showQueue)}}>{showQueue ? "Hide": "Show"} Queue</button>
            </div>
        </div>


// Old VERSION:::
// OLD VERSION
        // <div className = 'col-4'>
        //     <h5>
        //         {props.details.name}'s Bay
        //     </h5>
        //     <h5>
        //         Status: {props.details.busy ? "Busy" : "Free"}
        //     </h5>
        //     <div>
        //         Currently With:{props.details.currentCustomer.firstName}
        //         <br />
                
        //         Time to be available: {props.details.currentCustomer.firstName ? `${(props.details.queue.length ) * 30} - ${(props.details.queue.length + 1) * 30}`: props.details.queue.length * 30} mins

                
                
        //     </div>
            
            
        //     {showQueue ? 
        //         <div> Current Queue:
        //             <ol>
        //                 {props.details.queue.map(customer => <li key = {customer._id}>{customer.firstName}</li>)}
        //             </ol> 
        //         </div>
        //     : null}
            

            
        //     <button className = 'btn btn-outline-primary' onClick = {() => {setShowQueue(!showQueue)}}>{showQueue ? "Hide": "Show"} Queue</button>

        //     {props.details.busy ?
        //         <button className = 'btn btn-outline-primary' onClick = {() => finishWork()}>Finish Current Work</button> 
        //         : 
        //         <button className = 'btn btn-outline-primary' onClick = {() => addCustomerToCurrentCustomer()}>
        //         Add Customer
        //     </button>}
            
            

            
        // </div>

        
  
    )

}

export default Mechanic

