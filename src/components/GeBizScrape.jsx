import { FcGlobe } from "react-icons/fc";
import { useState } from "react";

export default function GeBizScrape() {

    // State to manage the API call status
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Handle the API call when the BoxWrapper is clicked
    const handleScrapeClick = async () => {
        setMessage('');

        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error scraping GeBiz');
            }

            const data = await response.json();
            setMessage(data.message || 'Scraping completed successfully');
        } catch (error) {
            setMessage('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return <div>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FcGlobe className='text-2xl text-white' onClick={handleScrapeClick}/> 
            </div>
            <div className='pl-4'>
                <span>
                <strong className='text-xl text-gray-700 font-semibold'>
                Scrape GeBiz
                </strong>
                </span>
            </div>
                                {/* Mini Loading Bar */}
                                {loading && (
                        <div className="mx-4 w-10/12 bg-blue-100 mt-2 rounded-lg overflow-hidden">
                            <div
                                className="h-2 bg-blue-500 animate-pulse"
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                    )}
                    
        </BoxWrapper>



    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}