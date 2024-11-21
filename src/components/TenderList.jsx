import React, { useEffect, useState, useRef } from 'react';
import { FcSearch } from "react-icons/fc";
import * as XLSX from "xlsx";

export default function TenderList() {
    const [tenders, setTenders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // Limit to 6 rows per page 
    const fileInputRef = useRef(); // For file upload
    const [loading, setLoading] = useState(false);
    const [showAll , setShowAll] = useState(false);
    

    // UseEffect to make API calls and fetch data 
    useEffect(() => {
        const fetchData = async () => {
            let url = 'http://127.0.0.1:8000/tenders';
            if (searchTerm) {
                // Add search query parameter if searchTerm is not empty
                url += `?search=${searchTerm}`;  
            }

            if (showAll){
                // Add show all if flag enabled
                url += searchTerm ? '&show_all=true' : '?show_all=true'

            }
    
            try {
                const response = await fetch(url);
                // Wait for return response
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
        // Re-fetch when searchTerm changes
    }, [searchTerm, showAll]);  

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentTenders = tenders.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tenders.length / rowsPerPage);

    // Navigate to the next or previous page
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // Export to excel
    const exportToExcel = () => {
        // Convert current data to excel
        const worksheet = XLSX.utils.json_to_sheet(tenders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BCT Data");

        // Create and download Excel file
        XLSX.writeFile(workbook, "BCT_Data.xlsx");

    }

    const toggleShowAll = () => {
        setShowAll((prev) => !prev); //Toggle state
        setCurrentPage(1); // Reset to first page when toggling

    };

    // Function to check for recency of data
    const isRecent = (dateCreated) => {
        const now = new Date();
        const importTime = new Date(dateCreated);
        const differenceInHours = (now - importTime) / (1000 * 60 * 60)
        return differenceInHours <= 24; // Consider recent if within 2 hours

    }

    const handleFileInput = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file)

        setLoading(true); // Start loading

        try{
            const response = await fetch('http://127.0.0.1:8000/tenders', {
                method: "POST",
                body: formData,
            });

            if (response.ok){
                alert("Data Successfully Imported")
            } else{
                const error = await response.json();
                alert("Failed to upload file: " + error.detail);
            }
            
        }catch (error){
            alert("Please upload the appropriate file")
        }
    setLoading(false); // Stop loading after the upload attempt
    };

    
    // Trigger file input click
    const handleImportClick = () => {
        fileInputRef.current.click();
        };

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
             <div className='flex items-center justify-between'>
             <div className="flex items-center space-x-4">
            <strong className='text-gray-700 font-medium'>Tender List</strong>

                                        {/* Import from Excel Button */}
                                        <button
                                    onClick={handleImportClick}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                          {loading ? "Importing..." : "Import to Database"}
                    </button>


                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileInput}
                    />

                            {/* Export to Excel Button */}
                            <button
                        onClick={exportToExcel}
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
                        
                    >
                        Export to Excel
                    </button>
                    </div>
            <div className='flex items-center space-x-2'>

                    {/* Show All Button */}
                    <button
                        onClick={toggleShowAll}
                        className="bg-purple-500 text-white font-semibold py-2 px-4 me-6 rounded-lg hover:bg-purple-600"
                    >
                        {showAll ? "Show Paginated" : "Show All"}
                    </button>

                  {/* Search Button */}
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

                  {/* Table of Data */}
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
                        {/* Map data to table */}
                        {currentTenders.map((tender) => (
                            <tr key={tender.tender_id}
                            className={isRecent(tender.date_created) ? 'bg-yellow-100' : ''}>
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
