import React, { useEffect, useState } from 'react';

export default function GeBiz() {
    const [gebiz, setGebiz] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // Limit to 6 rows per page

    // Fetch tender data
    useEffect(() => {
        fetch('http://127.0.0.1:8000/GeBiz')
            .then(response => response.json())
            .then(data => setGebiz(data))
            .catch(error => console.error('Error fetching tenders', error));
    }, []);

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentTenders = gebiz.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(gebiz.length / rowsPerPage);

    // Navigate to the next or previous page
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong className='text-gray-700 font-medium'>GeBiz Data</strong>
            <div className='mt-3'>
                {/* Scrollable Table Container */}
                <div className="overflow-y-auto max-h-[60vh]">
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Agency</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">WOG</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Awarded Agency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTenders.map((gebiz) => (
                                <tr key={gebiz.tender_id}>
                                    <td className="border px-4 py-2">{gebiz.title}</td>
                                    <td className="border px-4 py-2">{gebiz.agency}</td>
                                    <td className="border px-4 py-2">{gebiz.description}</td>
                                    <td className="border px-4 py-2">${gebiz.price.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{gebiz.status}</td>
                                    <td className="border px-4 py-2">{gebiz.WOG}</td>
                                    <td className="border px-4 py-2">{new Date(gebiz.date).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{gebiz.awarded_agency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
