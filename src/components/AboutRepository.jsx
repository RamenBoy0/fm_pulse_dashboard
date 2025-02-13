export default function AboutCalculator() {
    return (
        <div className="h-screen overflow-y-auto container mx-auto px-6 py-10">
        <div className="container mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Repositories
            </h1>

            {/* Calculator */}
            <div className="flex justify-center items-center">
                   {/* Tabs Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Repositories</h2>

                    {/* WOG Cost Calculator */}
                    <div className="mb-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-blue-700">WOG Repository</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Purpose:</strong> Allow users to access <b>historical data</b> on WOG tenders & contracts.</li>
                            <li><strong>Columns:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li><strong>Title:</strong> <i>Title of Tender</i></li>
                                    <li><strong>Agency:</strong> <i>Bidding Agency</i></li>
                                    <li><strong>Description:</strong> <i>Tender Description</i></li>
                                    <li><strong>Price:</strong> <i>Total Tender Price</i></li>
                                    <li><strong>Status:</strong> <i>Awarded or Not</i></li>
                                    <li><strong>WOG:</strong> <i>Agency publishing the tender</i></li>
                                    <li><strong>Date:</strong> <i>Tender Publish Date</i></li>
                                    <li><strong>Awarded Agencies:</strong> <i>Agencies that were awarded bidding contract</i></li>   
                                </ul>
                            </li>
                        </ul>
                        </div>
                        <a href="/gebiz" className="text-blue-500 underline">Go to WOG Repository</a>
                    </div>

                    {/* JTC Trade Cost Calculator */}
                    <div>
                    <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-700">JTC Cost Norms</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Purpose:</strong> Allow users to access <b>historical data</b> on JTC Internal Contract Data.</li>
                            <li><strong>Columns:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li><strong>Year:</strong> <i>Tender Publish Year</i></li>
                                    <li><strong>Tender:</strong> <i>Agency publishing the tender</i></li>
                                    <li><strong>Tenderer:</strong> <i>Bidding Agency</i></li>
                                    <li><strong>Outcome:</strong> <i>Awarded or Not</i></li>
                                    <li><strong>Property:</strong> <i>Property Name</i></li>
                                    <li><strong>Building Type:</strong> <i>Building Type</i></li>
                                    <li><strong>GFA:</strong> <i>Building Size in Square Metre</i></li>
                                    <li><strong>Date:</strong> <i>Tender Publish Date</i></li>   
                                </ul>
                            </li>
                        </ul>
                        </div>
                        <a href="/pulse_cost_calculator" className="text-blue-500 underline">Go to JTC Trade Cost Calculator</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
}
