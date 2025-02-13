export default function Home() {
    return (
        <div className="h-screen overflow-y-auto container mx-auto px-6 py-10">
        <div className="container mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                FM Pulse Cost Calculator
            </h1>

            {/* About and How to Use Sections */}
            <div className="grid grid-cols-1 gap-8">
                
                {/* About Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
                    <div className="mb-8">
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li><strong>What:</strong> A Cost Benchmark & Data Repository tool developed for Facility Management.</li>
                        <li><strong>By Who:</strong> Developed by the FMPD (Facility Management Public Department), supported by DSD (Data Science Department).</li>
                        <li><strong>Hosted On:</strong> Local deployment (Proof of Concept).</li>
                        <li><strong>Data Sources:</strong> Government tenders (GeBiz Website) & JTC Internal Contract Data.</li>
                        <li><strong>Machine Learning Models:</strong>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Anomaly Detection: <span className="text-blue-600 font-medium">Local Outlier Factor</span></li>
                                <li>Cost Prediction: <span className="text-green-600 font-medium">Ridge Regression</span> & <span className="text-purple-600 font-medium">Tweedie Regression</span></li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
