import { FcDataSheet } from "react-icons/fc";
import { useState } from "react";

export default function CalculatorModel() {
    const [gfa, setGfa] = useState(""); // State for GFA input
    const [buildingType, setBuildingType] = useState("Standalone"); // State for dropdown 
    const [result, setResult] = useState(null); // State for calculation result

    const handleCalculate = () => {
        if (!gfa) {
            alert("Please enter a valid GFA value.");
            return;
        }
        // Example calculation logic
        const cost = buildingType === "Standalone" ? gfa * 10 : gfa * 8;
        setResult(`The estimated cost is $${cost.toFixed(2)}`);
    };
    

    return <div>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FcDataSheet className='text-2xl text-white'/> 
            </div>
            <div className='pl-4'>
                <span>
                <strong className='text-xl text-gray-700 font-semibold'>
                Cost Calculator 
                </strong>
                </span>
            </div>
        </BoxWrapper>

        <div className="mt-6">
                {/* Header for Demo Calculator */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Demo Calculator</h2>

                        {/* Input for GFA */}
                        <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        GFA (in sqm)
                    </label>
                    <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={gfa}
                        onChange={(e) => setGfa(e.target.value)}
                        placeholder="Enter GFA"
                    />
                </div>
                      {/* Dropdown for Building Type */}
                      <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Building Type
                    </label>
                    <select
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={buildingType}
                        onChange={(e) => setBuildingType(e.target.value)}
                    >
                        <option value="Standalone">Standalone</option>
                        <option value="Cluster">Cluster</option>
                    </select>
                </div>
                                {/* Calculate Button */}
                
                    <button
                        onClick={handleCalculate}
                        className="w-1/6  bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                    >
                        Calculate
                    </button>
            
        </div>
    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}