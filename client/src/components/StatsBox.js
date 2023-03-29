import React from 'react'

export default function StatsBox({ count, title, icon , status}) {

    let className;
    let textClassName;

  if (status ==='declined'){
    className = 'declined'
    textClassName = 'declinedText'
  }
  else if(status==='approved'){
    className = 'approved'
    textClassName = 'approvedText'
  } 
  else {
    className = 'pending'
    textClassName = 'pendingText'
  }
  return (
    <div className={`${textClassName} bg-white rounded px-8 border-b-4 h-48 flex flex-col justify-center`}>
        <div className="flex justify-between">
            <h5 className={`${textClassName} font-bold text-6xl`}>{count}</h5>
            <div className={`${className} px-5 py-4 text-3xl rounded`}>
                {icon}
            </div>
        </div>
        <h6 className="mt-2 text-xl">{title}</h6>
    </div>
  )
}
