export default function AboutRepository() {
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
                        <p><b>All in one place</b>. Our repositories are made up of compiled WOG contracts
                    extracted from GEBiz and other GPEs like JTC’s Megatender BCTs.<span className= 'text-orange-500'> This also acts
                    as the backbone of our Cost Calculator. </span></p>
                        </div>
                    </div>

                    {/* JTC Trade Cost Calculator */}
                    <div>
                    <div className="mb-4">
                    <div className="mb-2">
                    <h3 className="text-lg font-semibold"><b>What you can do with our Repositories: </b></h3>
                    </div>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>1. WOG Repository:</strong></li>
                            <ul className="list-disc pl-6 space-y-1">
                                    <li>Retrieve past WOG tenders and contracts.</li>
                                </ul>
                            <li><strong>2. JTC Cost Norms:</strong>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Retrieve historical data on trade costs extracted from JTC Internal
                                    Contract Data.</li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                        <div className="mb-2">
                        <p><strong>Facts for nerds:</strong></p> 
                        </div>
                        <div className="mb-2">
                        <p>
                        Repository Knowledge Base v1 (Last updated: [date] 2024)
                        </p>
                        <p>
                        Hosted on: Local Database</p>
                        <p><i>
                        Coming soon: more GPE data
                        </i></p>
                        </div>
                        <p><a href="/gebiz" className="text-blue-500 underline">Go to WOG Repository</a></p>
                        <a href="/wog_bct" className="text-blue-500 underline">Go to JTC Cost Norms Repository</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
