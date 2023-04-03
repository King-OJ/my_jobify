import React, { useEffect } from 'react'
import { Loader, StatsBox } from '../../components'
import { useAppContext } from '../../context/appContext';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BarChartContainer from '../../components/BarChart';

export default function Stats() {
  const { showStats, isLoading, monthlyApplications, stats } = useAppContext();

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      status: 'pending'
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      status: 'approved'
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      status: 'declined'
    },
  ];
  
  useEffect(() => {
    showStats();
    // eslint-disable-next-line 
  }, []);


  if(isLoading){
    return <Loader />
  }

  return (
    <div className='m-6'>
      <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
       {defaultStats.map((ele, ind)=> <StatsBox key={ind} {...ele}/> ) }
      </div>
      <div className="mt-20 w-full">
        <h4 className='text-center mb-24'>Monthly Applications</h4>
        {monthlyApplications.length > 0 ? <BarChartContainer data={monthlyApplications}/> 
        : 
        <div className='-mt-20 tracking-widest text-primary500'>
          <div className='max-w-lg mx-auto text-center'>
            Monthly applications chart will display here if you have applications for the last 6 month. </div>
            <div className='text-center '>
              <Link to='/add-job' className='inline-block mt-4 py-1 px-5 text-base font-bold bg-primary500 text-white'>Add Job</Link> 
            </div>
        </div>}
      </div>
    </div>
  )
}
