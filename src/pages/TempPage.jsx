import React from 'react'
import { NavBar } from '../components'

const TempPage = () => {
  return (
    <div>
        <NavBar isLoggedIn={true} />
        
        <p>
            Temp Page
        </p>
        <div className='w-full h-[16.5vw]'></div>
    </div>
  )
}

export default TempPage