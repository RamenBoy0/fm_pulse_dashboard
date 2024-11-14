import React, { useEffect, useState } from 'react'
import { FcMoneyTransfer } from "react-icons/fc"
import { FaBuilding } from "react-icons/fa"


export default function TendersStatsGrid() {
    const [average_cost, setAverage] = useState([]);

    // Fetch average data
    useEffect(() => {
        fetch('http://127.0.0.1:8000/tenders/average_cost')
            .then(response => response.json())
            .then(data => setAverage(data))
            .catch(error => console.error('Error fetching tenders', error));

    }, []);

    return <div className='flex gap-4 w-full'>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FcMoneyTransfer className='text-2xl text-white' />
            
            </div>

            <div className='pl-4'>
                <span className='text-sm text-gray-500 font-light'>
                Average Cost Per Month
                </span>
                <div className='flex items-center'>
                    <strong className='text-xl text-gray-700 font-semibold'>
                        {average_cost?.average_cost_per_month
                            ? average_cost.average_cost_per_month.toFixed(2)
                            : 'N/A'}
                        </strong>
                </div>
            </div>
        </BoxWrapper>

        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FaBuilding className='text-2xl text-white' />

            </div>

            <div className='pl-4'>
                <span className='text-sm text-gray-500 font-light'>
                    Average  Per GFA
                </span>
                <div className='flex items-center'>
                    <strong className='text-xl text-gray-700 font-semibold'>
                        {average_cost?.average_dollar_per_gfa_month
                            ? average_cost.average_dollar_per_gfa_month.toFixed(4)
                            : 'N/A'}
                    </strong>
                </div>
            </div>
        </BoxWrapper>
    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}