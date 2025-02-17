export default function Home() {
    return (
        <div className="h-screen overflow-y-auto container mx-auto px-6 py-10">
        <div className="container mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Home
            </h1>

            {/* About and How to Use Sections */}
            <div className="grid grid-cols-1 gap-8">
                
                {/* About Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">About WOG FM Pulse</h2>
                    <div className="mb-4">
                        <p><b>WOG FM Pulse</b> acts both as a predictive tool and a centralised data repository to help agencies predict cost benchmarks for various elements in building contracts while 
                        also retrieving WOG tenders and contracts.</p>
                    </div>
                    <div className="mb-4">
                        <p>This tool consist of 2 functions : </p>
                    <ul className="list-disc pl-6 space-y-2 ">
                        <li><strong><b>Repositories</b>:</strong> A centralised repository where other WOG agencies can
                        view, search and retrieve historical tender and contract data.</li>
                        <li><strong><b>Cost Calculators</b>:</strong> Calculators based on our repositories that help
                        agencies estimate trade costs and lump sum of building projects.</li>
                          
                    </ul>
                    </div>
                    <p><i>This is a joint JTC project of the Facilities and Estates Management Public Division
                    (FMPD) and the Data Science Department (DSD).</i></p>
                </div>
            </div>
        </div>
        </div>
        

    );
}
