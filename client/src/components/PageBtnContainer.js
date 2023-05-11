import React from 'react'
import { HiChevronDoubleLeft,HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from '../context/appContext'

export default function PageBtnContainer() {
    const { numOfPages, page, changePage } = useAppContext()

    const pageCounts = Array.from({ length: numOfPages}, (_, index) => {
      return index + 1
    })

    function prevPage (){
      let newPage = page - 1
      if(newPage < 1){
        newPage = numOfPages
      }
      changePage(newPage)
    }
    function nextPage (){
      let newPage = page + 1
      if(newPage > numOfPages){
        newPage = 1
      }
      changePage(newPage)
    }

  return (
    <div className=' space-x-4 flex justify-center mb-10'>
        <button onClick={()=>prevPage()} className="hover:bg-primary300 hover:text-white transition flex items-center shadow-md text-sm md:text-lg px-3 py-1 bg-white text-primary300"><HiChevronDoubleLeft />  Prev</button>
        <div className='flex items-center space-x-1 font-bold'>
            {pageCounts.map((count, index)=>{
                return <button type="button" onClick={()=>changePage(count)} className={ count === page ? 'bg-primary600 text-white  transition': 'bg-primary300 hover:bg-primary600 text-white hover:bg-opacity-80 transition'} key={index}>{count}</button>
            })}
        </div>
        
        <button onClick={()=>nextPage('next')} className="hover:bg-primary300 hover:text-white transition flex items-center shadow-md text-sm md:text-lg px-3 py-1 bg-white text-primary300">Next <HiChevronDoubleRight /> </button>
    </div>
  )
}
