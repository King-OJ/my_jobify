import React, { useEffect, useMemo, useState } from 'react'
import { FormRow, Job, Loader, Alert, PageBtnContainer } from '../../components'
import { useAppContext } from '../../context/appContext'

export default function AllJobs() {

  const [localSearch, setLocalSearch] = useState('')

  const { 
    getAllJobs, 
    isLoading, 
    jobs, 
    totalJobs, 
    showAlert, 
    handleFormChange,
    search, 
    sort, 
    searchType, 
    searchStatus, 
    numOfPages,
    clearFormInputs,
    page
  } = useAppContext()

  const statusOptions = [
    'all',
    'pending',
    'approved',
    'declined',
  ]

  const typeOptions = [
    'all',
    'full-time',
    'part-time',
    'remote',
    'internship',
  ]
  const sortOptions = [
    'latest',
    'oldest',
    'a - z',
    'z - a',
  ]

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    handleFormChange(name, value)
  }


  useEffect(() => {
    getAllJobs()
    // eslint-disable-next-line 
  }, [sort, searchStatus, searchType, search, page])
  
  function debounce (){
    let timeoutID;

    return (e)=>{
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
        handleFormChange(e.target.name, e.target.value)
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(()=>debounce(), [])

  return (
    <div className='m-6'>
    <div className="w-full rounded shadow-md bg-white px-6 py-10 mb-10">
      <h4>search form</h4>
      <form className='mt-8 grid sm:grid-cols-2 gap-4 md:grid-cols-3'>
        <FormRow label='search' type='text' name='search' handleChange={optimizedDebounce} value={localSearch}/>
        <FormRow label='status' name='searchStatus' handleChange={handleChange} select={true} status={statusOptions} value={searchStatus}/>
        <FormRow label='type'  name='searchType' handleChange={handleChange} select={true} status={typeOptions} value={searchType}/>
        <FormRow label='sort' name='sort' handleChange={handleChange} select={true} status={sortOptions} value={sort}/>

        <div className="mt-4 flex items-end">
          <button type='button' onClick={()=>{
            setLocalSearch('');
            clearFormInputs();
            }} className='bg-lightRed rounded w-full p-2 text-center text-base font-semibold text-darkRed hover:bg-opacity-100 hover:bg-darkRed hover:text-white'>clear filters</button>
        </div>
      </form>
    </div>
    {isLoading ? <Loader />
    :
    <>
      <h4 className="font-semibold text-2xl mb-6">{`${totalJobs} Jobs Found`}</h4>
      {showAlert && <Alert />}
      <div className="grid gap-4 md:grid-cols-2 mb-6"> 
        {jobs.map((job)=> {
          const {_id} = job
          return <Job key={_id} {...job} />
        })}
        
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </>

  }
  </div>
  )
}
