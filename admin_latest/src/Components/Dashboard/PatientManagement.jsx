import React, { useState } from "react";
import Updown from "../../icons/Updown";
import { ReturnSaleCode, formatDate } from "../Input/Time";
import { useNavigate } from "react-router-dom";

const PatientManagement = ({ invoices = [] }) => {


    const [invopreview, setInvoPreview] = useState(false);
    const [id, setId] = useState(1)
    const [type, setType] = useState('')
    const [user_type, setUserType] = useState("")
    const goto = useNavigate()


    const Redirect = (item) => {

    }

    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <table className="text-sm text-left text-gray-500 w-full min-w-[700px] rounded">
                    <thead className="text-sm text-left  text-black rounded bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                        <tr className='border'>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    ID
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    Date
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Name
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    State
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Age
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Gender
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Reason
                                    <Updown />
                                </div>
                            </th>

                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    Created AT
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    Preview
                                    <Updown />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item, i) => (
                            <tr key={i} className={`border-b cursor-pointer ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                <th scope="col" className="px-3 py-2 border-x font-thin ">{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.appoinment_date}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin" >{item?.name}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.status}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.patient_age}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.gender}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.reason_for_visit}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.createdAt}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin flex justify-center items-center">
                                    <button  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                                <circle cx="12" cy="12" r="3" />
                                            </g>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientManagement