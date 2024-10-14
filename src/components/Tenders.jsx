import React from 'react'
import TenderList from './TenderList'
import DashboardStatsGrid from './DashboardStatsGrid'

export default function Tenders() {

    return (<div className='flex flex-col gap-4'>
            <DashboardStatsGrid/>
    <div className='flex flex-row gap-4 w-full'>
        <TenderList />
        </div>
        </div>)
}
