export default function ManualCalculator() {
    return (
        <div className="h-screen overflow-y-auto container mx-auto px-6 py-10">
        <div className="container mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Calculator Manual
            </h1>

            {/* About and How to Use Sections */}
            <div className="grid grid-cols-1 gap-8">
                
                {/* Instructions Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        {/*How To Use */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">How To Use?</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Instructions:</strong> 
                            <ul><li>1. Input the desired values for building factor such as GFA and building type</li>
                                <li>2. Select the trade cost to calculate (If Applicable) </li>
                                <li>3. Press 'Calculate' to run the model</li>
                                <li>4. Results will be returned in $ per sqm for the total cost of each trade cost, depending on the calculator chosen.</li>
                                </ul>
                            </li>
                    </ul>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terminologies</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Instructions:</strong> 
                            <ul><li>1. GFA - Building Size in Square Metres</li>
                                <li>2. Building Types - Standalone / Cluster <b>(WOG Calculator)</b></li>
                                </ul>
                            </li>
                    </ul>
                    </div>
            </div>
        </div>
    </div>
    );
}
