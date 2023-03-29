import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function BarChartContainer({data}) {

    
  return (


      <ResponsiveContainer width='90%' height={300}>
            <BarChart data={data}>
                <XAxis dataKey="date"/>
                <YAxis dataKey="count"/>
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="count" barSize={60} fill='#2cb1bc' />
            </BarChart>
        </ResponsiveContainer>
   
    
  )
}
