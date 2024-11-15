import React, { useEffect, useState } from 'react';
import { FcSearch } from "react-icons/fc";

export default function TenderList() {
    const [tenders, setTenders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // Limit to 10 rows per page

    useEffect(() => {
        const fetchData = async () => {
            let url = 'http://127.0.0.1:8000/tenders';
            if (searchTerm) {
                url += `?search=${searchTerm}`;  // Add search query parameter if searchTerm is not empty
            }
    
            try {
                const response = await fetch(url);
                const data = await response.json();
    
                // Check if data is an array before setting it
                if (Array.isArray(data)) {
                    setTenders(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setTenders([]); // Fallback to empty array if not an array
                }
            } catch (error) {
                console.error('Error fetching tenders', error);
            }
        };
    
        fetchData();
    }, [searchTerm]);  // Re-fetch when searchTerm changes

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentTenders = tenders.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tenders.length / rowsPerPage);

    // Navigate to the next or previous page
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
             <div className='flex items-center justify-between'>
            <strong className='text-gray-700 font-medium'>Tender List</strong>
            <div className='flex items-center space-x-2'>
            <FcSearch className='text-xl'/>
            <input
                        type='text'
                        placeholder='Search...'
                        className='border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                </div>
            </div>
            <div className='mt-3'>
                <table className="w-full text-gray-700">
                    <thead className="bg-gray-200 text-gray-800 font-semibold">
                        <tr className="border-b-2 border-gray-300">
                            {/*<th className="px-4 py-2">Tender ID</th>*/}
                            <th className="px-4 py-2">Year</th>
                            <th className="px-4 py-2">Agency</th>
                            <th className="px-4 py-2">Outcome</th>
                            <th className="px-4 py-2">Property</th>
                            <th className="px-4 py-2">Cost/Month</th>
                            <th className="px-4 py-2">Building Type</th>
                            <th className="px-4 py-2">Dollar Per GFA Month</th>
                            <th className="px-4 py-2">GFA</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTenders.map((tender) => (
                            <tr key={tender.tender_id}>
                                {/*<td className="border px-4 py-2">{tender.tender_id}</td>*/}
                                <td className="border px-4 py-2">{tender.year}</td>
                                <td className="border px-4 py-2">{tender.agency}</td>
                                <td className="border px-4 py-2">{tender.tender_outcome}</td>
                                <td className="border px-4 py-2">{tender.property}</td>
                                <td className="border px-4 py-2">${tender.cost_per_month.toFixed(2)}</td>
                                <td className="border px-4 py-2">{tender.building_type}</td>
                                <td className="border px-4 py-2">{tender.dollar_per_gfa_month.toFixed(4)}</td>
                                <td className="border px-4 py-2">{tender.gfa}</td>
                                <td className="border px-4 py-2">{new Date(tender.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className='mt-4 flex justify-between'>
                    <button
                        className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className='text-gray-700'>Page {currentPage} of {totalPages}</span>
                    <button
                        className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
