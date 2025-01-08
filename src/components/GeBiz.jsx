// Manage the GeBiz Components
import React from 'react'
import GeBizList from './GeBizList'
import GeBizScrape from './GeBizScrape'

export default function Tenders() {
    return (<div className='flex flex-col gap-4'>
            <GeBizScrape/>
<div className='flex flex-row gap-4 w-full'>
    <GeBizList/>
    </div>
    </div>)
}