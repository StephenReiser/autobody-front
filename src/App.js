import React, { useState, useEffect } from 'react';

import './App.css';

import { AutoBodyContext } from './context'
import Header from './components/header/Header'
import AddCustomerForm from './components/form/AddCustomerForm'
import Garage from './components/mechanics/Garage'
import CustomerList from './components/customers/CustomerList'
import CustomerDetails from './components/customers/CustomerDetails'


function App() {

  // global state - manually created mechanics
  const [mechanics, setMechanics] = useState([{
    name: 'Bob',
    busy: false,
    queue: [],
    currentCustomer: {}
  },{
    name: 'Steve',
    busy: false,
    queue: [],
    currentCustomer: {}
  },{
    name: 'Jon',
    busy: false,
    queue: [],
    currentCustomer: {}
  }])

  const [customerList, setCustomerList] = useState([])
  const [customerDetails, setCustomerDetails] = useState(null)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [viewCustomerDetails, setViewCustomerDetails] = useState(false)
  let backendURL = "http://localhost:3003/customers/"

  



  if (process.env.NODE_ENV === 'development') {
    backendURL = 'http://localhost:3003/customers/'
  } else {
    backendURL = 'https://autobody-back.herokuapp.com/customers/'
  }
  

  // end global state


  useEffect(() => {

    // component did mount - this is going and getting our customers from the DB and assigning them to the mechanic's queue or current customer

    fetch(backendURL)
    .then(res => res.json())
    .then(data => {
      
      const myMechanics = [...mechanics]
      const myCustomerList = []
      data.forEach(customer => {
        const myMechanicIndex = myMechanics.findIndex(mechanic => mechanic.name === customer.mechanic)

        if(!customer.status) {
          
          myMechanics[myMechanicIndex].queue.push(customer)
          myCustomerList.push(customer)

        } else if(customer.status) {
          myMechanics[myMechanicIndex].currentCustomer = customer
          myMechanics[myMechanicIndex].busy = true
          
        } else {
          console.log(customer)
        }

      })   
      setMechanics(myMechanics)
      setCustomerList(myCustomerList)
    })
    }, [])

  // return - using context to pass around the global state of mechanics and customers as they are used in lots of components as well as a view customer details and add new customer toggle
  
  return (
    <AutoBodyContext.Provider value = {{mechanics, setMechanics, customerList, setCustomerList, customerDetails, setCustomerDetails, showAddCustomer, setShowAddCustomer, viewCustomerDetails, setViewCustomerDetails, backendURL}}>
      <Header />
      <div className="container">
        {showAddCustomer ? <AddCustomerForm /> : null}
        <div className = 'row'>
          <div className = 'col-8'>
            <Garage />
          </div>
          <div className = 'col-4'>
            <CustomerList />
          </div>
        </div>
        {viewCustomerDetails ? <CustomerDetails /> : null}
      </div>
    </AutoBodyContext.Provider>
  );
}

export default App;

