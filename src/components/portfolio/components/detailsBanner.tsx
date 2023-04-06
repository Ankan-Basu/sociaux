import React from 'react'

const DetailsBanner = () => {
  return (
    <div
    className='border-2 border-solid border-black rounded-lg 
    w-700px flex gap-2 p-2
    '
    >
      <div
      className='border-2 border-solid border-red-500 w-52'
      >Image</div>
      <div>
        <div
        className='text-3xl'
        >
          <h2>Name</h2>
          </div>

        <div
        className='text-sm'
        >
          
          Ongoing</div>
        <div>
          
          <h3>Job Tile</h3>
        </div>
        <div>
          <p>Desc</p>
          </div>
        <div>tech</div>
        <div>Links</div>
      </div>
    
    </div>
  )
}

export default DetailsBanner