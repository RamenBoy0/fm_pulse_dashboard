// WORK IN PROGRESS (Copied over from Cost Calculator)
import { FaCalculator } from "react-icons/fa";
import { useState } from "react";

export default function WOGModel() {
    const [gfa, setGfa] = useState(""); // State for GFA input
    const [buildingType, setBuildingType] = useState(""); // State for dropdown 
    const [duration, setDuration] = useState(""); // State for contract duration
    const [result, setResult] = useState(null); // State for calculation result
    const [loading, setLoading] = useState(false); // State for loading

    const [fixedGfa, setFixedGfa] = useState("")
    const [fixedBuildingType, setFixedBuildingType] = useState("")
    const [fixedDuration, setFixedDuration] = useState("")

    const handleCalculate = async () => {
        const requestData = {
            GFA: parseFloat(gfa),  // GFA value entered by the user
            tender_type: parseInt(buildingType),
            duration : parseInt(duration), // Duration of years
        };
    
        setLoading(true); // Start loading
        try {
            const response = await fetch("http://127.0.0.1:8000/wog_predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch predictions");
            }
    
            const data = await response.json();

            // Save fixed values when calculating 
            setFixedGfa(gfa);
            setFixedBuildingType(buildingType);
            setFixedDuration(duration);

            setResult({
                lower: data.lower_percentile,
                mean: data.mean_prediction,
                upper : data.upper_percentile
            });

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching predictions.");
        }
        setLoading(false); // Stop loading
    };
    
    return <div>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FaCalculator className='text-2xl text-white'/> 
            </div>
            <div className='pl-4'>
                <span>
                <strong className='text-xl text-gray-700 font-semibold'>
                Whole of Government (WoG) Total Cost Calculator 
                </strong>
                </span>
            </div>
        </BoxWrapper>
    
        <div className="flex items-center justify-center bg-gray-100">
        <div className="mt-6 overflow-y-auto max-h-screen">
                {/* Header for Demo Calculator */}
                <h4 className="text-l font-semibold text-gray-700 mb-4">This calculator provides an estimated range (min / max ) ($ per sqm) for the Total Cost of a building based on the GFA / Building Type and Contract Duration provided</h4>

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
                        placeholder="Enter GFA"
                    />
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
                        <option value="1">Standalone</option>
                        <option value="0">Cluster</option>
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
                        placeholder="Enter Contract Duration in Years"
                    />
                </div>
                
                    <button
                        onClick={handleCalculate}
                        className="w-full  bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
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

                    {result && (
                    <div className="text-xl mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                          <div className="mb-4">
                    <h5 className="text-lg font-bold mb-4">Total Cost Benchmark (%) </h5>
                    <p>Based on the user-input given :</p> 
                    <p><i>GFA : {fixedGfa} / Building Type : {fixedBuildingType} / Duration : {fixedDuration} </i></p>
                          </div>
                        
                        <p>
                            <strong>Lower Bound: </strong> ${result.lower.toFixed(2)} / sqm
                        </p>
                        <p>
                            <strong>Predicted Value: </strong> ${result.mean.toFixed(2)} / sqm
                        </p>
                        <p>
                            <strong>Upper Bound: </strong> ${result.upper.toFixed(2)} / sqm
                        </p>
                    </div>
   
                )}
        </div>
        </div>
    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}