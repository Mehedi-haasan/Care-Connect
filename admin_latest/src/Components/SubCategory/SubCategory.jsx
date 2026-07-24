import { useState, useEffect, useRef } from "react"
import BaseUrl from '../../Constant';
import ShowEntries from "../Input/ShowEntries";
import CategoryCard from "./SubCategoryCard";
import Loading from "../../icons/Loading";
import Notification from "../Input/Notification";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import { useNavigate } from "react-router-dom";


const SubCategory = ({ entries, info = {} }) => {


    const [category, setCategory] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const goto = useNavigate()
    const [message, setMessage] = useState({ id: '', mgs: '' });

    const getCategory = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/sub/category/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setCategory(data.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }


    useEffect(() => {
        document.title = `Categorys - Care-Connect`;
        getCategory()
    }, [page, pageSize]);

    const SearchCategory = async (value) => {
        const name = value
        const token = localStorage.getItem('token')
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/category/filter/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setCategory(data?.items);
        } else {
            getCategory()
        }
    }




    EscapeRedirect()




    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />

            <div className="flex justify-between items-center px-4 py-2.5 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Sub Category List</h1>
                <button onClick={() => { goto('/create/sub/category') }} className={`bg-blue-500 rounded px-4 py-1.5 text-white font-thin`}>Create Category</button>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">

                        <Search SearchProduct={SearchCategory} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {
                        category?.map((item, i) => (
                            <CategoryCard item={item} i={i} isChecked={!item?.active} info={info} getCategory={getCategory} />
                        ))
                    }
                </div>

                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + category?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + category?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + category?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCategory