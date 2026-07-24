import { useState, useEffect } from "react"
import { useToImage } from '@hcorta/react-to-image'
import BaseUrl from '../../Constant';
import Updown from "../../icons/Updown";
import DivisionCard from "./DivisionCard";
import Loading from "../../icons/Loading";
import Notification from "../Input/Notification";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import { useNavigate } from "react-router-dom";



const Division = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [inpo, setInpo] = useState(false)
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [divisions, setDivisions] = useState([])
    const [values, setValues] = useState({ name: "", });
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [first, setFirst] = useState({
        first: true,
        value: 'Select a filter'
    })
    const goto = useNavigate()
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });




    const GetDivisionTree = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/division`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setDivisions(data.items)
        setTotalItem(data.items?.length)
        setIsLoading(false)
    }

    useEffect(() => {
        document.title = `Attributes - Care-Connect`;
        GetDivisionTree()
    }, [page, pageSize]);


    EscapeRedirect()



    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="flex justify-between items-center px-4 py-2.5 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Division List</h1>

                <div className="flex justify-end items-center gap-6">
                    <button onClick={() => { goto('/create/division') }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create Division</button>
                    <button onClick={() => { goto('/create/district') }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create District</button>
                    <button onClick={() => { goto('/create/upazila') }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create Upazila</button>

                </div>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">

                <div>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="min-w-[600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
                            <thead class="text-md text-gray-900 bg-[#BCA88D] dark:bg-[#040404] dark:text-white ">
                                <tr>
                                    <th className="py-2 px-4 border-r w-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1"

                                                type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th className="px-2 py-2 border-r">
                                        <div className="flex justify-between items-center font-bold text-[16px] ">
                                            Division Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th className="px-2 py-2 border-r">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            District Name  |  Upazila Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th className="px-2 py-2 text-right border-r text-[16px]">
                                        <div className="flex justify-between items-center">
                                            Created at
                                            <Updown />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {divisions?.map((item, i) => (
                                    <DivisionCard item={item} i={i} isChecked={false} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + divisions?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + divisions?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + divisions?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Division