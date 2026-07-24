import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Updown from '../../icons/Updown'
import Remove from '../../icons/Remove'
import Edit from "../../icons/Edit";
import BaseUrl from "../../Constant";
import Loading from "../../icons/Loading";
import Notification from "../Input/Notification";
import EscapeRedirect from "../Wholesale/EscapeRedirect";



const Address = () => {

    const goto = useNavigate()
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const [address, setAddress] = useState([]);
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const [values, setValues] = useState({
        usertype: "Wholesaler",
        compId: 1,
        stateId: 1
    });
    const GetAddress = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const response = await fetch(`${BaseUrl}/api/get/users/with/role/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setIsLoading(false)
        setAddress(data?.items)
        setTotalItem(data?.items?.length)
    }

    useEffect(() => {
        document.title = "Address - Care-Connect";
        GetAddress()
    }, [])




    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/single/users/by/super/admin`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        GetUsers()
        setShow(false)
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    EscapeRedirect()









    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <Notification message={message} />
            <div className="flex justify-between items-center p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">User List</h1>
                <NavLink to={`/registration`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Create user</NavLink>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-4">
                <div>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white">
                            <thead class="text-sm text-gray-900 dark:bg-[#040404] dark:text-white">
                                <tr className='border'>
                                    <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center">
                                            Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Mobile
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Email
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Address
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Type
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Role
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="pl-4 pr-1 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {address?.map((item, i,) => (
                                    <tr className={`border-b font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                        <th className="w-4 py-2 px-4 border-x">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-x font-thin ">{item?.name}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.username}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.email}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.address}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.user_type}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">
                                            <div className="flex justify-start gap-2 ">
                                                {item?.roles?.map((role) => {
                                                    return <button className="border px-2 py-1 rounded text-xs">{role?.name}</button>
                                                })}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2">
                                            <Edit onClick={() => { goto(`/update/user/${item?.id}`) }} />
                                            <Remove onClick={() => { setValues(item); setShow(true) }} />
                                        </th>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + users?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + users?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + users?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address