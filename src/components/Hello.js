import React from 'react'
import {useAutoBodyContext} from '../context'

const Hello = () => {
    const { mechanics } = useAutoBodyContext()
    return(
        <div>
            Hi {mechanics[0].name}!
        </div>
    )
}

export default Hello