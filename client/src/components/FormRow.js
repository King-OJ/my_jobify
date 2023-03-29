import React from 'react'

export default function FormRow({label, type, name, handleChange, value, select, jobType, status}) {
  
  return (
    <div className='mt-4 text-lg'>
        <label htmlFor={name} >{label} :</label>
        {select ?
          <select onChange={handleChange} name={name} id={name} value={value} className='block w-full mt-2 bg-grey50 p-2'>
            {(jobType && jobType.map((ele, index)=>{
              return <option key={index} value={ele} className='text-sm'>{ele}</option>
            }))

            ||

            (status && status.map((ele, index)=>{
              return <option key={index} value={ele} className='text-sm'>{ele}</option>
            }))
            
            }
            
          </select>
          :
          <input type={type} name={name} id={name} value={value} onChange={handleChange} className='w-full p-2 mt-2 rounded-md outline-primary500 bg-grey50 text-black border-grey100' />
        
        }
    </div>
  )
}
