import React from 'react'
import { useAutoBodyContext } from '../../context'


const Header = () => {

    const { showAddCustomer, setShowAddCustomer } = useAutoBodyContext()

    return(
        

        <nav className="navbar navbar-inverse myCustomHeader">
            <div className="container-fluid">
                <div className="navbar-header">
                    <li className="navbar-brand">Steve's Autobody</li>
                </div>
            
                <ul className="nav navbar-nav navbar-right">
                    <li><button className = 'nav-link btn btn-outline-secondary' onClick = {() => setShowAddCustomer(!showAddCustomer)}>{showAddCustomer ? "Hide Add Form" : "Add New Customer"}</button></li>
                    
                </ul>
            </div>
        </nav>
    )

}

export default Header


