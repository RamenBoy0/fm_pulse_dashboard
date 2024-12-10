import React, { useEffect, useState} from 'react';
import { FcSearch } from "react-icons/fc";
import * as XLSX from "xlsx";

export default function TenderList() {
    // Tender Table
    const [tenders, setTenders] = useState([]);

    // Search Bar
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination
    const rowsPerPage = 6; // Limit to 6 rows per page 

    // Loading
    const [loading, setLoading] = useState(false);
    const [showAll , setShowAll] = useState(false);

    // Popup for import
    const [agencies, setAgencies] = useState([]);
    const [tender_names, setTenderName] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [startingYear, setStartingYear] = useState("");
    const [startingMonth, setStartingMonth] = useState(" ");
    const [isAwarded, setIsAwarded] = useState(false);
    const [file, setFile] = useState(null);
    const [newAgency, setNewAgency] = useState('NIL');
    const[newTenderName, setNewTenderName] = useState('NIL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTenderNameModalOpen, setIsTenderNameModalOpen] = useState(false);
    
    // Popup
    const handlePopupSubmit = async() => {

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        // Only append startingYear if it's a valid number
        if (startingYear.trim() !== "") {
            formData.append("startingYear", startingYear);
        }

        // Only append startingMonth if it's a valid value
        if (startingMonth.trim() !== "") {
            formData.append("startingMonth", startingMonth.trim());
        }

        formData.append("isAwarded", isAwarded);
        // Append either the existing 'agencies' or the new 'newAgency'
        formData.append("fileName", agencies ? agencies : newAgency);

        // Append either the existing 'tender names' or the new 'newTenderName'
        formData.append("tenderName", selectedOption ? selectedOption : newTenderName);
        setLoading(true);

        try{
            const response = await fetch("http://127.0.0.1:8000/tenders", {
                method: "POST",
                body: formData,
            });
            if (response.ok){
                alert("Data Successfully Imported");
            } else {
                const error = await response.json();
                alert("Failed to upload file: " + JSON.stringify(error));
            }
        } catch (error) {
            alert("Error during upload: " + error.message);
        }
        
        setLoading(false);
    };

    useEffect(() => {
        if (isPopupOpen) {
            // Fetch agencies from the API
            fetch('http://127.0.0.1:8000/BCT_agency')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response error');
                    }
                    return response.json();
                })
                .then(data => {
                    setAgencies(data.agencies);
                })
                .catch(error => {
                    console.error('Error fetching agencies:', error);
                });
        }
    }, [isPopupOpen]);

    useEffect(() => {
        if (isPopupOpen) {
            // Fetch tender_names from the API
            fetch('http://127.0.0.1:8000/BCT_tender_names')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response error');
                    }
                    return response.json();
                })
                .then(data => {
                    setTenderName(data.tender_names);
                })
                .catch(error => {
                    console.error('Error fetching tender_names:', error);
                });
        }
    }, [isPopupOpen]);


    const handleCreateAgency = () => {
        // After successfully creating the agency, close the modal and refresh the list
        // Add new agency to the list
        setAgencies([newAgency]);
        setIsModalOpen(false); // Close the modal
    };

    const handleCreateTender = () => {
        // After successfully creating the agency, close the modal and refresh the list
        // Add new agency to the list
        setTenderName([newTenderName]);
        setIsTenderNameModalOpen(false); // Close the modal
    };


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

    
    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
             <div className='flex items-center justify-between'>
             <div className="flex items-center space-x-4">
            <strong className='text-gray-700 font-medium'>Tender List</strong>

                                        {/* Import from Excel Button */}
                                        <button
                                    onClick= {() => setIsPopupOpen(true)} // Open Popup
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                          {loading ? "Importing..." : "Import to Database"}
                    </button>


                    {/* Popup Window */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-md shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Upload File Options</h3>

                            <div className="mb-3">
                                    <label className="block font-medium text-gray-700">
                                        Mega Tender
                                    </label>
                                    <select
                                        id="tender_name"
                                        name="tender_name"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="">--Select a Tender--</option>
                                         {tender_names.length > 0 ? (
                                            tender_names.map((tender_name, index) => (
                                                <option key={index} value={tender_name}>{tender_name}</option>
                                            ))
                                        ) : (
                                            <option disabled>No tender available</option>
                                        )}
                                    </select>

                                    <button
                                    onClick={() => setIsTenderNameModalOpen(true)}
                                    className="ml-2 bg-green-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-green-600"
                                >
                                    + New Mega Tender
                                </button>        
                                </div>


                                
                                    {/* Modal for creating new agency */}
                            {isTenderNameModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-8 rounded-md shadow-lg">
                                        <h3 className="text-lg font-bold mb-4">Create New Tender</h3>
                                        <input
                                            type="text"
                                            placeholder="Tender Name"
                                            value={newTenderName}
                                            onChange={(e) => setNewTenderName(e.target.value)}
                                            className="border px-3 py-2 rounded-md w-full mb-4"
                                        />
                                        <button
                                            onClick={handleCreateTender}
                                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                                        >
                                            Create
                                        </button>
                                        <button
                                            onClick={() => setIsTenderNameModalOpen(false)}
                                            className="ml-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Description for chosen tender*/}
                            {tender_names &&(
                                <div className="mt-4 mb-4">
                                    <p className="font-medium text-gray-700">New Mega Tender : {newTenderName}</p>
                                    </div>
                            )}



                                <div className="mb-3">
                                    <label className="block font-medium text-gray-700">
                                        Tenderer Name 
                                    </label>
                                    <select
                                        id="agency"
                                        name="agency"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="">--Select a Tenderer--</option>
                                        {agencies.length > 0 ? (
                                            agencies.map((agency, index) => (
                                                <option key={index} value={agency}>{agency}</option>
                                            ))
                                        ) : (
                                            <option disabled>No tenderers available</option>
                                        )}
                                    </select>

                                    <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="ml-2 bg-green-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-green-600"
                                >
                                    + New Tenderer
                                </button>        
                                </div>

                                    {/* Modal for creating new agency */}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-8 rounded-md shadow-lg">
                                        <h3 className="text-lg font-bold mb-4">Create New Tenderer</h3>
                                        <input
                                            type="text"
                                            placeholder="Agency Name"
                                            value={newAgency}
                                            onChange={(e) => setNewAgency(e.target.value)}
                                            className="border px-3 py-2 rounded-md w-full mb-4"
                                        />
                                        <button
                                            onClick={handleCreateAgency}
                                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                                        >
                                            Create
                                        </button>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="ml-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                                   {/* Description for chosen tenderer*/}
                            {agencies &&(
                                <div className="mt-4 mb-4">
                                    <p className="font-medium text-gray-700">New Tenderer : {newAgency}</p>
                                    </div>
                            )}

                            <div className="mb-3">
                                <label className="block font-medium text-gray-700">
                                    Starting Year
                                </label>
                                <input 
                                type ="number"
                                value={startingYear}
                                onChange={(e) => setStartingYear(e.target.value)}
                                className="border px-3 py-2 rounded-md w-full"
                                placeholder="Enter starting year"
                                    />
                                </div>

                                <div className = "mb-3">
                                    <label className="block font-medium text-gray-700">
                                        Starting Month
                                    </label>
                                    <select
                                    value={startingMonth}
                                    onChange={(e) => setStartingMonth(e.target.value)}
                                    className="border px-3 py-2 rounded-md w-full"
                                    >
                                        {[" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                                        .map((month) => (<option key={month} value={month}>
                                            {month}
                                        </option>))}
                                    </select>
                                    </div>

                                            <div className="mb-3">
                                    <label className="block font-medium text-gray-700">
                                        Awarded
                                    </label>
                                    <select
                                        value={isAwarded}
                                        onChange={(e) => setIsAwarded(e.target.value === "true")}
                                        className="border px-3 py-2 rounded-md w-full"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                        <div className="mb-3">
                                    <label className="block font-medium text-gray-700">
                                        Upload File
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="border px-3 py-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                    onClick={() => {setIsPopupOpen(false);
                                        setNewAgency([]);
                                        setNewTenderName([]);
                                    }}
                                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                                        Cancel
                                    </button>
                                    <button 
                                    onClick={handlePopupSubmit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                    Upload
                                        </button>
                            </div>
                        </div>
                    </div>
                    )}

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
                            <th className="px-4 py-2">Mega Tender</th>
                            <th className="px-4 py-2">Tenderer</th>
                            <th className="px-4 py-2">Outcome</th>
                            <th className="px-4 py-2">Property</th>
                            <th className="px-4 py-2">Building Type</th>
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
                                <td className="border px-4 py-2">{tender.tender_name}</td>
                                <td className="border px-4 py-2">{tender.agency}</td>
                                <td className="border px-4 py-2">{tender.tender_outcome}</td>
                                <td className="border px-4 py-2">{tender.property}</td>
                                <td className="border px-4 py-2">{tender.building_type}</td>
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
