import React from 'react'


const CustomerInputs = (props) => {
    return(
        <div className ='form-group col-12 col-lg-6'>
            <label htmlFor={props.description}>{props.description}</label>
                    <input 
                        required
                        id={props.description}
                        type={props.inputType} 
                        value = {props.inputValue}
                        onChange = {e => props.inputFunc(e.target.value)}
                        className = 'form-control'
                    />
            
            </div>

    )
}

export default CustomerInputs