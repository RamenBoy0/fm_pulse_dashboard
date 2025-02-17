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
                    <h2 className="text-2xl font-semibold mb-4">How To Use?</h2>
                    <ul className="list-disc pl-6 space-y-2">
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
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Terminologies</h2>
                        <h3 className="text-lg font-semibold text-blue-700">WOG Cost Calculator</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Accuracy:</strong> 25% MAPE (Mean Absolute Precision Error)</li>
                            <li><strong>Purpose:</strong> Estimates $ per sqm of total <b>building costs</b> based on historical data.</li>
                            <li><strong>Model:</strong> Local Outlier Factor / Ridge Regression</li>
                            <li><strong>Building Factors:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>🏢 <strong>GFA:</strong> <i>Building Size in Sqm</i></li>
                                    <li>🏗️ <strong>Building Type:</strong> <i>Standalone or Cluster</i></li>
                                    <li>📅 <strong>Contract Duration:</strong> <i>1 to 9 Years</i></li>
                                </ul>
                            </li>
                        </ul>
                        </div>

                        <div className="mb-4">
                        <h3 className="text-lg font-semibold text-blue-700">JTC Cost Calculator</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Accuracy:</strong> --- MAPE (Mean Absolute Precision Error)</li>
                            <li><strong>Purpose:</strong> Estimates $ per sqm of total <b>individual trade cost</b> based on historical data.</li>
                            <li><strong>Model:</strong> Tweedie Regression</li>
                            <li><strong>Building Factors:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>🏢 <strong>GFA:</strong> <i>Building Size in Sqm</i></li>
                                    <li>🏗️ <strong>Building Type:</strong> <i>Amenity Centre / Business Park / Flatted Factories / etc</i></li>
                                    <li>📅 <strong>Contract Duration:</strong> <i>1 to 9 Years</i></li>
                                    <li>💰 <strong>Trade Cost:</strong> <i>Pest Control / Security / Cleaning and Waste / etc  </i></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                        <h3 className="text-lg font-semibold text-blue-700">Cost Benchmark</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Lower Bound:</strong> The 10th percentile cost estimate, representing a conservative low-cost scenario.</li>
                            <li><strong>Predicted:</strong> The average estimated cost, based on historical trends and market data.</li>
                            <li><strong>Upper Bound:</strong> The 90th percentile cost estimate, accounting for higher-end pricing scenarios.</li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>
    );
}
