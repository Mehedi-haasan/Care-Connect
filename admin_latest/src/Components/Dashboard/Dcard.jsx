import React from "react";
import Patients from '../../icons/Patients';


const DCart = ({ data, className, black, white }) => {
    return (
        <div className={`rounded-xl p-5 min-h-[190px] flex flex-col justify-between text-white shadow-md border border-l-4 ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                    <Patients className={white ? 'text-white' : 'text-black'} name={data?.name}/>
                </div>
                <h1 className={`font-semibold ${white ? '' : 'text-black'}`}>{data?.title}</h1>
            </div>

            {/* Footer */}
            <div className={`flex justify-between items-end ${black ? 'text-black' : ''}`}>
                <h1 className="text-3xl font-bold">
                    {data?.amount}
                </h1>

                <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold flex justify-center items-center gap-1">
                        <p>↑</p> <p className='mt-1'>10.4%</p>
                    </span>
                </div>
            </div>
        </div>)
}

export default DCart