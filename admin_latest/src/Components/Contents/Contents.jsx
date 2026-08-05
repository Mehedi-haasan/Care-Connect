import React, { useState, useEffect } from 'react'
import BaseUrl from '../../Constant';
import Loading from '../../icons/Loading';
import { NavLink } from 'react-router-dom';
import EscapeRedirect from '../Wholesale/EscapeRedirect';
import Edit from '../../icons/Edit';
import Remove from '../../icons/Remove';



const Content = () => {

    const [contents, setContents] = useState([])
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [catId, setCatId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comId, setComId] = useState(null);




    const getProduct = async () => {
        // setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/content`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setContents(data?.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [page, pageSize, brandId, catId, comId])


    const SearchProduct = async (e) => {
        const name = e
        const token = localStorage.getItem('token')
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/product/search/with/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setData(data.items)
        } else {
            getProduct()
        }


    }




    EscapeRedirect()




    const BulkDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/bulk/update/product`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ data: data }),
        });
        const result = await response.json();
        getProduct()
    }


    return (
        <div className="pl-3 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Content List</h1>
                <NavLink to='/create' className={`border text-white rounded-lg font-thin shadow py-2 px-5 bg-blue-600`}>Create Item</NavLink>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                

                <div>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" >
                        {/* Content Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {contents?.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow flex flex-col hover:shadow-lg transition-shadow duration-200">
                                    <img
                                        src={item?.image_url}
                                        alt={item.name}
                                        className="h-40 object-cover rounded-t-xl cursor-pointer"
                                    />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.title}</p>
                                        <div className="flex justify-between text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                {/* <Layers size={14} /> */}
                                                {item?.category?.name}
                                            </span>
                                            <span>Pos: {item.sequence}</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-auto">
                                            <NavLink to={`/update/content/${item.id}`}
                                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100">
                                                <Edit /> Edit
                                            </NavLink>
                                            <button onClick={() => BulkDelete(item.id)}
                                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg text-red-600 hover:bg-red-50"
                                            >
                                                <Remove />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>




                <div className="flex justify-between items-center pt-3  z-10">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + data?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page === 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50 dark:bg-[#040404] dark:text-white`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + data?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + data?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm dark:bg-[#040404] dark:text-white`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content


