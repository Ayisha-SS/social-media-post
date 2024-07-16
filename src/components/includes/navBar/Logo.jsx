import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
         <div>
          <Link to="/">
            <h1 className='text-4xl  text-gradient max-[640px]:text-[32px] sm:text-3xl'>.PoStFuN</h1>
          </Link>
        </div>
    </div>
  )
}

export default Logo