import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

export default function CalculatorModel() {
    const [gfa, setGfa] = useState(""); // State for GFA input
    const [buildingType, setBuildingType] = useState(""); // State for dropdown 
    const [duration, setDuration] = useState(""); // State for contract duration
    const [result, setResult] = useState(null); // State for calculation result
    const [loading, setLoading] = useState(false); // State for loading

    const [fixedGfa, setFixedGfa] = useState("") // State for fixed gfa
    const [fixedBuildingType, setFixedBuildingType] = useState("") // State for fixed building type 
    const [fixedDuration, setFixedDuration] = useState("") // State for duration

    // Define trait costs for model 
    const costList = [
        "Preliminaries",
        "Corporation_Requirements_and_Scope_of_Works_Manpower_Cost",
        "Cleaning_and_Waste_Management",
        "Pest_Control",
        "Landscape_Maintenance",
        "Sanitary_and_Plumbing_Maintenance",
        "Security_Services",
        "Mechanical_and_Electrical_Services_Maintenance",
    ];

    // Define state for trait cost 
    const [checkedCosts, setCheckedCosts] = useState(
        costList.reduce((acc, cost) => ({ ...acc, [cost]: false }), {}) // Initialize state as a dictionary
      );

    // Handle checkbox changes
      const handleCheckboxChange = (cost) => {
        setCheckedCosts((prev) => ({
          ...prev,
          [cost]: !prev[cost],
        }));
      };

    const getCheckedCosts = () => {
        return Object.fromEntries(
          Object.entries(checkedCosts).filter(([key, value]) => value) // Return only checked items
        );
      };

    const handleCalculate = async () => {
        const requestData = {
            GFA: parseFloat(gfa),  // GFA value entered by the user
            tender_type: buildingType, // Building Type
            duration : parseInt(duration), // Duration of years
            selectedCosts: Object.keys(getCheckedCosts()), // Convert list of checked items
        };
    
        setLoading(true);  // UseEffect to make API calls and fetch data 
        try {
            // API Fetch Request
            const response = await fetch("http://127.0.0.1:8000/jtc_predict", {
                // Post Method
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
    
            // Error response can be more detailed (Future Work)
            if (!response.ok) {
                throw new Error("Failed to fetch predictions");
            }
    
            const data = await response.json();

            
            // Save fixed values when calculating 
            setFixedGfa(gfa);
            setFixedBuildingType(buildingType);
            setFixedDuration(duration);

            
            // Set data from JSON payload
            setResult({
                trait_cost: data.trait_cost,
                cost_breakdown: data.cost_breakdown
            });

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching predictions.");
        }
        setLoading(false); // Stop loading
    };
    
    // Interface for the Calculator
    return <div>
        <BoxWrapper> 
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>      
                {/* Icon for Calculator */}
                <FaCalculator className='text-2xl text-white'/> 
            </div>
            <div className='pl-4'>
                <span>
                <strong className='text-xl text-gray-700 font-semibold'>
                Jurong Town Corporation (JTC) Trade Cost Calculator
                </strong>
                </span>
            </div>
        </BoxWrapper>
    
        <div className="flex items-center justify-center bg-gray-100">
        <div className="mt-6 overflow-y-auto max-h-screen">
                {/* Header for Demo Calculator */}
                <h4 className="text-l font-semibold text-gray-700 mb-4">This calculator provides an estimated range (min / max ) ($ per sqm) for the Total Sum and Trade Cost based on the GFA / Building Type and Contract Duration provided</h4>

                {/* Input for GFA */}
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    GFA (In sqm)
                </label>
                <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={gfa}
                    onChange={(e) => setGfa(e.target.value)}
                    placeholder="Enter GFA"/>
            
                </div>
                {/* Dropdown for Building Type */}
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Building Type
                </label>
                <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}>   
                <option value="" disabled selected>Select Building Type</option>
                <option value="Building_Type_Amenity Centre">Amenity Centre</option>
                <option value="Building_Type_Business Park">Business Park</option>
                <option value="Building_Type_Flatted Factories">Flatted Factories</option>
                <option value="Building_Type_Hawker Centre">Hawker Centre</option>
                <option value="Building_Type_Standard Factories">Standard Factories</option>
                <option value="Building_Type_Workshop">Workshop</option>
                </select>
            </div>

                {/* Input for Contract Duration */}
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Contract Duration (Number of Years)
                </label>
                <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter Contract Duration in Years"/>
            </div>

                    {/* Checkboxes for Cost List */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Predict Costs For:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {costList.map((cost, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <input
                                type="checkbox"
                                id={`cost-${index}`}
                                value={cost}
                                checked={checkedCosts[cost]}
                                onChange={(e) => handleCheckboxChange(e.target.value)}
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                />
                                <label htmlFor={`cost-${index}`} className="text-gray-700 font-bold">
                                {cost}
                                </label>
                            </div>
                            ))}
                        </div>
                        </div>
                        
                    {/* Button for Model Prediction */}
                    <button
                    onClick={handleCalculate}
                    className="w-full  bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                    disabled={loading}>
                    {loading ? "Calculating..." : "Calculate"}
                    </button>

                    {/* Mini Loading Bar */}
                    {loading && (
                        <div className="w-full bg-blue-100 mt-4 rounded-lg overflow-hidden">
                        <div
                        className="h-2 bg-blue-500 animate-pulse"
                        style={{ width: "100%" }}
                        ></div>
                        </div>
                    )}
                    {/* Predictions */}
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-1 overflow-y-auto">
                            {result && (
                            <div className="text-xl mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                                <p>
                                <div className="mb-4">
                                <strong>Trade Cost Prediction:</strong>
                                </div>
                                <div className="mb-4">
                                <p>Based on the user-input given :</p> 
                                <p><i>GFA : {fixedGfa} / Building Type : {fixedBuildingType} / Duration : {fixedDuration} </i></p>
                                </div>
                                </p>
                             
                                {/* Side-by-side tables */}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {/* Table for Trait Cost */}
                                    <div className="flex-1 min-w-[300px] max-w-[50%] bg-white rounded-lg shadow-md p-4">
                                        <h5 className="text-lg font-bold mb-4">Trade Cost Benchmark ($ per sqm)</h5>
                                        <div className="overflow-y-auto max-h-[400px]">
                                            <table className="min-w-full table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 text-left">Trade Cost</th>
                                                        <th className="px-4 py-2 text-left">Lower Bound</th>
                                                        <th className="px-4 py-2 text-left">Upper Bound</th>
                                                        <th className="px-4 py-2 text-left">Mean</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(result.trait_cost).map(([key, value]) => (
                                                        <tr key={key}>
                                                            <td className="px-4 py-2">{key}</td>
                                                            <td className="px-4 py-2">${value.Lower.toFixed(2)}</td>
                                                            <td className="px-4 py-2">${value.Upper.toFixed(2)}</td>
                                                            <td className="px-4 py-2">${value.Mean.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Table for Cost Breakdown */}
                                    <div className="flex-1 min-w-[300px] max-w-[50%] bg-white rounded-lg shadow-md p-4">
                                        <h5 className="text-lg font-bold mb-4">Trade Cost Breakdown (%) (Total Sum based on Mean)</h5>
                                        <div className="overflow-y-auto max-h-[400px]">
                                            <table className="min-w-full table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 text-left">Trade Cost</th>
                                                        <th className="px-4 py-2 text-left">Percentage</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(result.cost_breakdown).map(([key, value]) => (
                                                        <tr key={key}>
                                                            <td className="px-4 py-2">{key}</td>
                                                            <td className="px-4 py-2">{value.toFixed(2)}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>

             </div>
        </div>
    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}