export default function Home() {
    return (
        <div className="container mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                FM Pulse Cost Calculator
            </h1>

            {/* About and How to Use Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* About Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
                    <div className="mb-8">
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>What:</strong> A Cost Benchmark & Data Repository tool developed for Facility Management.</li>
                        <li><strong>By Who:</strong> Developed by the FMP (Facility Management Public) Department.</li>
                        <li><strong>Hosted On:</strong> Local deployment (Proof of Concept).</li>
                        <li><strong>Data Sources:</strong> Government tenders (GeBiz Website) & JTC Internal Contract Data.</li>
                        <li><strong>Models:</strong>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>🔹 Anomaly Detection: <span className="text-blue-600 font-medium">Local Outlier Factor</span></li>
                                <li>🔹 Cost Prediction: <span className="text-green-600 font-medium">Ridge Regression</span> & <span className="text-purple-600 font-medium">Tweedie Regression</span></li>
                            </ul>
                        </li>
                    </ul>
                    </div>


                        {/*How To Use */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">How To Use?</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Instructions:</strong> 
                            <ul><li>1. User wishes to find the $ per sqm for the total building cost</li>
                                <li>2. User keys in the building factor such as GFA and building type</li>
                                <li>3. User presses 'Calculate' to let the model run</li>
                                <li>4. The results will be returned below in $ per sqm for the total cost of each trade cost, depending on the calculator chosen.</li>
                                </ul>
                            </li>
                    </ul>
                </div>

                   {/* Tabs Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Calculators</h2>

                    {/* WOG Cost Calculator */}
                    <div className="mb-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-blue-700">WOG Cost Calculator</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
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
                        <a href="/wog_cost_calculator" className="text-blue-500 underline">Go to WOG Cost Calculator</a>
                    </div>

                    {/* JTC Trade Cost Calculator */}
                    <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-purple-700">JTC Trade Cost Calculator</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Accuracy:</strong> ---</li>
                            <li><strong>Purpose:</strong> Estimates the $ per sqm of each <b>trade cost</b> based on historical data.</li>
                            <li><strong>Model:</strong> Tweedie Regression</li>
                            <li><strong>Building Factors:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>🏢 <strong>GFA:</strong><i>Building Size in Sqm</i></li>
                                    <li>🏗️ <strong>Building Type:</strong> <i>Amenity Centre / Business Park / Flatted Factories...</i></li>
                                    <li>📅 <strong>Contract Duration:</strong> <i>1 to 9 Years</i></li>
                                    <li>🛠️ <strong>Trade Cost:</strong> <i>Preliminaries, Cleaning, Pest Control...</i></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                        <a href="/pulse_cost_calculator" className="text-blue-500 underline">Go to JTC Trade Cost Calculator</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
