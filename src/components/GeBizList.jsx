// Has a API call to the backend to scrape data from GeBiz and import it to the Database (Subjected to change)
import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import * as XLSX from "xlsx";

export default function GeBiz() {
  const [gebiz, setGebiz] = useState([]); // Set the data
  const [searchTerm, setSearchTerm] = useState(""); // Set the search term
  const [currentPage, setCurrentPage] = useState(1); // Set the page number
  const rowsPerPage = 6; // Limit to 6 rows per page
  const [showAll, setShowAll] = useState(false); // Function to retrieve all data or subset
  const [loading, setLoading] = useState(false); // Loading State

  // UseEffect to make API calls and fetch data
  useEffect(() => {
    const fetchData = async () => {
      let url = "http://127.0.0.1:8000/GeBiz";
      if (searchTerm) {
        // Add search query parameter if searchTerm is not empty
        url += `?search=${searchTerm}`;
      }
      if (showAll) {
        // Add show all if flag enabled
        url += searchTerm ? "&show_all=true" : "?show_all=true";
      }
      try {
        const response = await fetch(url);
        // Wait for return response
        const data = await response.json();

        // Check if data is an array before setting it
        if (Array.isArray(data)) {
          setGebiz(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setGebiz([]); // Fallback to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching tenders", error);
      }
    };

    fetchData();
    // Re-fetch when searchTerm changes
  }, [searchTerm, showAll]);

  // Handle the API call when the BoxWrapper is clicked
  const handleScrapeClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error scraping GeBiz");
      }

      // const data = await response.json();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic (Currently set to 6 rows per page)
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTenders = gebiz.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(gebiz.length / rowsPerPage);

  // Export to excel
  const exportToExcel = () => {
    // Convert current data to excel

    // preprocessing to take the awarded agency element out of the list
    // TODO: check if there can be more than one awarded agency: if so, we need to extract the whole list out
    const processedData = gebiz.map((item) => ({
      ...item,
      awarded_agency:
        Array.isArray(item.awarded_agency) && item.awarded_agency.length > 0
          ? item.awarded_agency[0]
          : "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GeBiz Data");

    // Create and download Excel file
    XLSX.writeFile(workbook, "GeBiz_Data.xlsx");
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev); //Toggle state
    setCurrentPage(1); // Reset to first page when toggling
  };

  // Function to check for recency of data
  const isRecent = (dateCreated) => {
    const now = new Date();
    const importTime = new Date(dateCreated);
    const differenceInHours = (now - importTime) / (1000 * 60 * 60);
    return differenceInHours <= 24; // Consider recent if within 2 hours
  };

  // Navigate to the next or previous page
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <strong className="text-gray-700 font-medium">GeBiz Data</strong>

          {/* Scrape from GeBiz*/}
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={handleScrapeClick}
            disabled={loading}
          >
            {loading ? "Scraping..." : "Scrape to Database"}
          </button>
          {/* Export to Excel Button */}
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Export to Excel
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {/* Show All Button */}
          <button
            onClick={toggleShowAll}
            className="bg-purple-500 text-white font-semibold py-2 px-4 me-6 rounded-lg hover:bg-purple-600"
          >
            {showAll ? "Show Paginated" : "Show All"}
          </button>
          {/* Search Button */}
          <FcSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>
      </div>
      <div className="mt-3">
        {/* Table of Data */}
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full text-gray-700">
            <thead className="bg-gray-200 text-gray-800 font-semibold">
              <tr className="border-b-2 border-gray-300">
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
              {/* Map data to table */}
              {currentTenders.map((gebiz) => (
                <tr
                  key={gebiz.tender_id}
                  // Highlight if in recently imported
                  className={
                    isRecent(gebiz.date_created) ? "bg-yellow-100" : ""
                  }
                >
                  <td className="border px-4 py-2">{gebiz.title}</td>
                  <td className="border px-4 py-2">{gebiz.agency}</td>
                  <td className="border px-4 py-2">{gebiz.description}</td>
                  <td className="border px-4 py-2">
                    ${gebiz.price.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{gebiz.status}</td>
                  <td className="border px-4 py-2">{gebiz.WOG}</td>
                  <td className="border px-4 py-2">
                    {new Date(gebiz.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{gebiz.awarded_agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {}
        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
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
