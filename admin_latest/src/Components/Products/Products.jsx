import React, { useState, useEffect, useRef } from 'react'
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { NavLink } from 'react-router-dom';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import { useToImage } from '@hcorta/react-to-image'
import EscapeRedirect from '../Wholesale/EscapeRedirect';
import Edit from '../../icons/Edit';
import BASE_URL from "../../Constant";
import Remove from '../../icons/Remove';



const Product = ({ category = [], brand = [], shop = [], info = {} }) => {

    const [selectAll, setSelectAll] = useState(false);
    const [contents, setContents] = useState([])
    const targetRef = useRef();
    const outside = useRef(null)
    const option = { width: 950, backgroundColor: '#ffffff' };
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const { ref, getPng } = useToImage(option)
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [catId, setCatId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comId, setComId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState(null)
    const [preview, setPreview] = useState(false)
    const [filter, setFilter] = useState({
        cate: false,
        cate_value: "Select a filter",
        bran: false,
        bran_value: 'Select a filter',
        war: false,
        war_value: 'Select a filter',
    })
    let entries = [{ id: 501, name: "20" }, { id: 502, name: "30" }, { id: 503, name: "40" }, { id: 504, name: "50" }]

    useEffect(() => {
        document.title = "Items"
        if (info?.role === "superadmin") {
            setComId(info?.compId)
        } else {
            setComId(null)
        }
    }, [info])

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
        setMessage({ id: Date.now(), mgs: result?.message });
        getProduct()
    }


    // const fetchContents = async () => {
    //     try {

    //         const url = category
    //             ? `${BASE_URL}/api/get/content?category_type=${encodeURIComponent(category)}`
    //             : `${BASE_URL}/api/get/content`;
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         setContents(data.items || []);
    //     } catch (err) {
    //         console.error(err);
    //         setContents([]);
    //     } finally {

    //     }
    // };

    // useEffect(() => {
    //     fetchContents();
    // }, [category]);





    return (
        <div className="pl-3 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Content List</h1>
                <NavLink to='/create' className={`border text-white rounded-lg font-thin shadow py-2 px-5 bg-blue-600`}>Create Item</NavLink>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <SelectionComponent options={category ? category : []} default_select={filter?.cate} default_value={filter?.cate_value}
                            onSelect={(v) => { setFilter({ ...filter, cate_value: v?.name }); setCatId(v?.id) }} label={'Categories'} />
                    </div>
                    <div>
                        <SelectionComponent options={brand} default_select={filter?.bran} default_value={filter?.bran_value}
                            onSelect={(v) => { setFilter({ ...filter, bran_value: v?.name }); setBrandId(v?.id) }} label={'Sub Category'} />
                    </div>

                    <div>
                        <SelectionComponent options={shop ? shop : []} default_select={filter?.war} default_value={filter?.war_value}
                            onSelect={(v) => { setFilter({ ...filter, war_value: v?.name }); setComId(v?.id) }} label={'Content Type'} />
                    </div>


                    <div className="flex justify-end items-center gap-8">
                        <Search SearchProduct={(e) => { SearchProduct(e) }} />
                    </div>

                </div>

                <div >
                    {/* <div className='flex justify-between items-center my-3'>
                        <div className="flex justify-start items-center gap-1.5">
                            <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                        </div>
                        <div className="flex justify-end items-center gap-8">

                            <Search SearchProduct={(e) => { SearchProduct(e) }} />
                        </div>
                    </div> */}
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
                                            <button
                                                // onClick={() => navigate(`/admin/content/edit/${item.id}`)}
                                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
                                            >
                                                <Edit /> Edit
                                            </button>
                                            <button
                                                onClick={() => BulkDelete(item.id)}
                                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg text-red-600 hover:bg-red-50"
                                            >
                                                <Remove/>
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

export default Product


