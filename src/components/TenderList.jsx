import React, { useEffect, useState } from 'react'

export default function TenderList() {

    const [tenders, setTenders] = useState([]);

    // Fetch tender data
    useEffect(() => {
        fetch('http://127.0.0.1:8000/tenders')
            .then(response => response.json())
            .then(data => setTenders(data))
            .catch(error => console.error('Error fetching tenders', error));
    }, []);

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong className='text-gray-700 font-medium'>Tender List</strong>
            <div className = 'mt-3'>
            <table className="w-full text-gray-700">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tender ID</th>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2">Agency</th>
                        <th className="px-4 py-2">Outcome</th>
                        <th className="px-4 py-2">Property</th>
                        <th className="px-4 py-2">Cost/Month</th>
                        <th className="px-4 py-2">Building Type</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tenders.map((tender) => (
                        <tr key={tender.tender_id}>
                            <td className="border px-4 py-2">{tender.tender_id}</td>
                            <td className="border px-4 py-2">{tender.year}</td>
                            <td className="border px-4 py-2">{tender.agency}</td>
                            <td className="border px-4 py-2">{tender.tender_outcome}</td>
                            <td className="border px-4 py-2">{tender.property}</td>
                            <td className="border px-4 py-2">${tender.cost_per_month.toFixed(2)}</td>
                            <td className="border px-4 py-2">{tender.building_type}</td>
                            <td className="border px-4 py-2">{new Date(tender.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}