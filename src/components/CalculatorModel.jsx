import { FcDataSheet } from "react-icons/fc";

export default function CalculatorModel() {

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



    </div>
}

function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray 200 flex items-center">{children}</div>
}