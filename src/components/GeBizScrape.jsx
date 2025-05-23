// Control the GeBiz components 
import { FcGlobe } from "react-icons/fc";
export default function GeBizScrape() {

    return <div>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>

                <FcGlobe className='text-2xl text-white'/> 
            </div>  
            <strong className='ml-4 text-xl text-gray-700 font-semibold'>
               GeBiz Data
                </strong>
        </BoxWrapper>



    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}