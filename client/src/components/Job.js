import React from 'react'
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { JobModal } from './index'


export default function Job({_id: id, company, jobType, status, createdAt, position, jobLocation}) {
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  let className;

  if (status==='declined'){
    className = 'declined'
  }
  else if(status==='approved'){
    className = 'approved'
  } 
  else {
    className = 'pending'
  }

  const { editJob, openDeleteJobModal , isDeleting, deleteJobId} = useAppContext()

  return (
    <div className='bg-white rounded shadow-sm'>
      <div className="p-4 flex border-grey200 border-b-2 items-center">
        <div className="uppercase bg-primary500 h-16 w-16 rounded text-white text-3xl font-bold p-4 flex justify-center items-center">
          {company.charAt(0)}
        </div>
        <div className="ml-6">
          <h6 className="text-xl mb-1">{position}</h6>
          <h6 className="text-lg tracking-widest text-grey400">{company}</h6>
        </div>
      </div>
      
      <div className="p-4 relative">
      {id === deleteJobId ? isDeleting && <JobModal /> : null}
        <div className='job-details'>
          <div className='space-y-4 '>
            <div className='flex items-center'><FaLocationArrow /> <span className="ml-4 capitalize">{jobLocation}</span></div>
            <div className='flex items-center'><FaBriefcase /> <span className="ml-4 capitalize">{jobType}</span></div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center'><FaCalendarAlt /> <span className="ml-4 capitalize">{date}</span></div>
            <span className={ `${className} inline-block px-4 py-1 rounded capitalize`}>{status}</span>
          </div>
        </div>

        <div className="mt-4 space-x-4">
          <Link onClick={()=> editJob(id)} to='/add-job' className={isDeleting ? 'disabled-link bg-lightGreen py-1 text-darkGreen text-lg': 'bg-lightGreen py-1 text-darkGreen text-lg'}>Edit</Link >
          <button disabled={isDeleting} onClick={()=> openDeleteJobModal(position, id)} className='bg-lightRed text-darkRed py-1 text-lg'>Delete</button>
        </div>
      </div>

    </div>
  )
}
