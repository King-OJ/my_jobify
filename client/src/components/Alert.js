import React from 'react'
import { useAppContext } from '../context/appContext'

export default function Alert() {

    const {alertType, alertText} = useAppContext()

  return (
    <div className={alertType === 'success' ? 'alert alert-success' : 'alert alert-error'}>{alertText}</div>
  )
}
